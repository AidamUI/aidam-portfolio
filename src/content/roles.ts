import type { Role } from "./types";

/**
 * Professional and teaching roles, reverse-chronological. Source: content.md §5.
 *
 * Three corrections from context.md §10 are baked in here and must not drift
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
      "I demo IBM Instana to prospective enterprise clients and translate what it does — tracing across Kubernetes, VMs, and hybrid infrastructure — into terms a buyer's finance team will accept. I help scope proofs of concept: target architecture, which workloads get instrumented, what the client actually has to provision. I worked with implementation partners on an Instana deployment for a regional government client, which is where I learned how much of observability is politics about who owns which alert.",
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
      "Teaching Assistant — Platform-Based Programming (International Class)",
    start: "2026-07",
    end: null,
    kind: "teaching",
    scale: "400 students batch-wide",
    summary:
      "I TA the international class section, but the whole batch — 400 students — takes the same course across sections: web with JavaScript and Django, mobile with Flutter. I design and grade the labs and the final projects, evaluating a REST-backed web app and the Flutter client that consumes it.",
  },
  {
    org: "Faculty of Computer Science, Universitas Indonesia",
    title: "Teaching Assistant — Operating Systems",
    start: "2026-06",
    end: null,
    kind: "teaching",
    scale: "40 students",
    summary:
      "An intensive short-semester course for 40 students. Live coding demos, C assignment grading, pre-exam review sessions on virtualisation, concurrency, and persistence.",
  },
  {
    org: "Faculty of Computer Science, Universitas Indonesia",
    title:
      "Teaching Assistant — Programming Foundations 2, Java & OOP (International Class)",
    start: "2026-01",
    end: "2026-06",
    kind: "teaching",
    scale: "400+ students, 40+ in the international cohort",
    summary:
      "Lab instruction and grading for 400+ students, mentoring the 40+ student international cohort through OOP, class architecture, and getting Java to compile.",
  },
  {
    org: "Faculty of Computer Science, Universitas Indonesia",
    title:
      "Teaching Assistant — Programming Foundations 1, Python & Computational Thinking",
    start: "2025-07",
    end: "2026-01",
    kind: "teaching",
    scale: "400+ students",
    summary:
      "Co-created and graded lab assignments for 400+ students, ran assistance sessions.",
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
