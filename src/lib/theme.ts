import type { ThemeName } from "@/content/types";

export const THEME_STORAGE_KEY = "aidam:theme";
export const ROUTE_DRAWN_KEY = "aidam:route-drawn";

export const THEMES: readonly ThemeName[] = ["graphite", "day"] as const;

/** The two grounds, for the browser-chrome colour. Mirrors --platform. */
export const THEME_CHROME: Record<ThemeName, string> = {
  graphite: "#1E2733",
  day: "#EDF0F3",
};

export function isThemeName(value: unknown): value is ThemeName {
  return value === "graphite" || value === "day";
}

/**
 * Paints the browser chrome (Android Chrome's address bar, iOS Safari's status
 * bar) to match the resolved theme.
 *
 * A media-scoped <meta name="theme-color"> cannot do this job: the browser
 * chooses between those purely on the OS preference and never sees data-theme,
 * so a reader who picks the day platform on a dark OS gets a graphite bar over
 * a light page for the rest of the session. So the tag ships with the graphite
 * default and gets rewritten whenever the theme resolves to something else.
 */
export function paintChrome(theme: ThemeName): void {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_CHROME[theme]);
}

/**
 * Runs before first paint, inline in <head>. Three jobs, all of which have to
 * happen before the browser paints:
 *
 * 1. Applies a stored theme choice, so the day platform never flashes graphite
 *    on load. No stored choice means no attribute, which leaves the stylesheet
 *    on graphite — the site's default look for everyone, not a dark mode.
 * 2. Repaints the browser chrome to match. The theme-color meta is emitted
 *    ahead of this script in <head>, so it is already queryable here.
 * 3. Marks the route-line animation as seen for this tab, so the spine draws
 *    once per session rather than on every navigation. Doing it here rather
 *    than in React keeps it out of the hydration path: the server renders one
 *    markup and the attribute decides whether the CSS animation applies.
 *
 * Wrapped in try/catch because storage throws outright in some privacy modes.
 */
export const BOOT_SCRIPT = `(function(){try{
var d=document.documentElement;
var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
if(t==="graphite"||t==="day"){
d.setAttribute("data-theme",t);
var m=document.querySelector('meta[name="theme-color"]');
if(m){m.setAttribute("content",t==="day"?${JSON.stringify(THEME_CHROME.day)}:${JSON.stringify(THEME_CHROME.graphite)});}
}
if(sessionStorage.getItem(${JSON.stringify(ROUTE_DRAWN_KEY)})){d.setAttribute("data-route-drawn","");}
else{sessionStorage.setItem(${JSON.stringify(ROUTE_DRAWN_KEY)},"1");}
}catch(e){}})();`;

/**
 * The theme in effect right now, resolved exactly as the stylesheet resolves
 * it: an explicit choice, or graphite. The OS preference deliberately does not
 * enter into it — see the note at the top of globals.css. Keeping this in step
 * with the CSS is what stops the first click on the switch being a no-op.
 *
 * Client-side only: call it from an event handler, never during render.
 */
export function resolveTheme(): ThemeName {
  const attr = document.documentElement.getAttribute("data-theme");
  return isThemeName(attr) ? attr : "graphite";
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
