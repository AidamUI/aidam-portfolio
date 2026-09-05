/**
 * Single source of content types.
 *
 * Two rules from the PRD are enforced here by the compiler rather than by
 * convention, because a rule that only lives in a comment is a rule that gets
 * broken at 1am six months from now:
 *
 *   1. A confidential project CANNOT carry a stack, links, images, a build
 *      write-up or an outcome. Not "should not" — the type makes it a build
 *      error. See `Project`.
 *   2. A skill in the "worked with" tier CANNOT exist without a named artifact
 *      behind it. See `Skill`.
 *
 * `role` on a project and `alt` on an image are non-optional for the same
 * reason: state your contribution, describe your images.
 */

/* ── The route map ──────────────────────────────────────────────────────── */

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

/* ── Shared ─────────────────────────────────────────────────────────────── */

/** A link to something that proves a claim. */
export type Artifact = {
  label: string;
  href: string;
};

/** ISO `YYYY-MM`. `null` on an end date means the role is current. */
export type MonthStamp = string;

/* ── Roles ──────────────────────────────────────────────────────────────── */

export type RoleKind = "professional" | "teaching" | "organisational";

export type Role = {
  org: string;
  title: string;
  start: MonthStamp;
  end: MonthStamp | null;
  kind: RoleKind;
  /** Where the work happened, when that is worth stating. */
  place?: string;
  /** 2–3 sentences of prose in your own voice. Never CV bullets. */
  summary: string;
  /**
   * Cohort size, partnership value, committee headcount — the number that
   * makes the role concrete. Kept separate from the prose so it can be set
   * in mono without parsing it back out of a sentence.
   */
  scale?: string;
  artifacts?: Artifact[];
  /**
   * Roles that are stages of one progression (AIESEC's four, BEM's two) render
   * as a single entry with stops on it rather than as separate rows.
   */
  stages?: RoleStage[];
};

export type RoleStage = {
  title: string;
  start: MonthStamp;
  end: MonthStamp | null;
  summary: string;
};

/* ── Projects ───────────────────────────────────────────────────────────── */

export type ProjectStatus = "shipped" | "competing" | "coursework" | "archived";

export type ProjectImage = {
  src: string;
  /** Required, always. */
  alt: string;
  caption?: string;
  /**
   * Intrinsic size, so next/image reserves the box before the file arrives and
   * nothing shifts. Replacing a placeholder with a real image of the same
   * aspect ratio needs no change here; a different ratio does.
   */
  width: number;
  height: number;
};

type ProjectBase = {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  year: number;
  /** Station code, e.g. P1.1. */
  code: string;
  /** Your specific contribution, in one unambiguous sentence. Required. */
  role: string;
  problem: string;
  what: string;
  featured?: boolean;
};

/**
 * A project under an open competition. The `never` fields are the enforcement:
 * adding `stack` or `links` to one of these is a type error, so the case-study
 * template's branch and the data can never drift apart.
 *
 * Flip `confidential` to false and the other half of the union unlocks the
 * full template — but only once the competition has actually concluded and
 * Aidam has said so explicitly.
 */
export type ConfidentialProject = ProjectBase & {
  confidential: true;
  /** Rendered in place of the withheld sections, so the gap is explained. */
  withheldNote: string;
  build?: never;
  outcome?: never;
  stack?: never;
  links?: never;
  images?: never;
};

export type OpenProject = ProjectBase & {
  confidential?: false;
  build?: string;
  outcome?: string;
  stack?: string[];
  links?: Artifact[];
  images?: ProjectImage[];
};

export type Project = ConfidentialProject | OpenProject;

/** Narrowing helper, so templates branch on the field rather than on a guess. */
export function isConfidential(
  project: Project,
): project is ConfidentialProject {
  return project.confidential === true;
}

/** The compressed "early work, 2023–24" row. Not full case studies. */
export type LegacyProject = {
  name: string;
  href: string;
};

/* ── Skills ─────────────────────────────────────────────────────────────── */

/**
 * Tiered strictly by evidence.
 *
 * `used` requires an artifact — that is the whole point of the tier, and the
 * type refuses to let one exist without proof. `core` is a statement about
 * what you reach for daily and needs no artifact; `learning` is everything
 * with no named project or role behind it, certificate or not.
 */
export type Skill =
  | { name: string; tier: "core" }
  | { name: string; tier: "used"; evidence: Artifact[] }
  | { name: string; tier: "learning" };

export type SkillTier = Skill["tier"];

/* ── Academic ───────────────────────────────────────────────────────────── */

/**
 * Name and credits. There is deliberately no grade field anywhere in this
 * type: no grades are published on the site, so the shape makes it impossible
 * rather than merely discouraged.
 */
export type Course = {
  name: string;
  credits: number;
};

export type Term = {
  /** e.g. "2024/2025, Term 1". */
  label: string;
  /** Short-semester and in-progress terms are called out on the sign. */
  note?: string;
  inProgress?: boolean;
  courses: Course[];
};

export type Honour = {
  name: string;
  /** Human-readable period, e.g. "Feb – Jun 2026". */
  period: string;
  note?: string;
};

/* ── Gallery ────────────────────────────────────────────────────────────── */

export type AlbumSlug =
  "jalan-jalan" | "kerja" | "ngajar" | "lomba" | "organisasi" | "random";

export type GalleryItem = {
  src: string;
  /** Required, always. */
  alt: string;
  /** One line, in your voice. An uncaptioned gallery is a screensaver. */
  caption?: string;
  kind: "photo" | "screenshot" | "document";
  album: AlbumSlug;
  date?: string;
  place?: string;
  /** For certificates, posters and linked work. */
  href?: string;
  /* The three below are filled by the ingest script, never by hand. */
  width: number;
  height: number;
  blurDataURL: string;
};

export type Album = {
  slug: AlbumSlug;
  /** Station sub-code, e.g. O1.1 — same pattern as the projects' P1.1. */
  code: string;
  name: string;
  blurb: string;
  /** Empty until the first photo lands; the album still renders. */
  cover?: string;
};
