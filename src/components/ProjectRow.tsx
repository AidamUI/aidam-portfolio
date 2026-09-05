import Link from "next/link";
import { PROJECTS_COPY, STATUS_LABEL } from "@/content/projects";
import type { Project } from "@/content/types";
import { isConfidential } from "@/content/types";
import { StackTag } from "./StackTag";
import { StationBadge } from "./StationBadge";

/**
 * One project on the index.
 *
 * prd.md §5.3 asks the index to carry status, stack tags and role, not just a
 * name and a line — a reader should be able to tell what a project was and
 * what Aidam did on it without opening it. The row is a band in the route
 * colour rather than a card: no radius, no shadow, no hover lift.
 *
 * A confidential project shows the same shape but says plainly that the detail
 * is withheld, instead of rendering an empty stack row that would read as
 * "nothing was built".
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
    <article className="border-line-work bg-platform-2 mb-md border-l-[3px] last:mb-0">
      <Link
        href={`/projects/${project.slug}`}
        className="hover:bg-platform px-lg py-lg block transition-colors"
      >
        <div className="gap-md mb-sm flex flex-wrap items-baseline">
          <StationBadge code={project.code} line="kerja" />
          <Heading className="sign-type text-ink text-[22px]">
            {project.name}
          </Heading>
          <span className="code-type text-ink-2">
            {STATUS_LABEL[project.status]}
          </span>
          <span className="text-ink-2 ml-auto shrink-0 font-mono text-[13px]">
            {project.year}
          </span>
        </div>

        <p className="measure text-ink mb-md text-[17px] leading-relaxed">
          {project.tagline}
        </p>

        <dl className="gap-sm flex flex-col">
          <div className="gap-sm flex flex-wrap items-baseline">
            <dt className="code-type text-ink-2 shrink-0">
              {PROJECTS_COPY.roleLabel}
            </dt>
            <dd className="measure text-ink-2 text-[15px]">{project.role}</dd>
          </div>

          {withheld ? (
            <div className="gap-sm flex flex-wrap items-baseline">
              <dt className="code-type text-ink-2 shrink-0">
                {PROJECTS_COPY.stackLabel}
              </dt>
              <dd className="text-ink-2 text-[15px]">
                {PROJECTS_COPY.withheldLabel}
              </dd>
            </div>
          ) : project.stack && project.stack.length > 0 ? (
            <div className="gap-sm flex flex-wrap items-baseline">
              <dt className="code-type text-ink-2 shrink-0">
                {PROJECTS_COPY.stackLabel}
              </dt>
              <dd className="gap-sm flex flex-wrap">
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
