import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Scene } from "@/components/mountain/Scene";
import { ProjectRow } from "@/components/ProjectRow";
import { Section, Stack } from "@/components/Section";
import {
  LEGACY_COPY,
  LEGACY_PROJECTS,
  PROJECTS,
  PROJECTS_COPY,
  STATUS_GROUPS,
  projectsWithStatus,
} from "@/content/projects";
import { SITE } from "@/content/site";
import { STAGE_EYEBROW } from "@/content/stage";

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
      <Scene stage="projects" />
      <Hero eyebrow={STAGE_EYEBROW.projects} title="Projects">
        <p className="mt-4 max-w-prose">{PROJECTS_COPY.intro}</p>
        <p className="text-warm mt-4 font-mono text-[11px] tracking-[0.1em] uppercase">
          {PROJECTS.length} projects with a page of their own,{" "}
          {LEGACY_PROJECTS.length} early builds listed at the bottom
        </p>
      </Hero>

      <Stack>
        {grouped.map((group) => (
          <Section
            key={group.status}
            heading={group.heading}
            blurb={group.blurb}
          >
            <div className="flex flex-col gap-7">
              {group.projects.map((project) => (
                <ProjectRow key={project.slug} project={project} as="h3" />
              ))}
            </div>
          </Section>
        ))}

        <Section heading={LEGACY_COPY.heading} blurb={LEGACY_COPY.blurb}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGACY_PROJECTS.map((project) => (
              <li key={project.href}>
                <a
                  href={project.href}
                  rel="noopener noreferrer"
                  className="text-mut hover:text-accent text-sm underline decoration-[var(--line)] transition-colors"
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </Stack>
    </>
  );
}
