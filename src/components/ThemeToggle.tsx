"use client";

import { THEME_COPY } from "@/content/site";
import { applyTheme, resolveTheme } from "@/lib/theme";

/**
 * Graphite is the site's default look, not a dark mode. This switches to the
 * day platform and back.
 *
 * The label is resolved in CSS (see `.when-graphite` / `.when-day` in
 * globals.css) rather than in React state, which means: correct on the server,
 * correct before hydration, correct with JavaScript disabled, and no flash of
 * the wrong label. The handler resolves the live theme at click time using the
 * same precedence the stylesheet uses.
 */
export function ThemeToggle() {
  function toggle() {
    applyTheme(resolveTheme() === "day" ? "graphite" : "day");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="gap-sm border-ink-2 px-md py-xs text-ink hover:border-line-work focus-visible:border-line-work flex shrink-0 items-center border-2 transition-colors"
    >
      <HalfDisc />
      <span className="code-type sr-only sm:not-sr-only">
        {/* Exactly one of these is displayed, and therefore exactly one is in
            the accessibility tree, so the button announces what it will do. */}
        <span className="when-graphite">{THEME_COPY.toDay}</span>
        <span className="when-day">{THEME_COPY.toGraphite}</span>
      </span>
    </button>
  );
}

function HalfDisc() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className="shrink-0"
    >
      <circle
        cx="8"
        cy="8"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M8 1.5 A6.5 6.5 0 0 1 8 14.5 Z" fill="currentColor" />
    </svg>
  );
}
