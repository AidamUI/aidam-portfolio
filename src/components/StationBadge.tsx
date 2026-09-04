import type { LineId } from "@/content/types";

/**
 * A route badge: the station code in a pill.
 *
 * Radius rule (design-system.md § Layout): 999px belongs to station markers and
 * route badges only. This is a route badge, so it is the one round thing in the
 * header — signs, panels and bands stay at 0.
 *
 * ── Why the active badge is filled with --marker, not with the line colour ──
 *
 * The header spec says "current one filled", and the obvious reading is
 * "filled in its route colour". Measured, that reading does not survive the
 * day platform: 13px/700 text does not qualify as large text, so it needs
 * 4.5:1, and --line-life-lt (#D9451F) tops out at 4.36:1 with white and 4.82:1
 * with pure black — no on-palette colour clears AA on it, and pure black is
 * exactly the near-black the palette was written to avoid.
 *
 * --marker is the token the design doc reserves for "you are here", which is
 * precisely what the current station is, and it is specified to take ink on
 * top. Measured: 12.38:1 in graphite, 5.51:1 on the day platform. So the
 * active badge is filled with the marker and keeps its route colour as the
 * ring, which means line identity survives in both states and the fill never
 * depends on a route colour carrying small text.
 *
 * Colour is never the only signal: the code is always rendered, and the header
 * also sets aria-current on the link.
 */
export function StationBadge({
  code,
  line,
  active = false,
  className = "",
}: {
  code: string;
  line: LineId;
  active?: boolean;
  className?: string;
}) {
  const edge = line === "kerja" ? "border-line-work" : "border-line-life";

  return (
    <span
      className={`code-type rounded-marker px-sm inline-flex shrink-0 items-center justify-center border-2 py-[2px] leading-none tabular-nums ${edge} ${
        active ? "bg-marker text-on-marker" : "text-ink"
      } ${className}`}
    >
      {code}
    </span>
  );
}
