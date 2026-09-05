import type { Metadata } from "next";
import { ProjectBand } from "@/components/ProjectBand";
import { StationSign } from "@/components/StationSign";
import { LEGACY_COPY, LEGACY_PROJECTS, PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
  description: `Everything shipped, newest first — ${SITE.goesBy}`,
};

export default function ProjectsPage() {
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
        <div className="mb-xl">
          {PROJECTS.map((project) => (
            <div key={project.slug} className="mb-md last:mb-0">
              <ProjectBand project={project} as="h2" />
            </div>
          ))}
        </div>

        {/* Legacy projects */}
        <div className="border-rule pt-xl border-t">
          <h2 className="sign-type mb-sm text-ink text-[19px]">
            {LEGACY_COPY.heading}
          </h2>
          <p className="measure text-ink-2 mb-lg text-[15px]">
            {LEGACY_COPY.blurb}
          </p>
          <ul className="gap-sm flex flex-wrap">
            {LEGACY_PROJECTS.map((project, i) => (
              <li key={i}>
                <a
                  href={project.href}
                  rel="noopener noreferrer"
                  className="text-ink font-mono text-[13px] underline"
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
