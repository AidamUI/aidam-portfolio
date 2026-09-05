import type { Metadata } from "next";
import Link from "next/link";
import { StationBadge } from "@/components/StationBadge";
import { StationSign } from "@/components/StationSign";
import { ALBUMS, GALLERY_COPY, albumCount } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Documentation",
  description: GALLERY_COPY.blurb,
  alternates: { canonical: "/documentation" },
};

/**
 * The album index.
 *
 * No `PageShell` here: the root layout already wraps every route in one. Doing
 * it again produced two route lines and a second `<main id="main">`, which is
 * invalid HTML and gives the skip link two targets to choose between.
 */
export default function DocumentationPage() {
  const hasAnyPhotos = ALBUMS.some((album) => albumCount(album.slug) > 0);

  return (
    <>
      <StationSign
        code="O1"
        name={GALLERY_COPY.heading}
        line="pribadi"
        blurb={GALLERY_COPY.blurb}
        as="h1"
      />

      <div className="px-lg py-xl">
        {!hasAnyPhotos ? (
          <p className="measure border-line-life text-ink-2 mb-xl pl-md border-l-[4px] text-[15px]">
            {GALLERY_COPY.emptyIndex}
          </p>
        ) : null}

        <ul className="flex flex-col">
          {ALBUMS.map((album) => {
            const count = albumCount(album.slug);
            return (
              <li key={album.slug} className="border-rule border-b">
                <Link
                  href={`/documentation/${album.slug}`}
                  className="gap-md py-md flex items-start"
                >
                  <StationBadge
                    code={album.code}
                    line="pribadi"
                    className="mt-[3px]"
                  />
                  <span className="flex-1">
                    <span className="sign-type text-ink block text-[19px]">
                      {album.name}
                    </span>
                    <span className="measure text-ink-2 block text-[15px]">
                      {album.blurb}
                    </span>
                  </span>
                  <span className="text-ink-2 shrink-0 font-mono text-[13px]">
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
