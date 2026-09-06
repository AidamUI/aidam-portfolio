/**
 * The "currently" block: what's happening this month. Source: content/now.ts.
 *
 * Carries its own date rather than the build date — a rebuild for an
 * unrelated reason must not make stale news look fresh.
 */

import { NOW } from "@/content/now";
import { formatDate } from "@/lib/format";

export function NowServing() {
  const updated = formatDate(NOW.updated);

  return (
    <>
      <time dateTime={NOW.updated} className="text-mut font-mono text-xs">
        Updated {updated}
      </time>
      <ul className="mt-5 flex flex-col gap-4">
        {NOW.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              className="bg-accent mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
              aria-hidden="true"
            />
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
