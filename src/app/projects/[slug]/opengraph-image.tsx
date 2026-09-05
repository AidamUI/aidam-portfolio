import { notFound } from "next/navigation";
import { PROJECTS, projectBySlug } from "@/content/projects";
import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * A card per project. These are the most linkable URLs on the site — a case
 * study is what gets pasted into an application — so they get their own
 * one-liner rather than inheriting the site card.
 *
 * Nothing withheld leaks here: the card renders `tagline` only, which is the
 * same public one-liner the index shows, never `build`, `stack` or `links`.
 */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return renderCard({
    title: project.name,
    subtitle: project.tagline,
    footer: `${project.status}   ${project.year}`,
  });
}
