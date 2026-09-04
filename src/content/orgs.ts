import type { Artifact, Role } from "./types";

/**
 * Organisational experience. Source: content.md §6.
 *
 * AIESEC's four roles and BEM's two render as one entry each with stages on
 * them, because a progression reads better than four near-identical rows and
 * is honest about it being one relationship over two years.
 *
 * The outreach figure is 100+ companies, per LinkedIn — the CV's "200+" is
 * wrong (context.md §10).
 */

export const ORG_ROLES: Role[] = [
  {
    org: "AIESEC in UI",
    title: "Stakeholder Manager",
    start: "2024-10",
    end: null,
    kind: "organisational",
    scale: "IDR 50M+ closed, 100+ companies approached",
    summary:
      "Four roles over two years, moving from running company outreach to owning how the organisation keeps its partners. Right now that means the stakeholder database and the partnership paperwork — LoAs, minutes, partner evaluations — across every department.",
    stages: [
      {
        title: "Stakeholder Manager",
        start: "2026-02",
        end: null,
        summary:
          "I own the stakeholder database and partnership documentation across departments: LoAs, minutes, partner evaluations.",
      },
      {
        title: "Strategic Business Growth, Business Development",
        start: "2025-02",
        end: "2026-01",
        summary:
          "Closed IDR 50M+ in cash and in-kind partnerships for LeadSeries 2025, from outreach to 100+ companies. Ran the pitches and the meetings.",
      },
      {
        title: "OC Partnership, Global Village Winter 2025",
        start: "2024-11",
        end: "2025-02",
        summary:
          "In-kind and media partners, and MC for the event in front of 100+ people.",
      },
      {
        title: "Business Development Intern",
        start: "2024-10",
        end: "2025-02",
        summary: "Co-organised an org-wide company visit with Blu by BCA.",
      },
    ],
  },
  {
    org: "BETIS Fasilkom UI",
    title: "Project Officer",
    start: "2025-12",
    end: "2026-07",
    kind: "organisational",
    scale: "130+ person committee, 130+ students",
    summary:
      "BETIS is Fasilkom's flagship social project: free, intensive university entrance exam prep for underprivileged high school and gap-year students. I led a 130+ person committee delivering it end to end — mentorship and academic support for 130+ students, execution, timelines, and the stakeholder work that keeps it free.",
  },
  {
    org: "BEM Fasilkom UI",
    title: "Deputy of Public Relations",
    start: "2024-09",
    end: null,
    kind: "organisational",
    scale: "8 PR programmes",
    summary:
      "Two spells with the student executive board, the first writing Django backends and the second running how the board talks to everyone outside it.",
    stages: [
      {
        title: "Deputy of Public Relations",
        start: "2026-04",
        end: null,
        summary:
          "Strategic comms for the student executive board: 8 PR programmes and the BEM Networking initiative for company visits and comparative studies with other universities.",
      },
      {
        title: "IT Development Intern",
        start: "2024-09",
        end: "2024-12",
        summary: "Backend web development with Django.",
      },
    ],
  },
  {
    org: "RISTEK Fasilkom UI",
    title: "Marketing and Communications",
    start: "2025-02",
    end: "2026-02",
    kind: "organisational",
    scale: "5,000–20,000 views per post",
    summary:
      "Social content in the 5,000–20,000 views range per post. I co-wrote TechTonic, a bi-weekly series on industry trends and the ethics people skip, published on RISTEK's Instagram. I also ran marketing for Datathon 2025, which brought in 700+ registrants.",
    stages: [
      {
        title: "Marketing and Communications",
        start: "2025-02",
        end: "2026-02",
        summary:
          "Social content in the 5,000–20,000 views range per post, and co-author of the TechTonic series.",
      },
      {
        title: "Marketing Manager, Datathon 2025",
        start: "2025-05",
        end: "2025-08",
        summary: "Strategy and execution. 700+ registrants.",
      },
    ],
  },
  {
    org: "Open House Fasilkom UI",
    title: "Digital Engagement and Collaboration",
    start: "2024-08",
    end: "2024-12",
    kind: "organisational",
    scale: "5,000+ views per post",
    summary:
      "Social strategy and content aimed at high school students choosing where to apply. 5,000+ views per post on Instagram and TikTok.",
  },
];

/**
 * The six published TechTonic posts. content.md §6 notes that Instagram blocks
 * scraping, so these stay as bare dated links until Aidam sends a one-line
 * topic for each — at which point `label` becomes the topic instead of the
 * post number.
 */
export const TECHTONIC: Artifact[] = [
  { label: "TechTonic 1", href: "https://instagram.com/p/DJGyLujPHBd" },
  { label: "TechTonic 2", href: "https://instagram.com/p/DKEvi8lPhn2" },
  { label: "TechTonic 3", href: "https://instagram.com/p/DLClsqPPw5P" },
  { label: "TechTonic 4", href: "https://instagram.com/p/DM2k0N5PUvf" },
  { label: "TechTonic 5", href: "https://instagram.com/p/DNh-97IPPLb" },
  { label: "TechTonic 6", href: "https://instagram.com/p/DO0xsbqj6xW" },
];
