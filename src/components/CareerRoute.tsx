/**
 * Hero timeline: career stops as a horizontal route on desktop, vertical on
 * mobile. Source: design-system.md § Wireframes and now.ts CAREER_STOPS.
 *
 * The route line runs left to right on desktop (≥768px), top to bottom on
 * mobile. Each stop is a station marker with a label, detail and year.
 */

import { CAREER_STOPS } from "@/content/now";

export function CareerRoute() {
  return (
    <div className="px-lg py-xl">
      {/* Mobile: vertical */}
      <div className="md:hidden">
        <div className="relative pl-lg">
          {/* Vertical line */}
          <div
            className="bg-line-work absolute left-0 top-0 h-full w-[4px]"
            aria-hidden="true"
          />
          {CAREER_STOPS.map((stop, i) => (
            <div key={i} className="relative mb-xl last:mb-0">
              {/* Station marker */}
              <div
                className="bg-line-work absolute -left-[10px] top-[3px] h-[20px] w-[20px] rounded-full border-[3px] border-platform"
                aria-hidden="true"
              />
              <div>
                <p className="sign-type text-ink text-[17px]">{stop.label}</p>
                <p className="text-ink-2 text-[15px]">{stop.detail}</p>
                <p className="text-ink-2 font-mono text-[13px]">{stop.year}</p>
              </div>
            </div>
          ))}
          {/* Arrow end */}
          <div
            className="bg-line-work absolute -left-[2px] bottom-0 h-0 w-0 translate-y-full border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <div className="relative pb-2xl pt-md">
          {/* Horizontal line */}
          <div
            className="bg-line-work absolute left-0 top-[10px] h-[4px] w-full"
            aria-hidden="true"
          />
          <div className="relative flex justify-between">
            {CAREER_STOPS.map((stop, i) => (
              <div key={i} className="relative flex-1 text-center first:text-left last:text-right">
                {/* Station marker */}
                <div
                  className="bg-line-work absolute left-1/2 top-0 h-[20px] w-[20px] -translate-x-1/2 rounded-full border-[3px] border-platform first:left-0 first:translate-x-0 last:left-auto last:right-0 last:translate-x-0"
                  aria-hidden="true"
                />
                <div className="pt-xl">
                  <p className="sign-type text-ink text-[17px]">{stop.label}</p>
                  <p className="text-ink-2 text-[15px]">{stop.detail}</p>
                  <p className="text-ink-2 font-mono text-[13px]">{stop.year}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Arrow end */}
          <div
            className="bg-line-work absolute right-0 top-[8px] h-0 w-0 translate-x-full border-b-[6px] border-l-[8px] border-t-[6px] border-b-transparent border-t-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

// Made with Bob
