import type { Artifact, Role } from "./types";

/**
 * Organisational experience. Source: content.md §6.
 *
 * AIESEC's four roles and BEM's two render as one entry each with stages on
 * them: each is one relationship over two years, not four separate ones.
 *
 * The outreach figure is 100+ companies, per LinkedIn — the CV's "200+" is
 * wrong (prd.md §10).
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
      "Four roles at AIESEC in UI since 2024: Business Development Intern, OC Partnership for Global Village Winter 2025, Strategic Business Growth in Business Development, and now Stakeholder Manager.",
    stages: [
      {
        title: "Stakeholder Manager",
        start: "2026-02",
        end: null,
        summary:
          "I manage the stakeholder database and partnership documentation across organisational departments. I ensure compliance with partnership governance including LoAs, MoMs, and partner evaluations.",
      },
      {
        title: "Strategic Business Growth, Business Development",
        start: "2025-02",
        end: "2026-01",
        summary:
          "I secured in-kind and financial partnerships for LeadSeries 2025 worth over IDR 50M. I reached out to over 100 companies, offering partnerships with AIESEC in UI.",
      },
      {
        title: "OC Partnership, Global Village Winter 2025",
        start: "2024-11",
        end: "2025-02",
        summary:
          "I secured partnerships with in-kind and media partners for Global Village Winter 2025. I served as Master of Ceremony for Global Village Winter 2025, engaging with 100+ participants.",
      },
      {
        title: "Business Development Intern",
        start: "2024-10",
        end: "2025-02",
        summary:
          "I co-organised an organisation-wide company visit with Blu by BCA.",
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
      "BETIS is Fasilkom's flagship social project, providing free, intensive college-entrance-exam preparation for underprivileged high school and gap-year students. I lead a 130+ member committee delivering the programme end to end: mentorship and academic support for 130+ students, execution, timelines, and the stakeholder coordination that keeps it fully free.",
  },
  {
    org: "BEM Fasilkom UI",
    title: "Deputy of Public Relations",
    start: "2024-09",
    end: null,
    kind: "organisational",
    scale: "8 PR programmes",
    summary:
      "Two roles with BEM Fasilkom UI: IT Development Intern, and now Deputy of Public Relations.",
    stages: [
      {
        title: "Deputy of Public Relations",
        start: "2026-04",
        end: null,
        summary:
          "I direct strategic communications for the student executive board, overseeing 8 core PR programmes and leading the BEM Networking initiative for company visits and external university comparative studies.",
      },
      {
        title: "IT Development Intern",
        start: "2024-09",
        end: "2024-12",
        summary:
          "I gained hands-on experience in back-end web development with Django.",
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
      "I produce social media content achieving 5,000 to 20,000 views per post, and co-author TechTonic, a bi-weekly tech article series covering industry trends and ethical dilemmas in technology, published on RISTEK's Instagram. I also developed and executed the marketing strategy for Datathon 2025, resulting in 700+ registrants.",
    stages: [
      {
        title: "Marketing and Communications",
        start: "2025-02",
        end: "2026-02",
        summary:
          "Social content getting 5,000 to 20,000 views per post, and co-author of the TechTonic series.",
      },
      {
        title: "Marketing Manager, Datathon 2025",
        start: "2025-05",
        end: "2025-08",
        summary:
          "Developed and executed the marketing strategy for Datathon 2025, resulting in 700+ registrants.",
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
      "I developed and executed social media marketing strategies targeted towards high school students. I collaborated in teams to create engaging content for the promotion of Open House Fasilkom UI. I helped boost visibility, achieving 5,000+ views per post on Instagram and TikTok.",
  },
];

/**
 * The six published TechTonic posts, in content.md §6's listing order.
 *
 * The numbering is positional — it reflects where each post sits in that list,
 * not a publication sequence, because no document states one. An earlier draft
 * sorted them by Instagram shortcode on the assumption that the codes are
 * chronological; that invented an ordering the source does not support, so the
 * doc's order stands.
 *
 * content.md §6 notes Instagram blocks scraping, so these stay as bare links
 * until Aidam sends a one-line topic per post — at which point `label` becomes
 * the topic ("TechTonic on inflation and AI hiring") and the numbering goes.
 */
export const TECHTONIC: Artifact[] = [
  { label: "TechTonic #1", href: "https://instagram.com/p/DO0xsbqj6xW" },
  { label: "TechTonic #2", href: "https://instagram.com/p/DNh-97IPPLb" },
  { label: "TechTonic #3", href: "https://instagram.com/p/DM2k0N5PUvf" },
  { label: "TechTonic #4", href: "https://instagram.com/p/DLClsqPPw5P" },
  { label: "TechTonic #5", href: "https://instagram.com/p/DJGyLujPHBd" },
  { label: "TechTonic #6", href: "https://instagram.com/p/DKEvi8lPhn2" },
];

export const TECHTONIC_COPY = {
  heading: "TechTonic series",
  blurb:
    "A bi-weekly tech article series on industry trends and ethical dilemmas in technology, co-authored for RISTEK Fasilkom UI's Instagram. 5,000 to 20,000 views per post.",
} as const;
