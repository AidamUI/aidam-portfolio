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
    <article className="border-border rounded-xl border p-8 sm:p-10">
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="mb-3 flex flex-wrap items-baseline gap-3">
          <Heading className="group-hover:text-accent text-xl font-bold transition-colors">
            {project.name}
          </Heading>
          <span className="text-text-muted text-sm">
            {STATUS_LABEL[project.status]}
          </span>
          <span className="text-text-muted ml-auto shrink-0 font-mono text-sm">
            {project.year}
          </span>
        </div>

        <p className="mb-6 max-w-prose">{project.tagline}</p>

        <dl className="flex flex-col gap-4">
          <div>
            <dt className="text-text-muted mb-1 text-sm font-semibold">
              {PROJECTS_COPY.roleLabel}
            </dt>
            <dd className="max-w-prose">{project.role}</dd>
          </div>

          {withheld ? (
            <div>
              <dt className="text-text-muted mb-1 text-sm font-semibold">
                {PROJECTS_COPY.stackLabel}
              </dt>
              <dd className="text-text-muted">{PROJECTS_COPY.withheldLabel}</dd>
            </div>
          ) : project.stack && project.stack.length > 0 ? (
            <div>
              <dt className="text-text-muted mb-1 text-sm font-semibold">
                {PROJECTS_COPY.stackLabel}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <StackTag key={tech} name={tech} interactive={false} />
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </Link>
    </article>
  );
}
