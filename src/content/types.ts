/**
 * Single source of content types.
 *
 * M0 defines only what the shell needs (site chrome + the station/route map).
 * M1 extends this file with Role, Project, Skill, GalleryItem and Album per
 * tech-plan.md §3. Nothing here is `any`, and every field a rule depends on
 * — a project's `role`, an image's `alt` — is non-optional on purpose.
 */

/** The two colour-coded lines. They meet at the home page, the interchange. */
export type LineId = "kerja" | "pribadi";

export type Line = {
  id: LineId;
  /** Indonesian, as decided: Jalur Kerja / Jalur Pribadi. */
  name: string;
  /** CSS custom property holding this line's fill. */
  colorVar: "--line-work" | "--line-life";
  /** Utility class for the same fill, for Tailwind-side usage. */
  colorClass: string;
};

export type Station = {
  /** Signage code: W1, A1, P1, O1, G1. */
  code: string;
  /** Section name as it reads on the sign. */
  name: string;
  href: string;
  line: LineId;
  /** One line for the sign subtitle and for nav accessible names. */
  blurb: string;
};

export type SocialLink = {
  label: string;
  href: string;
  /** Shown next to the label where the link needs qualifying, e.g. legacy GitHub. */
  note?: string;
};

export type ThemeName = "graphite" | "day";
