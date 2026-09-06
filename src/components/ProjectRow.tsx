import Link from "next/link";
import { PROJECTS_COPY, STATUS_LABEL } from "@/content/projects";
import type { Project } from "@/content/types";
import { isConfidential } from "@/content/types";
import { StackTag } from "./StackTag";

/**
 * One project on an index. Carries status, role and stack so a reader can
 * tell what a project was and what Aidam did on it without opening it
 * (prd.md §5.3). A confidential project says plainly that detail is withheld,
 * rather than showing an empty stack row that reads as "nothing was built".
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
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
          <Heading className="font-display group-hover:text-accent text-xl font-semibold transition-colors">
            {project.name}
          </Heading>
          <span className="text-warm font-mono text-[11px] tracking-[0.1em] uppercase">
            {STATUS_LABEL[project.status]} · {project.year}
          </span>
        </div>

        <p className="mb-4 max-w-prose">
          <span className="text-mut">{PROJECTS_COPY.roleLabel} — </span>
          {project.role}
        </p>
        <p className="max-w-prose">{project.tagline}</p>

        <div className="mt-4">
          {withheld ? (
            <span className="text-warm border-warm inline-flex rounded-full border border-dashed px-3.5 py-2 text-xs font-semibold">
              {PROJECTS_COPY.withheldLabel}
            </span>
          ) : project.stack && project.stack.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <StackTag key={tech} name={tech} interactive={false} />
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
