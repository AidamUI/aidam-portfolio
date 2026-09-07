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
  hero: "I'm Aidam. I study Information Systems at Universitas Indonesia, work on observability at IBM, and teach four CS courses.",

  /** Runs under the hero, in mono. content.md §2. */
  heroSub:
    "IBM AIOps & Observability, GEMASTIK XIX national round, third year at Fasilkom UI.",

  /**
   * content.md §4 — the CV-style version, first person. The more personal
   * draft about doubting the field was rejected; don't reintroduce that register.
   */
  about: [
    "I've had a love for technology since I was young. I spent hours tinkering with phones and computers, and my first real exposure to development was building a game in Scratch back in sixth grade. Since then I've kept learning and building, mostly with Python and JavaScript, which is how I ended up somewhere between software development, data science, and now IT consulting.",
    "I like getting out of my comfort zone and pushing past what I'm used to. I'd say I'm highly adaptable, and that's helped every time I've said yes to something new: an internship at IBM, four teaching assistant roles at once, a national round GEMASTIK team. Right now that means building software, explaining it to the people who have to buy it, and teaching it to students who are just starting out.",
    "The plan is software engineering, then solutions architecture, then a master's abroad. I'm ambitious about it and committed to doing whatever it takes to get there.",
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
