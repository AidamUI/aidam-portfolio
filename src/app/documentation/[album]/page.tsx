import { PageShell } from "@/components/PageShell";
import { StationSign } from "@/components/StationSign";
import {
  ALBUMS,
  GALLERY_COPY,
  albumBySlug,
  itemsInAlbum,
} from "@/content/gallery";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  params: { album: string };
};

export async function generateStaticParams() {
  return ALBUMS.map((album) => ({
    album: album.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { album: albumSlug } = await params;
  const album = albumBySlug(albumSlug);
  if (!album) return { title: "Album Not Found" };

  return {
    title: album.name,
    description: album.blurb,
  };
}

export default async function AlbumPage({ params }: Props) {
  const { album: albumSlug } = await params;
  const album = albumBySlug(albumSlug);
  if (!album) notFound();

  const items = itemsInAlbum(album.slug);
  const isEmpty = items.length === 0;

  return (
    <PageShell>
      <div className="space-y-2xl">
        {/* Station sign */}
        <StationSign
          code="O1"
          name={album.name}
          line="pribadi"
          blurb={album.blurb}
        />

        {/* Empty state */}
        {isEmpty ? (
          <div className="space-y-md">
            <div className="bg-platform-2 border-route-line border-l-[4px] p-lg">
              <p className="text-ink text-[17px] font-medium leading-relaxed">
                {GALLERY_COPY.emptyAlbum}
              </p>
              <p className="text-ink-2 mt-xs text-[15px] leading-relaxed">
                {GALLERY_COPY.emptyAlbumDetail}
              </p>
            </div>

            <Link
              href="/documentation"
              className="text-ink-2 hover:text-ink inline-flex items-center gap-xs text-[15px] transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span>All albums</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Photo grid - will be implemented when photos arrive */}
            <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-platform-2 aspect-[4/3] overflow-hidden"
                >
                  {/* Placeholder for next/image implementation */}
                  <div className="bg-platform-3 flex h-full items-center justify-center">
                    <span className="text-ink-2 text-[13px]">
                      {item.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/documentation"
              className="text-ink-2 hover:text-ink inline-flex items-center gap-xs text-[15px] transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span>All albums</span>
            </Link>
          </>
        )}
      </div>
    </PageShell>
  );
}

// Made with Bob
