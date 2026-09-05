import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StackTag } from "@/components/StackTag";
import { StationBadge } from "@/components/StationBadge";
import { StationSign } from "@/components/StationSign";
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
 * The template branches on `confidential`, not on whether the fields happen to
 * be empty. On a confidential project the type makes `build`, `outcome`,
 * `stack`, `links` and `images` impossible, so this cannot leak them even if
 * someone adds them to the data by mistake — that is a build error, not a
 * runtime one. What a withheld project gets instead is an explicit panel
 * saying so, rather than a page that just looks unfinished.
 *
 * Sections are separated by station signs rather than whitespace, which is how
 * design-system.md builds a boundary, and gives a long page real structure to
 * scan.
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
      <StationSign
        code={project.code}
        name={project.name}
        line="kerja"
        blurb={project.tagline}
        as="h1"
      />

      <article>
        <section className="px-lg py-xl">
          <dl className="gap-lg flex flex-wrap">
            <div>
              <dt className="code-type text-ink-2">Status</dt>
              <dd className="text-ink mt-xs text-[17px]">
                {STATUS_LABEL[project.status]}
              </dd>
            </div>
            <div>
              <dt className="code-type text-ink-2">Year</dt>
              <dd className="text-ink mt-xs font-mono text-[17px]">
                {project.year}
              </dd>
            </div>
            <div className="min-w-full sm:min-w-0">
              <dt className="code-type text-ink-2">
                {PROJECTS_COPY.roleLabel}
              </dt>
              <dd className="measure text-ink mt-xs text-[17px]">
                {project.role}
              </dd>
            </div>
          </dl>
        </section>

        <StationSign code="1" name="Problem" line="kerja" />
        <section className="px-lg py-xl">
          <p className="measure text-ink text-[17px] leading-relaxed">
            {project.problem}
          </p>
        </section>

        <StationSign code="2" name="What it does" line="kerja" />
        <section className="px-lg py-xl">
          <p className="measure text-ink text-[17px] leading-relaxed">
            {project.what}
          </p>
        </section>

        {withheld ? (
          <>
            <StationSign
              code="3"
              name={PROJECTS_COPY.withheldLabel}
              line="pribadi"
            />
            <section className="px-lg py-xl">
              <p className="measure border-marker text-ink pl-md border-l-[4px] text-[17px] leading-relaxed">
                {project.withheldNote}
              </p>
            </section>
          </>
        ) : (
          <>
            {project.build ? (
              <>
                <StationSign code="3" name="Build" line="kerja" />
                <section className="px-lg py-xl">
                  <p className="measure text-ink text-[17px] leading-relaxed">
                    {project.build}
                  </p>
                </section>
              </>
            ) : null}

            {project.stack && project.stack.length > 0 ? (
              <section className="bg-platform-2 px-lg py-xl">
                <h2 className="code-type text-ink-2 mb-md">
                  {PROJECTS_COPY.stackLabel}
                </h2>
                <ul className="gap-sm flex flex-wrap">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <StackTag name={tech} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.images && project.images.length > 0 ? (
              <>
                <StationSign
                  code="4"
                  name={PROJECTS_COPY.imagesLabel}
                  line="kerja"
                />
                <section className="px-lg py-xl">
                  <div className="gap-xl flex flex-col">
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
                          className="h-auto w-full"
                        />
                        {image.caption ? (
                          <figcaption className="measure text-ink-2 mt-sm text-[14px]">
                            {image.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    ))}
                  </div>
                </section>
              </>
            ) : null}

            {project.outcome ? (
              <>
                <StationSign code="5" name="Outcome" line="kerja" />
                <section className="px-lg py-xl">
                  <p className="measure text-ink text-[17px] leading-relaxed">
                    {project.outcome}
                  </p>
                </section>
              </>
            ) : null}

            {project.links && project.links.length > 0 ? (
              <section className="bg-platform-2 px-lg py-xl">
                <h2 className="code-type text-ink-2 mb-md">Links</h2>
                <ul className="gap-sm flex flex-col">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        rel="noopener noreferrer"
                        className="text-ink text-[17px] underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </>
        )}
      </article>

      {/* Onward navigation, so a case study is not a dead end. */}
      <nav
        aria-label={PROJECTS_COPY.moreProjects}
        className="border-rule px-lg py-xl border-t"
      >
        <ul className="gap-lg flex flex-col sm:flex-row sm:justify-between">
          {previous ? (
            <li>
              <Link href={`/projects/${previous.slug}`} className="block">
                <span className="code-type text-ink-2 block">
                  {PROJECTS_COPY.prevProject}
                </span>
                <span className="gap-sm mt-xs flex items-center">
                  <StationBadge code={previous.code} line="kerja" />
                  <span className="sign-type text-ink text-[17px] underline">
                    {previous.name}
                  </span>
                </span>
              </Link>
            </li>
          ) : null}
          {next ? (
            <li className="sm:text-right">
              <Link href={`/projects/${next.slug}`} className="block">
                <span className="code-type text-ink-2 block">
                  {PROJECTS_COPY.nextProject}
                </span>
                <span className="gap-sm mt-xs flex items-center sm:justify-end">
                  <StationBadge code={next.code} line="kerja" />
                  <span className="sign-type text-ink text-[17px] underline">
                    {next.name}
                  </span>
                </span>
              </Link>
            </li>
          ) : null}
        </ul>
        <p className="mt-xl">
          <Link href="/projects" className="text-ink-2 text-[15px] underline">
            {PROJECTS_COPY.moreProjects}
          </Link>
        </p>
      </nav>
    </>
  );
}
