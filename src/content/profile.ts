/**
 * Identity and the long-form copy. Source: content.md §1, §2 and §4.
 *
 * Deliberately absent, and to stay absent: date of birth, phone number,
 * student ID, academic advisor. See prd.md §6 (Privacy) and context.md §1,
 * defect 3 — the old site published a date of birth.
 */

export const PROFILE = {
  name: "Muhammad Kaila Aidam Riyan",
  goesBy: "Aidam",
  location: "Jakarta, Indonesia",

  /**
   * content.md §2, option A — the recommended hero line. Plain and specific.
   * "Four CS courses" is the count of TA appointments held, not four at once:
   * PF1 and PF2 ran back to back. /academic states the load properly.
   */
  hero: "I'm Aidam. Information Systems student at Universitas Indonesia with a focus on bridging the gap between technology and business.",

  /** Runs under the hero. LinkedIn headline, expanded from its acronym. */
  heroSub:
    "Brand Technical Sales Specialist Intern at IBM · Teaching Assistant at Universitas Indonesia.",

  /**
   * content.md §4 — the CV-style version, first person. The more personal
   * draft about doubting the field was rejected; don't reintroduce that register.
   */
  about: [
    "From a young age, I've had a special love for technology. I loved spending hours tinkering with phones and computers, and my first exposure to development was making a game using Scratch back in 6th grade. From there, I've continuously learned and acquired skills related to software development, data science, and IT consulting, building personal projects mainly with Python and JavaScript.",
    "I love getting out of my comfort zone and pushing beyond my limits. I consider myself highly adaptable to various situations, which has aided me in my journey thus far: an internship at IBM, four teaching assistant roles at once, and a national-round GEMASTIK team.",
    "The plan is software engineering, then solutions architecture, then a master's abroad. I'm ambitious and optimistic about it, and committed to doing whatever it takes to get there.",
  ],

  /**
   * The home page's "at a glance" panel. Every line is a claim with a page
   * behind it — prd.md's rule is that nothing goes on the site that cannot be
   * expanded on for five minutes, so each one links to where it is backed up.
   * No invented metrics, no "years of experience" ticker.
   */
  glance: [
    {
      figure: "IBM",
      label: "Brand Technical Sales Specialist Intern, AIOps & Observability",
      href: "/work",
    },
    {
      figure: "4",
      label: "teaching assistant appointments across three CS courses",
      href: "/academic",
    },
    {
      figure: "3.87",
      label: "CGPA at Universitas Indonesia, 84 credits done",
      href: "/academic",
    },
    {
      figure: "2",
      label: "GEMASTIK XIX entries in the national round",
      href: "/projects",
    },
  ],

  /** Share cards and meta descriptions. content.md §4. */
  shortBio:
    "Information Systems student at Universitas Indonesia. Technical intern on AIOps and observability at IBM. Teaching assistant across four CS courses. Building TERRA and Mantau for GEMASTIK XIX.",
} as const;
