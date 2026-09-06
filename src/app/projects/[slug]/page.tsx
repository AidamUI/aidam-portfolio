import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { Scene } from "@/components/mountain/Scene";
import { Section, Stack } from "@/components/Section";
import { StackTag } from "@/components/StackTag";
import { PLACEHOLDER_BLUR } from "@/content/placeholder-blur";
import {
  PROJECTS,
  PROJECTS_COPY,
  STATUS_LABEL,
  projectBySlug,
} from "@/content/projects";
import { STAGE_EYEBROW } from "@/content/stage";
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
 * genuinely covers the whole case study, not just part of it. The scene above
 * it (a misty vs. clear crater-wall descent) is decoration only — it carries
 * no project detail, confidential or otherwise.
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
      <Scene stage={withheld ? "confidential" : "open"} />
      <Hero
        eyebrow={STAGE_EYEBROW[withheld ? "confidential" : "open"]}
        title={project.name}
      >
        <p className="mt-4 max-w-prose text-lg">{project.tagline}</p>
        <dl className="border-line mt-7 flex flex-wrap gap-x-10 gap-y-3 border-t pt-6">
          <div className="flex flex-col gap-1.5">
            <dt className="text-warm font-mono text-[10.5px] tracking-[0.12em] uppercase">
              Status
            </dt>
            <dd className="font-semibold">{STATUS_LABEL[project.status]}</dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-warm font-mono text-[10.5px] tracking-[0.12em] uppercase">
              Year
            </dt>
            <dd className="font-semibold">{project.year}</dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="text-warm font-mono text-[10.5px] tracking-[0.12em] uppercase">
              {PROJECTS_COPY.roleLabel}
            </dt>
            <dd className="max-w-prose font-semibold">{project.role}</dd>
          </div>
        </dl>
      </Hero>

      <Stack>
        <article className="contents">
          <Section heading="Problem">
            <p className="max-w-prose">{project.problem}</p>
          </Section>

          <Section heading="What it does">
            <p className="max-w-prose">{project.what}</p>
          </Section>

          {withheld ? (
            <Section heading={PROJECTS_COPY.withheldLabel}>
              <p className="border-warm max-w-prose border-l-4 pl-6">
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
                <Section heading={PROJECTS_COPY.stackLabel}>
                  <p className="text-lg">
                    {project.stack.map((tech, i) => (
                      <Fragment key={tech}>
                        {i > 0 ? <span className="text-mut"> · </span> : null}
                        <StackTag name={tech} />
                      </Fragment>
                    ))}
                  </p>
                </Section>
              ) : null}

              {project.images && project.images.length > 0 ? (
                <Section heading={PROJECTS_COPY.imagesLabel}>
                  <div className="flex flex-col gap-8">
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
                          className="h-auto w-full rounded-2xl"
                        />
                        {image.caption ? (
                          <figcaption className="text-mut mt-2 text-sm">
                            {image.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    ))}
                  </div>
                </Section>
              ) : null}

              {project.outcome ? (
                <Section heading="Outcome">
                  <p className="max-w-prose">{project.outcome}</p>
                </Section>
              ) : null}

              {project.links && project.links.length > 0 ? (
                <Section heading="Links">
                  <ul className="flex flex-col">
                    {project.links.map((link) => (
                      <li
                        key={link.href}
                        className="border-line flex justify-between gap-4 border-b py-3 last:border-b-0"
                      >
                        <a
                          href={link.href}
                          rel="noopener noreferrer"
                          className="text-accent font-semibold underline"
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
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="card group block px-6 py-6"
            >
              <span className="text-warm font-mono text-[10.5px] tracking-[0.12em] uppercase">
                ← {PROJECTS_COPY.prevProject}
              </span>
              <span className="font-display group-hover:text-accent mt-3 block font-semibold transition-colors">
                {previous.name}
              </span>
            </Link>
          ) : null}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="card group block px-6 py-6 sm:text-right"
            >
              <span className="text-warm font-mono text-[10.5px] tracking-[0.12em] uppercase">
                {PROJECTS_COPY.nextProject} →
              </span>
              <span className="font-display group-hover:text-accent mt-3 block font-semibold transition-colors">
                {next.name}
              </span>
            </Link>
          ) : null}
        </nav>

        <p>
          <Link
            href="/projects"
            className="text-accent font-semibold underline"
          >
            {PROJECTS_COPY.moreProjects}
          </Link>
        </p>
      </Stack>
    </>
  );
}
