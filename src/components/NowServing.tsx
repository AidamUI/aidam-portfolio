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
    <section className="mx-auto max-w-3xl px-6 sm:px-8">
      <div className="border-border bg-bg-subtle rounded-xl border p-8 sm:p-10">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-bold">{NOW.heading}</h2>
          <time
            dateTime={NOW.updated}
            className="text-text-muted font-mono text-xs"
          >
            {updated}
          </time>
        </div>

        <ul className="flex flex-col gap-4">
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
      </div>
    </section>
  );
}
