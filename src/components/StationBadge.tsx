import type { LineId } from "@/content/types";

/**
 * A route badge: the station code in a pill.
 *
 * Radius rule (design-system.md § Layout): 999px belongs to station markers and
 * route badges only. This is a route badge, so it is the one place in the
 * header that is round — signs, panels and bands stay at 0.
 *
 * The line colour is always present, filled when this is where the reader is
 * and outlined otherwise, so line identity never depends on being the active
 * station. Colour is never the only signal: the code is always rendered.
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
  const fill = line === "kerja" ? "bg-line-work" : "bg-line-life";
  const edge = line === "kerja" ? "border-line-work" : "border-line-life";

  return (
    <span
      className={`code-type inline-flex shrink-0 items-center justify-center rounded-marker border-2 px-sm py-[2px] leading-none tabular-nums ${
        active ? `${fill} ${edge} text-platform` : `${edge} text-ink`
      } ${className}`}
    >
      {code}
    </span>
  );
}
