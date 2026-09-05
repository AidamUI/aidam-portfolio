import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoGrid } from "@/components/PhotoGrid";
import { StationSign } from "@/components/StationSign";
import {
  ALBUMS,
  GALLERY_COPY,
  albumBySlug,
  albumDisplayItems,
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
 * Ships correct with zero real photos — that is the v1 acceptance criterion,
 * not a temporary state (prd.md §5.5). The "nothing here yet" message always
 * renders when there are none. What sits below it now is a placeholder
 * preview grid — clearly labelled, never counted as real content — so the
 * page has the weight of an actual gallery rather than one line of grey text.
 * `albumDisplayItems` is the single place that decides which grid shows.
 *
 * The grid itself, `PhotoGrid`, is real rather than a mockup, so the first
 * real photo dropped into `gallery.ts` renders with no code change: CSS
 * multi-column masonry, intrinsic dimensions so nothing shifts, caption under
 * the photo rather than over it.
 */
export default async function AlbumPage({ params }: Props) {
  const { album: slug } = await params;
  const album = albumBySlug(slug);
  if (!album) notFound();

  const { items, isPlaceholder } = albumDisplayItems(album.slug);

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
        {isPlaceholder ? (
          <div className="border-line-life mb-xl pl-md border-l-[4px]">
            <p className="text-ink text-[17px]">{GALLERY_COPY.emptyAlbum}</p>
            <p className="measure text-ink-2 mt-xs text-[15px]">
              {GALLERY_COPY.emptyAlbumDetail}
            </p>
          </div>
        ) : null}

        {isPlaceholder ? (
          <p className="code-type text-ink-2 mb-md">
            {GALLERY_COPY.previewLabel}
          </p>
        ) : null}

        <div className={isPlaceholder ? "mb-xl opacity-60" : "mb-xl"}>
          <PhotoGrid items={items} />
        </div>

        {isPlaceholder ? (
          <p className="measure text-ink-2 mb-xl text-[13px]">
            {GALLERY_COPY.previewDetail}
          </p>
        ) : null}

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
