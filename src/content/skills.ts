import type { Skill } from "./types";

/**
 * Skills, tiered strictly by evidence. Source: content.md §9.
 *
 * The rule, in Aidam's words: a skill only earns "worked with" if a named
 * project or a role explicitly backs it. Everything else — certificate or no
 * certificate — goes in Learning.
 *
 * The `Skill` type enforces this: the "used" tier requires an `evidence`
 * array, so a skill cannot claim project backing without the link that
 * proves it. `core` needs no artifact; `learning` has none.
 *
 * ── Why some entries carry no evidence ────────────────────────────────────
 * A few skills here can only be evidenced by work that is under an open
 * competition and therefore undetailed on the site. Those sit in `core` where
 * Aidam genuinely builds with them daily, and in `learning` where the backing
 * cannot currently be cited at all. Revisit this tiering once judging
 * concludes and that work can be described.
 *
 * Which skills map to which withheld project is deliberately not recorded
 * here: this repository is public, and that mapping is implementation detail.
 */

export const SKILLS: Skill[] = [
  /* ── Build with regularly ─────────────────────────────────────────────── */
  { name: "Python", tier: "core" },
  { name: "Java", tier: "core" },
  { name: "JavaScript / TypeScript", tier: "core" },
  { name: "Dart", tier: "core" },
  { name: "Django", tier: "core" },
  { name: "FastAPI", tier: "core" },
  { name: "React", tier: "core" },
  { name: "React Native / Expo", tier: "core" },
  { name: "Flutter", tier: "core" },
  { name: "PostgreSQL", tier: "core" },
  { name: "SQL", tier: "core" },

  /* ── Worked with on real projects — every one carries its proof ────────── */
  {
    name: "Terraform",
    tier: "used",
    evidence: [
      {
        label: "terraform-instana",
        href: "https://github.com/AidamUI/terraform-instana",
      },
      { label: "IBM, AIOps & Observability", href: "/work" },
    ],
  },
  {
    name: "Kubernetes",
    tier: "used",
    evidence: [{ label: "IBM, AIOps & Observability", href: "/work" }],
  },
  {
    name: "Spring Boot",
    tier: "used",
    evidence: [{ label: "APAP practicum", href: "/projects/praktikum-apap" }],
  },
  {
    name: "Tableau",
    tier: "used",
    evidence: [{ label: "SkillPath", href: "/projects/skillpath" }],
  },

  /* ── Learning — no named project or role behind these yet ──────────────── */
  { name: "Docker", tier: "learning" },
  { name: "Node.js", tier: "learning" },
  { name: "PyTorch", tier: "learning" },
  { name: "Power BI", tier: "learning" },
  { name: "AWS", tier: "learning" },
  { name: "Threat & Vulnerability Management", tier: "learning" },
];

export const SKILL_TIERS = [
  {
    tier: "core" as const,
    heading: "Build with regularly",
  },
  {
    tier: "used" as const,
    heading: "Worked with on real projects",
  },
  {
    tier: "learning" as const,
    heading: "Learning",
  },
];

/** Not technologies, so they are listed rather than tiered. */
export const PRACTICE = [
  "Technical demos and pre-sales",
  "Partnership negotiation",
  "Public speaking and MC work",
  "Project management",
  "Teaching",
];

export const LANGUAGES = [
  { name: "English", level: "Native / bilingual" },
  { name: "Indonesian", level: "Native / bilingual" },
  { name: "Arabic", level: "Elementary" },
];

/** The merged list of 8 — the CV and LinkedIn overlap on one. */
export const CERTIFICATIONS = [
  "IBM Instana Intermediate",
  "IBM Terraform Foundations",
  "IBM Concert Foundations",
  "Compfest Data Science Academy",
  "Compfest UI/UX Foundations",
  "100 Days of Code: Python Pro Bootcamp (Udemy)",
  "Full-Stack Web Development Bootcamp (Udemy)",
  "Docker and Kubernetes: The Complete Course (Udemy)",
];

export function skillsInTier(tier: Skill["tier"]): Skill[] {
  return SKILLS.filter((skill) => skill.tier === tier);
}
