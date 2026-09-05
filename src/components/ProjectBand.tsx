/**
 * Featured project entry: full-bleed band with code, name, year, tagline.
 * Source: design-system.md § Components, ProjectBand.
 *
 * Featured projects on the home page are rendered as distinct bands rather than
 * identical cards. Each one is a full-width coloured band with the project code
 * as a station badge, the name in signage type, and the tagline underneath.
 */

import Link from "next/link";
import type { Project } from "@/content/types";
import { StationBadge } from "./StationBadge";

type ProjectBandProps = {
  project: Project;
  /** Featured projects get the full treatment; index rows are denser. */
  featured?: boolean;
};

export function ProjectBand({ project, featured = false }: ProjectBandProps) {
  const lineColor = project.code.startsWith("P1") ? "kerja" : "pribadi";

  if (featured) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className={`block border-l-[3px] ${
          lineColor === "kerja" ? "border-line-work" : "border-line-life"
        } bg-platform-2 px-lg py-xl hover:bg-platform transition-colors`}
      >
        <div className="gap-md mb-md flex items-center">
          <StationBadge code={project.code} line={lineColor} />
          <h3 className="sign-type text-ink text-[22px]">{project.name}</h3>
          <span className="text-ink-2 ml-auto shrink-0 font-mono text-[13px]">
            {project.year}
          </span>
        </div>
        <p className="measure text-ink-2 text-[17px] leading-relaxed">
          {project.tagline}
        </p>
      </Link>
    );
  }

  // Index row: denser, no background fill
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`block border-l-[3px] ${
        lineColor === "kerja" ? "border-line-work" : "border-line-life"
      } px-lg py-md hover:bg-platform-2 transition-colors`}
    >
      <div className="gap-md flex flex-wrap items-baseline">
        <StationBadge code={project.code} line={lineColor} />
        <h3 className="sign-type text-ink text-[17px]">{project.name}</h3>
        <span className="text-ink-2 shrink-0 font-mono text-[13px]">
          {project.year}
        </span>
        <span className="text-ink-2 text-[15px]">— {project.tagline}</span>
      </div>
    </Link>
  );
}
