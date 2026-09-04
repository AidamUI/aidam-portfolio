import { PageShell } from "@/components/PageShell";
import { StationSign } from "@/components/StationSign";
import { StationBadge } from "@/components/StationBadge";
import { ALBUMS, GALLERY_COPY, albumCount } from "@/content/gallery";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description: GALLERY_COPY.blurb,
};

export default function DocumentationPage() {
  const hasAnyPhotos = ALBUMS.some((album) => albumCount(album.slug) > 0);

  return (
    <PageShell>
      <div className="space-y-2xl">
        {/* Station sign */}
        <StationSign code="O1" name="Documentation" line="pribadi" blurb={GALLERY_COPY.blurb} />

        {/* Empty state or album grid */}
        {!hasAnyPhotos ? (
          <div className="bg-platform-2 border-route-line mb-2xl border-l-[4px] p-lg">
            <p className="measure text-ink-2 text-[15px] leading-relaxed">
              {GALLERY_COPY.emptyIndex}
            </p>
          </div>
        ) : null}

        {/* Album list */}
        <div className="space-y-lg">
          {ALBUMS.map((album) => {
            const count = albumCount(album.slug);
            return (
              <Link
                key={album.slug}
                href={`/documentation/${album.slug}`}
                className="bg-platform-2 hover:bg-platform-3 block border-l-[4px] border-transparent p-lg transition-colors hover:border-route-line"
              >
                <div className="flex items-start justify-between gap-md">
                  <div className="flex-1">
                    <div className="mb-xs flex items-center gap-sm">
                      <StationBadge code="O1" line="pribadi" />
                      <h2 className="sign-type text-ink text-[19px]">
                        {album.name}
                      </h2>
                    </div>
                    <p className="text-ink-2 text-[15px] leading-relaxed">
                      {album.blurb}
                    </p>
                  </div>
                  <div className="text-ink-2 shrink-0 text-[15px]">
                    {count === 0 ? "—" : `${count} ${count === 1 ? "photo" : "photos"}`}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}

// Made with Bob
