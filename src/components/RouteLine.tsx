/**
 * The spine. One per page, running the full height of the shell inside the
 * rail — 20px from the left edge on mobile, centred in the 72px rail on
 * desktop.
 *
 * Decorative: hidden from assistive technology entirely. The station codes
 * carry the navigational meaning, so nothing is lost by removing the line
 * from the accessibility tree.
 *
 * It draws top to bottom in 600ms on the first load of a tab and is static
 * afterwards; `prefers-reduced-motion: reduce` renders it complete and static
 * immediately. Both gates live in CSS, so this ships no JavaScript.
 *
 * A scaled div rather than an SVG path: the shell's height is content-driven
 * and unknown at render, and scaleY on a filled bar draws identically to
 * stroke-dashoffset on a path without needing the path length up front.
 */
export function RouteLine({ line = "kerja" }: { line?: "kerja" | "pribadi" }) {
  const fill = line === "kerja" ? "bg-line-work" : "bg-line-life";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-[var(--rail-line)] w-[var(--route-w)] -translate-x-1/2"
    >
      <div className={`route-draw h-full w-full ${fill}`} />
    </div>
  );
}
