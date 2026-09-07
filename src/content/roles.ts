import type { Role } from "./types";

/**
 * Professional and teaching roles, reverse-chronological. Source: content.md §5.
 *
 * Three corrections from prd.md §10 are baked in here and must not drift
 * back toward the CV or LinkedIn, both of which are wrong on these:
 *   - the IBM title is "Brand Technical Sales Specialist Intern", which matches
 *     neither document;
 *   - Operating Systems is 40 students, not the 200 on the CV;
 *   - Programming Foundations is two sequential courses, not one role.
 *
 * Do NOT sum the teaching cohorts. PF1 and PF2 run back to back and are almost
 * certainly the same students, so "1,000+ taught" double-counts them. The
 * honest phrasing lives in TEACHING_LOAD below.
 */

export const PROFESSIONAL_ROLES: Role[] = [
  {
    org: "IBM",
    title: "Brand Technical Sales Specialist Intern, AIOps & Observability",
    start: "2026-06",
    end: null,
    kind: "professional",
    place: "Jakarta",
    summary:
      "I deliver technical demonstrations and pitches of IBM Instana to prospective enterprise clients, translating observability capabilities across Kubernetes, virtual machines, and hybrid infrastructure into business value. I support technical scoping and advisory for enterprise proofs of concept, defining target architecture and validating what the client actually has to provision. I also worked with implementation partners on an Instana deployment for a regional government client, which gave me exposure to real-time application performance monitoring in production.",
    artifacts: [
      {
        label: "terraform-instana",
        href: "https://github.com/AidamUI/terraform-instana",
      },
      {
        label: "instana-learning-ibm",
        href: "https://github.com/AidamUI/instana-learning-ibm",
      },
      {
        label: "lippo-instana-soap",
        href: "https://github.com/AidamUI/lippo-instana-soap",
      },
    ],
  },
];

export const TEACHING_ROLES: Role[] = [
  {
    org: "Faculty of Computer Science, Universitas Indonesia",
    title:
      "Teaching Assistant of Platform-Based Programming (International Class)",
    start: "2026-07",
    end: null,
    kind: "teaching",
    scale: "400 students batch-wide",
    summary:
      "I TA the international class section of a two-track, 400-student course covering web development with JavaScript and Django, and mobile development with Flutter. I design and grade labs and projects, evaluating students' REST API-driven web applications and the Flutter clients that consume them.",
  },
  {
    org: "Faculty of Computer Science, Universitas Indonesia",
    title: "Teaching Assistant of Operating Systems",
    start: "2026-06",
    end: null,
    kind: "teaching",
    scale: "40 students",
    summary:
      "I support an intensive short-semester course for 40 students, providing academic mentorship and running pre-exam review sessions to reinforce core computing concepts. I deliver live coding demonstrations and grade C programming assignments covering virtualisation, concurrency, and persistence.",
  },
  {
    org: "Faculty of Computer Science, Universitas Indonesia",
    title:
      "Teaching Assistant of Programming Foundations 2, Java & OOP (International Class)",
    start: "2026-01",
    end: "2026-06",
    kind: "teaching",
    scale: "400+ students, 40+ in the international cohort",
    summary:
      "I manage lab instruction and academic evaluation for 400+ students, and mentor the 40+ student international cohort in object-oriented programming principles, class architecture, and practical software implementation in Java.",
  },
  {
    org: "Faculty of Computer Science, Universitas Indonesia",
    title:
      "Teaching Assistant of Programming Foundations 1, Python & Computational Thinking",
    start: "2025-07",
    end: "2026-01",
    kind: "teaching",
    scale: "400+ students",
    summary:
      "I co-created and graded programming lab assignments for 400+ students, and ran assistance sessions providing academic support.",
  },
];

/**
 * The one sentence that states the teaching load without double-counting.
 * content.md §5 is explicit about this; use this string rather than deriving a
 * total from the roles above.
 */
export const TEACHING_LOAD =
  "400+ students across two semesters of foundations, 400 in the current Platform-Based Programming course, and 40 in Operating Systems.";

export const ALL_ROLES: Role[] = [...PROFESSIONAL_ROLES, ...TEACHING_ROLES];
