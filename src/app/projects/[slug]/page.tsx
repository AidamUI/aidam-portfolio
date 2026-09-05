import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { StackTag } from "@/components/StackTag";
import { PLACEHOLDER_BLUR } from "@/content/placeholder-blur";
import {
  PROJECTS,
  PROJECTS_COPY,
  STATUS_LABEL,
  projectBySlug,
} from "@/content/projects";
import { isConfidential } from "@/content/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: `${project.tagline} — ${project.role}`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

/**
 * One case study.
 *
 * The template branches on `confidential`, not on whether the fields happen
 * to be empty. On a confidential project the type makes `build`, `outcome`,
 * `stack`, `links` and `images` impossible, so this cannot leak them even if
 * someone adds them to the data by mistake — that is a build error, not a
 * runtime one. What a withheld project gets instead is an explicit panel
 * saying so, rather than a page that just looks unfinished.
 *
 * Everything the confidentiality rule governs lives inside the single
 * <article> below, so a test scoped to `article img` / `article a[href^=http]`
 * genuinely covers the whole case study, not just part of it.
 */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const withheld = isConfidential(project);
  const index = PROJECTS.findIndex((candidate) => candidate.slug === slug);
  const previous = index > 0 ? PROJECTS[index - 1] : null;
  const next = index < PROJECTS.length - 1 ? PROJECTS[index + 1] : null;

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-8 sm:px-8 sm:pt-24">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          {project.name}
        </h1>
        <p className="text-text-muted mt-3 max-w-prose">{project.tagline}</p>
      </div>

      <article>
        <Section subtle>
          <dl className="flex flex-wrap gap-8">
            <div>
              <dt className="text-text-muted text-sm font-semibold">Status</dt>
              <dd className="mt-1">{STATUS_LABEL[project.status]}</dd>
            </div>
            <div>
              <dt className="text-text-muted text-sm font-semibold">Year</dt>
              <dd className="mt-1 font-mono">{project.year}</dd>
            </div>
            <div className="min-w-full sm:min-w-0">
              <dt className="text-text-muted text-sm font-semibold">
                {PROJECTS_COPY.roleLabel}
              </dt>
              <dd className="mt-1 max-w-prose">{project.role}</dd>
            </div>
          </dl>
        </Section>

        <Section heading="Problem">
          <p className="max-w-prose">{project.problem}</p>
        </Section>

        <Section heading="What it does" subtle>
          <p className="max-w-prose">{project.what}</p>
        </Section>

        {withheld ? (
          <Section heading={PROJECTS_COPY.withheldLabel}>
            <p className="border-accent max-w-prose border-l-4 pl-6">
              {project.withheldNote}
            </p>
          </Section>
        ) : (
          <>
            {project.build ? (
              <Section heading="Build">
                <p className="max-w-prose">{project.build}</p>
              </Section>
            ) : null}

            {project.stack && project.stack.length > 0 ? (
              <Section heading={PROJECTS_COPY.stackLabel} subtle>
                <ul className="flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <StackTag name={tech} />
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {project.images && project.images.length > 0 ? (
              <Section heading={PROJECTS_COPY.imagesLabel}>
                <div className="flex flex-col gap-10">
                  {project.images.map((image) => (
                    <figure key={image.src}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        placeholder="blur"
                        blurDataURL={PLACEHOLDER_BLUR}
                        sizes="(min-width: 768px) 720px, 100vw"
                        className="h-auto w-full rounded-lg"
                      />
                      {image.caption ? (
                        <figcaption className="text-text-muted mt-2 text-sm">
                          {image.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ))}
                </div>
              </Section>
            ) : null}

            {project.outcome ? (
              <Section heading="Outcome" subtle>
                <p className="max-w-prose">{project.outcome}</p>
              </Section>
            ) : null}

            {project.links && project.links.length > 0 ? (
              <Section heading="Links">
                <ul className="flex flex-col gap-3">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        rel="noopener noreferrer"
                        className="text-accent underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}
          </>
        )}
      </article>

      {/* Onward navigation, so a case study is not a dead end. */}
      <nav
        aria-label={PROJECTS_COPY.moreProjects}
        className="border-border border-t"
      >
        <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
          <ul className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            {previous ? (
              <li>
                <Link
                  href={`/projects/${previous.slug}`}
                  className="group block"
                >
                  <span className="text-text-muted block text-sm">
                    {PROJECTS_COPY.prevProject}
                  </span>
                  <span className="group-hover:text-accent mt-1 block font-semibold underline transition-colors">
                    {previous.name}
                  </span>
                </Link>
              </li>
            ) : null}
            {next ? (
              <li className="sm:text-right">
                <Link href={`/projects/${next.slug}`} className="group block">
                  <span className="text-text-muted block text-sm">
                    {PROJECTS_COPY.nextProject}
                  </span>
                  <span className="group-hover:text-accent mt-1 block font-semibold underline transition-colors">
                    {next.name}
                  </span>
                </Link>
              </li>
            ) : null}
          </ul>
          <p className="mt-10">
            <Link href="/projects" className="text-accent underline">
              {PROJECTS_COPY.moreProjects}
            </Link>
          </p>
        </div>
      </nav>
    </>
  );
}
