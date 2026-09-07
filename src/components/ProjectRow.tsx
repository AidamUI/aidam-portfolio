import Link from "next/link";
import { PROJECTS_COPY, STATUS_LABEL } from "@/content/projects";
import type { Project } from "@/content/types";
import { isConfidential } from "@/content/types";
import { StackTag } from "./StackTag";

/**
 * One project on an index: name and status up top, then its GitHub/live
 * links surfaced immediately (not buried at the bottom of the case study),
 * then what the project is and does, then its stack as a row of pills. A
 * confidential project says plainly that detail is withheld instead of
 * showing an empty links row or stack row that reads as "nothing was built".
 */
export function ProjectRow({
  project,
  as: Heading = "h3",
}: {
  project: Project;
  as?: "h2" | "h3";
}) {
  const withheld = isConfidential(project);

  return (
    <article className="border-line border-t pt-7 first:border-t-0 first:pt-0">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
        <Link href={`/projects/${project.slug}`} className="group">
          <Heading className="font-display group-hover:text-accent text-xl font-semibold transition-colors">
            {project.name}
          </Heading>
        </Link>
        <span className="text-warm font-mono text-[11px] tracking-[0.1em] uppercase">
          {STATUS_LABEL[project.status]} · {project.year}
        </span>
      </div>

      <p className="text-mut mb-4 max-w-prose">{project.tagline}</p>

      {withheld ? (
        <p className="mb-4">
          <span className="text-warm font-mono text-[11px] tracking-[0.1em] uppercase">
            {PROJECTS_COPY.withheldLabel}
          </span>
        </p>
      ) : project.links && project.links.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1.5">
          {project.links.map((link) => {
            const external = !link.href.startsWith("/");
            return (
              <a
                key={link.href}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="text-accent text-sm font-semibold underline decoration-1 underline-offset-2 hover:opacity-80"
              >
                {link.label}
                {external ? " ↗" : ""}
              </a>
            );
          })}
        </div>
      ) : null}

      <p className="max-w-prose">{project.what}</p>

      <div className="mt-4">
        {!withheld && project.stack && project.stack.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <StackTag key={tech} name={tech} interactive={false} pill />
            ))}
          </div>
        ) : null}
      </div>

      <p className="mt-4">
        <Link
          href={`/projects/${project.slug}`}
          className="text-accent text-sm font-semibold underline decoration-1 underline-offset-2 hover:opacity-80"
        >
          {PROJECTS_COPY.viewCaseStudy} →
        </Link>
      </p>
    </article>
  );
}
