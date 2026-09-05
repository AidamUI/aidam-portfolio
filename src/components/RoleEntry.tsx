/**
 * Role entry: plain prose under a station sign. No card, no border, no hover
 * lift. Source: design-system.md § Components, RoleEntry.
 *
 * Roles with stages (AIESEC's four, BEM's two) render as one entry with a
 * progression timeline rather than as separate rows.
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
    <article className="mb-2xl last:mb-0">
      <header className="mb-md">
        <h3 className="sign-type text-ink text-[19px]">{role.org}</h3>
        <p className="text-ink-2 text-[17px]">{role.title}</p>
        <div className="mt-xs gap-md flex flex-wrap items-baseline">
          <time className="text-ink-2 font-mono text-[13px]">{period}</time>
          {role.place ? (
            <span className="text-ink-2 text-[15px]">{role.place}</span>
          ) : null}
          {role.scale ? (
            <span className="text-ink-2 text-[15px]">{role.scale}</span>
          ) : null}
        </div>
      </header>

      <div className="measure text-ink text-[17px] leading-relaxed">
        <p>{role.summary}</p>
      </div>

      {role.stages && role.stages.length > 0 ? (
        <div className="mt-lg border-line-work pl-lg border-l-[3px]">
          {role.stages.map((stage, i) => {
            const stagePeriod = formatPeriod(stage.start, stage.end);
            return (
              <div key={i} className="mb-lg last:mb-0">
                <p className="sign-type text-ink text-[17px]">{stage.title}</p>
                <time className="text-ink-2 block font-mono text-[13px]">
                  {stagePeriod}
                </time>
                <p className="measure text-ink-2 mt-xs text-[15px] leading-relaxed">
                  {stage.summary}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}

      {role.artifacts && role.artifacts.length > 0 ? (
        <ul className="mt-md gap-sm flex flex-wrap">
          {role.artifacts.map((artifact, i) => (
            <li key={i}>
              <Link
                href={artifact.href}
                className="text-ink-2 font-mono text-[13px] underline"
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
