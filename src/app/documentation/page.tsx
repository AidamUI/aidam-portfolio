import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Scene } from "@/components/mountain/Scene";
import { Stack } from "@/components/Section";
import {
  ALBUMS,
  GALLERY_COPY,
  albumCount,
  placeholderPreview,
} from "@/content/gallery";
import { STAGE_EYEBROW } from "@/content/stage";

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
      <Scene stage="docs" />
      <Hero eyebrow={STAGE_EYEBROW.docs} title={GALLERY_COPY.heading}>
        <p className="text-mut mt-4 max-w-prose">{GALLERY_COPY.blurb}</p>
      </Hero>

      <Stack>
        {!hasAnyPhotos ? (
          <p className="border-warm max-w-prose border-l-4 pl-6">
            {GALLERY_COPY.emptyIndex}
          </p>
        ) : null}

        <div className="card p-3 sm:p-4">
          <ul className="flex flex-col">
            {ALBUMS.map((album) => {
              const count = albumCount(album.slug);
              const thumb =
                count === 0 ? placeholderPreview(album.slug, 1)[0] : null;

              return (
                <li
                  key={album.slug}
                  className="border-line border-b last:border-b-0"
                >
                  <Link
                    href={`/documentation/${album.slug}`}
                    className="hover:bg-pill-bg group flex items-start gap-4 rounded-2xl p-4 transition-colors"
                  >
                    <div className="bg-ground h-16 w-16 shrink-0 overflow-hidden rounded-xl">
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
                      <span className="font-display group-hover:text-accent block font-semibold transition-colors">
                        {album.name}
                      </span>
                      <span className="text-mut block max-w-prose text-sm">
                        {album.blurb}
                      </span>
                    </span>

                    <span className="text-warm mt-1 shrink-0 font-mono text-[11px] tracking-[0.08em] uppercase">
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
      </Stack>
    </>
  );
}
