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
      "I deliver technical demonstrations and pitches of IBM Instana to prospective enterprise clients, translating observability capabilities across Kubernetes, virtual machines, and hybrid infrastructure into business value. I support technical scoping and advisory for enterprise Proof of Concepts (PoCs), defining target architectural topologies spanning containerized and VM-based workloads, and validating client technical resource requirements. I shadow implementation partners during IBM Instana deployment for a regional government client, gaining exposure to real-time application performance monitoring in production environments.",
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
      "I design and grade labs and projects for a two-track, 400-student course covering web development (JavaScript, Django) and mobile development (Flutter). I evaluate students' implementation of REST API-driven web applications and their corresponding Flutter-based mobile clients, mirroring real-world full-stack development workflows.",
  },
  {
    org: "Faculty of Computer Science, Universitas Indonesia",
    title: "Teaching Assistant of Operating Systems",
    start: "2026-06",
    end: null,
    kind: "teaching",
    scale: "40 students",
    summary:
      "I support an intensive short-semester course for a class of 40 students, providing dedicated academic mentorship and conducting pre-exam review sessions to reinforce high-level computing concepts. I deliver live coding demonstrations and grade C programming assignments, evaluating students' practical implementation of core course materials including virtualization, concurrency, and persistence.",
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
      "I facilitated first-year foundational programming courses, managing lab instruction and academic evaluation for over 400 students, including a specialized cohort of 40+ international students. I mentored the international cohort in object-oriented programming (OOP) principles, class architecture, and practical software implementation utilizing Java.",
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
      "I co-created and graded programming lab assignments for 400+ students. I conducted programming assistance sessions and provided academic support to students.",
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
