import { projectBySlug } from "@/content/projects";
import { isConfidential } from "@/content/types";

/**
 * The nine scenes of one Gunung Rinjani ascent, one per route. `confidential`
 * and `open` are both the crater-wall descent (see Scene.tsx); only the mist
 * differs, because that is the one page whose content itself is partly
 * withheld.
 */
export type Stage =
  | "home"
  | "work"
  | "academic"
  | "projects"
  | "confidential"
  | "open"
  | "docs"
  | "guestbook"
  | "notfound";

export const STAGE_ORDER: Stage[] = [
  "home",
  "work",
  "academic",
  "projects",
  "confidential",
  "open",
  "docs",
  "guestbook",
  "notfound",
];

/** Position on the trail-marker mini-map (a 148×34 viewBox) and its caption. */
export const STAGE_STOPS: Record<Stage, readonly [number, number, string]> = {
  home: [8, 26, "trailhead"],
  work: [25, 24, "savanna"],
  academic: [43, 19, "pine switchbacks"],
  projects: [61, 11, "rim viewpoint"],
  confidential: [79, 16, "crater descent"],
  open: [97, 16, "crater descent"],
  docs: [114, 19, "lake camp"],
  guestbook: [132, 6, "summit"],
  notfound: [140, 30, "off route"],
};

/**
 * Resolves the pathname to a stage, including a project case study's
 * confidential/open split — the one place a route alone is not enough.
 */
export function stageFromPathname(pathname: string): Stage {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/academic")) return "academic";
  if (pathname.startsWith("/projects/")) {
    const slug = pathname.split("/")[2];
    const project = slug ? projectBySlug(slug) : undefined;
    return project && isConfidential(project) ? "confidential" : "open";
  }
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/documentation")) return "docs";
  if (pathname.startsWith("/guestbook")) return "guestbook";
  return "notfound";
}
