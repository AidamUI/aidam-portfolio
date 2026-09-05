/**
 * A simple vertical timeline of career milestones. One column at every
 * width, per the redesign brief — no separate horizontal desktop layout to
 * keep in sync, no drawn route line or station markers.
 */

import { CAREER_STOPS } from "@/content/now";

export function CareerRoute() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <ol className="border-border flex flex-col gap-10 border-l pl-8">
        {CAREER_STOPS.map((stop) => (
          <li key={stop.label} className="relative">
            <span
              className="bg-accent absolute top-1.5 -left-[37px] h-3 w-3 rounded-full"
              aria-hidden="true"
            />
            <p className="text-text-muted font-mono text-sm">{stop.year}</p>
            <p className="mt-1 text-lg font-semibold">{stop.label}</p>
            <p className="text-text-muted mt-1">{stop.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
