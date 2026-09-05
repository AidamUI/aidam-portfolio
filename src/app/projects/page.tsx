import type { Metadata } from "next";
import { ProjectRow } from "@/components/ProjectRow";
import { StationSign } from "@/components/StationSign";
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
 * The index, grouped by status rather than run as one flat list.
 *
 * prd.md §5.3 asks for status, stack tags and role on the index. Grouping does
 * the same job the signage does elsewhere: a reader scanning for real work
 * should not have to read six rows to work out which two are live competition
 * entries and which four are coursework. Each group gets its own sign, and
 * empty groups are omitted rather than rendered as a heading over nothing.
 */
export default function ProjectsPage() {
  const grouped = STATUS_GROUPS.map((group) => ({
    ...group,
    projects: projectsWithStatus(group.status).sort((a, b) => b.year - a.year),
  })).filter((group) => group.projects.length > 0);

  return (
    <>
      <StationSign
        code="P1"
        name="Projects"
        line="kerja"
        blurb="Everything shipped, newest first"
        as="h1"
      />

      <section className="px-lg py-xl">
        <p className="measure text-ink text-[17px] leading-relaxed">
          {PROJECTS_COPY.intro}
        </p>
        <p className="text-ink-2 mt-md font-mono text-[13px]">
          {/* Two facts, two lines. design-system.md rules out middot meta strings. */}
          {PROJECTS.length} projects with a page of their own
          <br />
          {LEGACY_PROJECTS.length} early builds, listed at the bottom
        </p>
      </section>

      {grouped.map((group) => (
        <div key={group.status}>
          <StationSign
            code={group.code}
            name={group.heading}
            line="kerja"
            blurb={group.blurb}
          />
          <div className="px-lg py-xl">
            {group.projects.map((project) => (
              <ProjectRow key={project.slug} project={project} as="h3" />
            ))}
          </div>
        </div>
      ))}

      <StationSign
        code="P1.E"
        name={LEGACY_COPY.heading}
        line="kerja"
        blurb={LEGACY_COPY.blurb}
      />
      <div className="px-lg py-xl">
        <ul className="gap-sm flex flex-wrap">
          {LEGACY_PROJECTS.map((project) => (
            <li key={project.href}>
              <a
                href={project.href}
                rel="noopener noreferrer"
                className="border-rule text-ink-2 px-sm hover:border-line-work hover:text-ink inline-block border py-[2px] font-mono text-[13px] transition-colors"
              >
                {project.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
