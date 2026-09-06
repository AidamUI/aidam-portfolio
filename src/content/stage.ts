import type { Stage } from "@/lib/stage";

/**
 * The small-caps line above each page's H1 — which stage of the ascent this
 * page is. Home carries none: it is the trailhead, met before the journey has
 * a name yet.
 */
export const STAGE_EYEBROW: Partial<Record<Stage, string>> = {
  work: "Stage two · Sembalun savanna",
  academic: "Stage three · pine switchbacks",
  projects: "Stage four · Pelawangan Sembalun",
  confidential: "Stage five · crater wall, in mist",
  open: "Stage six · crater wall, clear weather",
  docs: "Stage seven · Segara Anak lake camp",
  guestbook: "Stage eight · the summit at sunrise",
  notfound: "Off route · 404",
};
