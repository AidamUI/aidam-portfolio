import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ALBUMS,
  GALLERY_COPY,
  albumCount,
  placeholderPreview,
} from "@/content/gallery";

export const metadata: Metadata = {
  title: "Documentation",
  description: GALLERY_COPY.blurb,
  alternates: { canonical: "/documentation" },
};

/**
 * The album index. Each row carries a thumbnail — one tile from that album's
 * placeholder preview when there are no real photos yet, per
 * `placeholderPreview` in src/content/gallery.ts. The thumbnail disappears on
 * its own the moment a real photo exists for that album.
 */
export default function DocumentationPage() {
  const hasAnyPhotos = ALBUMS.some((album) => albumCount(album.slug) > 0);

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-8 sm:px-8 sm:pt-24">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          {GALLERY_COPY.heading}
        </h1>
        <p className="text-text-muted mt-3 max-w-prose">{GALLERY_COPY.blurb}</p>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-24 sm:px-8">
        {!hasAnyPhotos ? (
          <p className="border-accent text-text-muted mb-10 max-w-prose border-l-4 pl-6">
            {GALLERY_COPY.emptyIndex}
          </p>
        ) : null}

        <ul className="flex flex-col gap-2">
          {ALBUMS.map((album) => {
            const count = albumCount(album.slug);
            const thumb =
              count === 0 ? placeholderPreview(album.slug, 1)[0] : null;

            return (
              <li key={album.slug}>
                <Link
                  href={`/documentation/${album.slug}`}
                  className="hover:bg-bg-subtle group flex items-start gap-4 rounded-xl p-4 transition-colors"
                >
                  <div className="bg-bg-subtle h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    {thumb ? (
                      <Image
                        src={thumb.src}
                        alt=""
                        width={thumb.width}
                        height={thumb.height}
                        aria-hidden="true"
                        className="h-full w-full object-cover opacity-60"
                      />
                    ) : null}
                  </div>

                  <span className="flex-1">
                    <span className="group-hover:text-accent block text-lg font-bold transition-colors">
                      {album.name}
                    </span>
                    <span className="text-text-muted block max-w-prose text-sm">
                      {album.blurb}
                    </span>
                  </span>

                  <span className="text-text-muted mt-1 shrink-0 font-mono text-sm">
                    {count === 0
                      ? GALLERY_COPY.countNone
                      : count === 1
                        ? GALLERY_COPY.countOne
                        : GALLERY_COPY.countMany(count)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
