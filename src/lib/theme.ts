import type { ThemeName } from "@/content/types";

export const THEME_STORAGE_KEY = "aidam:theme";
export const ROUTE_DRAWN_KEY = "aidam:route-drawn";

export const THEMES: readonly ThemeName[] = ["graphite", "day"] as const;

export function isThemeName(value: unknown): value is ThemeName {
  return value === "graphite" || value === "day";
}

/**
 * Runs before first paint, inline in <head>. Does two jobs, both of which have
 * to happen before the browser paints anything:
 *
 * 1. Applies a stored theme choice, so the day platform never flashes graphite
 *    (or the reverse) on load. No stored choice means no attribute, which lets
 *    the stylesheet fall through to the OS preference — graphite by default,
 *    day when the OS asks for light.
 * 2. Marks the route-line animation as already seen for this tab, so the spine
 *    draws once per session rather than on every navigation. Doing it here
 *    rather than in React keeps it out of the hydration path entirely: the
 *    server renders one markup, and the attribute decides whether the CSS
 *    animation applies.
 *
 * Wrapped in try/catch because storage throws outright in some privacy modes.
 */
export const BOOT_SCRIPT = `(function(){try{
var d=document.documentElement;
var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
if(t==="graphite"||t==="day"){d.setAttribute("data-theme",t);}
if(sessionStorage.getItem(${JSON.stringify(ROUTE_DRAWN_KEY)})){d.setAttribute("data-route-drawn","");}
else{sessionStorage.setItem(${JSON.stringify(ROUTE_DRAWN_KEY)},"1");}
}catch(e){}})();`;

/**
 * The theme in effect right now, resolved the same way the stylesheet resolves
 * it: an explicit choice wins, otherwise the OS preference decides. Client-side
 * only — call it from an event handler, never during render.
 */
export function resolveTheme(): ThemeName {
  const attr = document.documentElement.getAttribute("data-theme");
  if (isThemeName(attr)) return attr;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "day"
    : "graphite";
}

export function applyTheme(theme: ThemeName): void {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode, blocked cookies). The switch still
    // works for this page view; it just will not be remembered.
  }
}
