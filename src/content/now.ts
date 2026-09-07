import { PROFILE } from "./profile";

/**
 * The "currently" block on the home page. Source: content.md §3.
 *
 * This is the block that keeps the site feeling alive, so it carries its own
 * date rather than the build date — a rebuild for an unrelated reason must not
 * make stale news look fresh. Update `updated` whenever you edit `items`.
 *
 * The course list is the official one from the transcript. Earlier drafts
 * guessed at "Embedded Systems" and "Computer Graphics"; neither is on the
 * record this term.
 */
export const NOW = {
  updated: "2026-09-04",
  heading: "Currently",
  items: [
    "Technical intern, AIOps & Observability at IBM. Instana demos and PoC scoping for enterprise clients.",
    "GEMASTIK XIX national round: TERRA (software development) and Mantau (ICT business development).",
    "Fall semester at UI: IS Analysis and Design, Enterprise Application Programming, Computer Vision, Data Communication Networks, Knowledge Graph, CS Special Topics. 20 credits total.",
    "TA for Platform-Based Programming and Operating Systems.",
  ],
} as const;

/** Used by the hero's route diagram: career stops with real dates. */
export const CAREER_STOPS = [
  { label: "Fasilkom UI", detail: "Information Systems", year: "2024" },
  { label: "Programming Foundations", detail: "first TA post", year: "2025" },
  { label: "Platform Dev + OS", detail: "teaching, two courses", year: "2026" },
  { label: "IBM", detail: "AIOps & Observability", year: "2026" },
] as const;

export const SHARE = {
  description: PROFILE.shortBio,
} as const;
