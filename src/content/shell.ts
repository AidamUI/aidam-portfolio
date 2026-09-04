/**
 * M0 scaffolding copy only.
 *
 * These strings exist so the shell can be deployed and looked at before the
 * content layer lands. Every one of them is replaced by real content in
 * M1–M6; this file is deleted at M6. Nothing here should outlive the build.
 */

import { SITE } from "./site";

export const SHELL = {
  /** content.md §2, option A — the recommended hero line. */
  heroLine:
    "I'm Aidam. I study Information Systems at Universitas Indonesia, work on observability at IBM, and teach four CS courses.",
  /** content.md §2, sub-line. */
  subLine:
    "now serving: IBM AIOps & Observability, GEMASTIK XIX national round, third year at Fasilkom UI",
  buildNoticeTitle: "Shell only",
  buildNotice:
    "Tokens, type, signage, and the theme switch are in. Content, the case studies, the gallery and the guestbook land in the milestones after this one.",
  mapTitle: "The map",
  mapBlurb: `Two lines meet here. ${SITE.goesBy} is somewhere on both.`,
} as const;

/** Per-station placeholder, keyed by station code. Replaced milestone by milestone. */
export const STATION_PLACEHOLDER: Record<string, string> = {
  W1: "IBM, the four teaching roles, and the organisations — with every skill tied to the thing that proves it.",
  A1: "Universitas Indonesia: the degree, the full course record, the scholarships, and the exchange.",
  P1: "Everything shipped, newest first, each one honest about what was mine.",
  O1: "Photos and documentation, grouped into albums. Nothing here yet — the albums are built and waiting.",
  G1: "Leave an anonymous message. No name, no login, nothing tracked back to you.",
};
