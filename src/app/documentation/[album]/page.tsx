import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { Scene } from "@/components/mountain/Scene";
import { PhotoGrid } from "@/components/PhotoGrid";
import { Section, Stack } from "@/components/Section";
import {
  ALBUMS,
  GALLERY_COPY,
  albumBySlug,
  albumDisplayItems,
} from "@/content/gallery";
import { STAGE_EYEBROW } from "@/content/stage";

/**
 * Next 15 passes `params` as a Promise. Typing it as a plain object compiles
 * locally but fails the production build against the generated PageProps
 * constraint, which is how this route broke once before.
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
 * renders when there are none. What sits below it is a placeholder preview
 * grid — clearly labelled, never counted as real content — so the page has
 * the weight of an actual gallery. `albumDisplayItems` is the single place
 * that decides which grid shows.
 */
export default async function AlbumPage({ params }: Props) {
  const { album: slug } = await params;
  const album = albumBySlug(slug);
  if (!album) notFound();

  const { items, isPlaceholder } = albumDisplayItems(album.slug);

  return (
    <>
      <Scene stage="docs" />
      <Hero eyebrow={STAGE_EYEBROW.docs} title={album.name}>
        <p className="text-mut mt-4 max-w-prose">{album.blurb}</p>
      </Hero>

      <Stack>
        <Section>
          {isPlaceholder ? (
            <div className="border-warm mb-6 border-l-4 pl-6">
              <p>{GALLERY_COPY.emptyAlbum}</p>
              <p className="text-mut mt-1 max-w-prose text-sm">
                {GALLERY_COPY.emptyAlbumDetail}
              </p>
            </div>
          ) : null}

          {isPlaceholder ? (
            <p className="text-mut mb-4 text-sm font-semibold">
              {GALLERY_COPY.previewLabel}
            </p>
          ) : null}

          <div className={isPlaceholder ? "opacity-60" : ""}>
            <PhotoGrid items={items} />
          </div>

          {isPlaceholder ? (
            <p className="text-mut mt-6 max-w-prose text-xs">
              {GALLERY_COPY.previewDetail}
            </p>
          ) : null}
        </Section>

        <p>
          <Link
            href="/documentation"
            className="text-accent font-semibold underline"
          >
            {GALLERY_COPY.allAlbums}
          </Link>
        </p>
      </Stack>
    </>
  );
}
