import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StationSign } from "@/components/StationSign";
import {
  ALBUMS,
  GALLERY_COPY,
  albumBySlug,
  itemsInAlbum,
} from "@/content/gallery";

/**
 * Next 15 passes `params` as a Promise. Typing it as a plain object compiles
 * locally but fails the production build against the generated PageProps
 * constraint, which is how this route broke.
 */
type Props = {
  params: Promise<{ album: string }>;
};

export function generateStaticParams() {
  return ALBUMS.map((album) => ({ album: album.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { album: slug } = await params;
  const album = albumBySlug(slug);
  if (!album) return { title: "Album not found" };

  return {
    title: album.name,
    description: album.blurb,
    alternates: { canonical: `/documentation/${album.slug}` },
  };
}

/**
 * One album.
 *
 * Ships correct with zero photos — that is the v1 acceptance criterion, not a
 * temporary state. The grid below is real rather than a placeholder, so the
 * first photo dropped into `gallery.ts` renders properly with no code change:
 * CSS multi-column masonry at 1/2/3 columns, intrinsic dimensions on every
 * image so nothing shifts, and the caption under the photo rather than over it.
 */
export default async function AlbumPage({ params }: Props) {
  const { album: slug } = await params;
  const album = albumBySlug(slug);
  if (!album) notFound();

  const items = itemsInAlbum(album.slug);

  return (
    <>
      <StationSign
        code={album.code}
        name={album.name}
        line="pribadi"
        blurb={album.blurb}
        as="h1"
      />

      <div className="px-lg py-xl">
        {items.length === 0 ? (
          <div className="border-line-life mb-xl pl-md border-l-[4px]">
            <p className="text-ink text-[17px]">{GALLERY_COPY.emptyAlbum}</p>
            <p className="measure text-ink-2 mt-xs text-[15px]">
              {GALLERY_COPY.emptyAlbumDetail}
            </p>
          </div>
        ) : (
          <div className="mb-xl gap-md lg:gap-lg columns-1 sm:columns-2 lg:columns-3">
            {items.map((item) => (
              <figure
                key={item.src}
                className="mb-md lg:mb-lg break-inside-avoid"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  placeholder="blur"
                  blurDataURL={item.blurDataURL}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                {item.caption ? (
                  <figcaption className="text-ink-2 mt-sm text-[14px]">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        )}

        <Link
          href="/documentation"
          className="text-ink-2 text-[15px] underline"
        >
          {GALLERY_COPY.allAlbums}
        </Link>
      </div>
    </>
  );
}
