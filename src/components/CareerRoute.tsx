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
        <div className="pl-lg relative">
          {/* Vertical line */}
          <div
            className="bg-line-work absolute top-0 left-0 h-full w-[4px]"
            aria-hidden="true"
          />
          {CAREER_STOPS.map((stop, i) => (
            <div key={i} className="mb-xl relative last:mb-0">
              {/* Station marker */}
              <div
                className="bg-line-work border-platform absolute top-[3px] -left-[10px] h-[20px] w-[20px] rounded-full border-[3px]"
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
            className="bg-line-work absolute bottom-0 -left-[2px] h-0 w-0 translate-y-full border-t-[8px] border-r-[6px] border-l-[6px] border-r-transparent border-l-transparent"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <div className="pb-2xl pt-md relative">
          {/* Horizontal line */}
          <div
            className="bg-line-work absolute top-[10px] left-0 h-[4px] w-full"
            aria-hidden="true"
          />
          <div className="relative flex justify-between">
            {CAREER_STOPS.map((stop, i) => (
              <div
                key={i}
                className="relative flex-1 text-center first:text-left last:text-right"
              >
                {/* Station marker */}
                <div
                  className="bg-line-work border-platform absolute top-0 left-1/2 h-[20px] w-[20px] -translate-x-1/2 rounded-full border-[3px] first:left-0 first:translate-x-0 last:right-0 last:left-auto last:translate-x-0"
                  aria-hidden="true"
                />
                <div className="pt-xl">
                  <p className="sign-type text-ink text-[17px]">{stop.label}</p>
                  <p className="text-ink-2 text-[15px]">{stop.detail}</p>
                  <p className="text-ink-2 font-mono text-[13px]">
                    {stop.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Arrow end */}
          <div
            className="bg-line-work absolute top-[8px] right-0 h-0 w-0 translate-x-full border-t-[6px] border-b-[6px] border-l-[8px] border-t-transparent border-b-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
