"use client";

import { STAGE_ORDER, STAGE_STOPS, type Stage } from "@/lib/stage";
import { Hiker } from "./Hiker";

/**
 * The "you are here" mini route diagram in the header: the whole ascent as
 * one faint line, a dot advancing toward the next stage as the reader scrolls
 * the current page, and the same hiker figure from the scene standing on it.
 *
 * The route line and dots are decorative — the header's nav already marks the
 * current page with `aria-current` — so the SVG is hidden from assistive
 * tech. The caption stays real, visible text.
 */
export function TrailMarker({
  stage,
  progress,
}: {
  stage: Stage;
  progress: number;
}) {
  const key = STAGE_STOPS[stage] ? stage : "home";
  const index = STAGE_ORDER.indexOf(key);
  const [cx, cy, label] = STAGE_STOPS[key];
  const [nx, ny] =
    STAGE_STOPS[STAGE_ORDER[Math.min(index + 1, STAGE_ORDER.length - 1)]];

  const t = Math.max(0, Math.min(1, progress)) * 0.62;
  const x = cx + (nx - cx) * t;
  const y = cy + (ny - cy) * t;

  return (
    <div className="hidden flex-col gap-1 sm:flex">
      <div className="relative h-[34px] w-[148px]" aria-hidden="true">
        <svg
          viewBox="0 0 148 34"
          style={{ display: "block", width: "148px", height: "34px" }}
        >
          <path
            d="M8 26L25 24L43 19L61 11L70 13L79 16L97 16L114 19L132 6"
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
          <path
            d="M132 6L140 12"
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="2 3.5"
            opacity="0.3"
          />
          {STAGE_ORDER.slice(0, -1).map((s) => {
            const [px, py] = STAGE_STOPS[s];
            return (
              <circle
                key={s}
                cx={px}
                cy={py}
                r="1.9"
                fill="var(--line-strong)"
                opacity="0.5"
              />
            );
          })}
          <circle
            cx={STAGE_STOPS.notfound[0]}
            cy={STAGE_STOPS.notfound[1]}
            r="2.6"
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1.4"
            opacity="0.5"
          />
          <circle cx={x} cy={y} r="6.4" fill="var(--pill-bg)" />
          <circle cx={x} cy={y} r="3.2" fill="var(--fig-accent)" />
        </svg>
        <div
          className="absolute"
          style={{
            left: `${x - 4.5}px`,
            top: `${y - 17}px`,
            width: "9px",
            height: "16px",
          }}
        >
          <Hiker />
        </div>
      </div>
      <p className="text-mut font-mono text-[9.5px] tracking-[0.1em] uppercase">
        you are here <span className="opacity-45">/</span>{" "}
        <span className="tracking-[0.04em]">{label}</span>
      </p>
    </div>
  );
}
