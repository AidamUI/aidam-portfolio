/**
 * One role: organisation, title, dates, prose, and — where a role has stages
 * or artifacts — a nested timeline and a row of links. Generous spacing
 * throughout; the full summary always renders, never truncated.
 */

import Link from "next/link";
import type { Role } from "@/content/types";
import { monthYear } from "@/lib/format";

type RoleEntryProps = {
  role: Role;
};

export function RoleEntry({ role }: RoleEntryProps) {
  const period = formatPeriod(role.start, role.end);

  return (
    <article className="border-border border-b pb-10 last:border-b-0 last:pb-0">
      <header className="mb-4">
        <h3 className="text-lg font-bold">{role.org}</h3>
        <p className="text-text-muted mt-1">{role.title}</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <time className="text-text-muted font-mono text-sm">{period}</time>
          {role.place ? (
            <span className="text-text-muted text-sm">{role.place}</span>
          ) : null}
          {role.scale ? (
            <span className="text-accent text-sm font-medium">
              {role.scale}
            </span>
          ) : null}
        </div>
      </header>

      <p className="max-w-prose">{role.summary}</p>

      {role.stages && role.stages.length > 0 ? (
        <div className="border-border mt-6 flex flex-col gap-6 border-l pl-6">
          {role.stages.map((stage) => {
            const stagePeriod = formatPeriod(stage.start, stage.end);
            return (
              <div key={stage.title}>
                <p className="font-semibold">{stage.title}</p>
                <time className="text-text-muted block font-mono text-sm">
                  {stagePeriod}
                </time>
                <p className="text-text-muted mt-1 max-w-prose">
                  {stage.summary}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}

      {role.artifacts && role.artifacts.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-3">
          {role.artifacts.map((artifact) => (
            <li key={artifact.href}>
              <Link
                href={artifact.href}
                className="border-border-strong text-text-muted hover:border-accent hover:text-accent inline-block rounded-full border px-3 py-1 text-sm transition-colors"
              >
                {artifact.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function formatPeriod(start: string, end: string | null): string {
  const startFormatted = monthYear(start);
  if (end === null) {
    return `${startFormatted} – present`;
  }
  const endFormatted = monthYear(end);
  return `${startFormatted} – ${endFormatted}`;
}
