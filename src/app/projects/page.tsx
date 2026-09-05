import type { Metadata } from "next";
import { ProjectRow } from "@/components/ProjectRow";
import { Section } from "@/components/Section";
import {
  LEGACY_COPY,
  LEGACY_PROJECTS,
  PROJECTS,
  PROJECTS_COPY,
  STATUS_GROUPS,
  projectsWithStatus,
} from "@/content/projects";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
  description: `Everything shipped, newest first — ${SITE.goesBy}`,
};

/**
 * The index, grouped by status rather than run as one flat list — a reader
 * scanning for real work should not have to read six rows to work out which
 * two are live competition entries and which four are coursework. Empty
 * groups are omitted rather than rendered as a heading over nothing.
 */
export default function ProjectsPage() {
  const grouped = STATUS_GROUPS.map((group) => ({
    ...group,
    projects: projectsWithStatus(group.status).sort((a, b) => b.year - a.year),
  })).filter((group) => group.projects.length > 0);

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-8 sm:px-8 sm:pt-24">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 max-w-prose">{PROJECTS_COPY.intro}</p>
        <p className="text-text-muted mt-4 font-mono text-sm">
          {PROJECTS.length} projects with a page of their own,{" "}
          {LEGACY_PROJECTS.length} early builds listed at the bottom
        </p>
      </div>

      {grouped.map((group, i) => (
        <Section
          key={group.status}
          heading={group.heading}
          blurb={group.blurb}
          subtle={i % 2 === 1}
        >
          <div className="flex flex-col gap-6">
            {group.projects.map((project) => (
              <ProjectRow key={project.slug} project={project} as="h3" />
            ))}
          </div>
        </Section>
      ))}

      <Section heading={LEGACY_COPY.heading} blurb={LEGACY_COPY.blurb} subtle>
        <ul className="flex flex-wrap gap-3">
          {LEGACY_PROJECTS.map((project) => (
            <li key={project.href}>
              <a
                href={project.href}
                rel="noopener noreferrer"
                className="border-border-strong text-text-muted hover:border-accent hover:text-accent inline-block rounded-full border px-3 py-1 text-sm transition-colors"
              >
                {project.name}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
