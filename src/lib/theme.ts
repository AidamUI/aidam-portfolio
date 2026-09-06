import type { ThemeName } from "@/content/types";

export const THEME_STORAGE_KEY = "aidam:theme";

export const THEMES: readonly ThemeName[] = ["light", "dark"] as const;

/** The two grounds, for the browser-chrome colour. Mirrors --ground. */
export const THEME_CHROME: Record<ThemeName, string> = {
  light: "#EFEAE1",
  dark: "#0B141B",
};

export function isThemeName(value: unknown): value is ThemeName {
  return value === "light" || value === "dark";
}

/**
 * Paints the browser chrome (Android Chrome's address bar, iOS Safari's status
 * bar) to match the resolved theme.
 *
 * A media-scoped <meta name="theme-color"> cannot do this job: the browser
 * chooses between those purely on the OS preference and never sees data-theme,
 * so a reader who picks dark on a light OS gets the wrong bar colour for the
 * rest of the session. So the tag ships with the light default and gets
 * rewritten whenever the theme resolves to something else.
 */
export function paintChrome(theme: ThemeName): void {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_CHROME[theme]);
}

/**
 * Runs before first paint, inline in <head>. Two jobs, both of which have to
 * happen before the browser paints:
 *
 * 1. Applies a stored theme choice, so dark mode never flashes light on load.
 *    No stored choice means no attribute, which leaves the stylesheet on
 *    light — the site's default look for everyone, not an OS-driven toggle.
 * 2. Repaints the browser chrome to match. The theme-color meta is emitted
 *    ahead of this script in <head>, so it is already queryable here.
 *
 * Wrapped in try/catch because storage throws outright in some privacy modes.
 */
export const BOOT_SCRIPT = `(function(){try{
var d=document.documentElement;
var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
if(t==="light"||t==="dark"){
d.setAttribute("data-theme",t);
var m=document.querySelector('meta[name="theme-color"]');
if(m){m.setAttribute("content",t==="dark"?${JSON.stringify(THEME_CHROME.dark)}:${JSON.stringify(THEME_CHROME.light)});}
}
}catch(e){}})();`;

/**
 * The theme in effect right now, resolved exactly as the stylesheet resolves
 * it: an explicit choice, or light. The OS preference deliberately does not
 * enter into it — see the note at the top of globals.css. Keeping this in step
 * with the CSS is what stops the first click on the switch being a no-op.
 *
 * Client-side only: call it from an event handler, never during render.
 */
export function resolveTheme(): ThemeName {
  const attr = document.documentElement.getAttribute("data-theme");
  return isThemeName(attr) ? attr : "light";
}

export function applyTheme(theme: ThemeName): void {
  document.documentElement.setAttribute("data-theme", theme);
  paintChrome(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode, blocked cookies). The switch still
    // works for this page view; it just will not be remembered.
  }
}
