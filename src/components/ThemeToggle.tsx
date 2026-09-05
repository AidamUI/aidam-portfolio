"use client";

import { THEME_COPY } from "@/content/site";
import { applyTheme, resolveTheme } from "@/lib/theme";

/**
 * Light is the site's default, not an OS-driven toggle. This switches to dark
 * and back.
 *
 * The label is resolved in CSS (`.when-light` / `.when-dark` in globals.css)
 * rather than in React state: correct on the server, correct before
 * hydration, no flash of the wrong label. The handler resolves the live theme
 * at click time using the same precedence the stylesheet uses, so the first
 * click can never be a no-op.
 *
 * With JavaScript off the button cannot do anything, so a <noscript> rule in
 * the layout removes it entirely rather than leaving a focusable control that
 * announces an action it will never perform.
 */
export function ThemeToggle() {
  function toggle() {
    applyTheme(resolveTheme() === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      data-theme-toggle
      onClick={toggle}
      className="text-text hover:bg-bg-subtle inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
    >
      <SunIcon className="when-light" />
      <MoonIcon className="when-dark" />
      <span className="sr-only">
        {/* Exactly one of these is displayed, and therefore exactly one is in
            the accessibility tree, so the button announces what it will do. */}
        <span className="when-light">{THEME_COPY.toDark}</span>
        <span className="when-dark">{THEME_COPY.toLight}</span>
      </span>
    </button>
  );
}

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
      />
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
      />
    </svg>
  );
}
