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
    <article className="border-line border-t pt-6 first:border-t-0 first:pt-0">
      <header className="mb-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-lg font-semibold">{role.org}</h3>
          <span className="text-warm font-mono text-[11px] tracking-[0.1em] uppercase">
            {period}
            {role.place ? ` · ${role.place}` : ""}
          </span>
        </div>
        <p className="text-mut mt-1">{role.title}</p>
        {role.scale ? (
          <p className="text-mut mt-1 text-sm font-semibold">{role.scale}</p>
        ) : null}
      </header>

      <p className="max-w-prose">{role.summary}</p>

      {role.stages && role.stages.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {role.stages.map((stage, i) => {
            const stagePeriod = formatPeriod(stage.start, stage.end);
            return (
              <div
                key={stage.title}
                className={`flex flex-col gap-1.5 border-t-2 pt-4 ${
                  i === 0 ? "border-accent" : "border-line"
                }`}
              >
                <time className="text-warm font-mono text-[10.5px] tracking-[0.1em]">
                  {stagePeriod}
                </time>
                <p className="font-display font-semibold">{stage.title}</p>
                <p className="text-mut max-w-prose text-sm">{stage.summary}</p>
              </div>
            );
          })}
        </div>
      ) : null}

      {role.artifacts && role.artifacts.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {role.artifacts.map((artifact) => (
            <li key={artifact.href}>
              <Link
                href={artifact.href}
                className="bg-pill-bg text-pill-ink inline-block rounded-full px-3.5 py-1.5 text-sm font-semibold hover:opacity-80"
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
