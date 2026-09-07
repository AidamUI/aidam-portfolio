/**
 * Four stops so far, laid out as a row of short columns rather than a
 * timeline — each one a year, a name, and one line of detail, with the trail
 * marked at its start.
 */

import { CAREER_STOPS } from "@/content/now";

export function CareerRoute() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {CAREER_STOPS.map((stop, i) => (
        <div
          key={stop.label}
          className={`flex flex-col gap-2 border-t-[3px] pt-5 ${
            i === 0 ? "border-accent" : "border-line"
          }`}
        >
          <span className="text-warm font-mono text-[11px] tracking-[0.1em]">
            {stop.year}
          </span>
          <span className="font-display text-lg font-semibold">
            {stop.label}
          </span>
          <span className="text-mut">{stop.detail}</span>
        </div>
      ))}
    </div>
  );
}
