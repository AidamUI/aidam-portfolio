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
    "now serving: IBM AIOps & Observability, GEMASTIK XIX national round, third year at Fasilkom UI",

  /**
   * content.md §4 — the CV-style version, first person. The more personal
   * draft about doubting the field was rejected; don't reintroduce that register.
   */
  about: [
    "I've been into technology since I was a kid — the kind of interest that starts with tinkering with phones and computers and doesn't really stop. My first real exposure to development was building a game in Scratch in sixth grade. Since then I've kept building, mostly with Python and JavaScript, which is how I ended up between software development, data science, and now IT consulting.",
    "I like being out of my depth. It's mostly worked out: I've picked up skills fast enough to keep saying yes to things — an internship at IBM, four teaching assistant roles at once, a national-finalist GEMASTIK team — and each one has taught me more than the last. Right now that means building software, explaining it to the people who have to buy it, and teaching it to the students who are still deciding if they like it.",
    "The plan is software engineering, then solutions architecture, then a master's abroad. I'm committed to getting there.",
  ],

  /** Share cards and meta descriptions. content.md §4. */
  shortBio:
    "Information Systems student at Universitas Indonesia. Technical intern on AIOps and observability at IBM. Teaching assistant across four CS courses. Building TERRA and Mantau for GEMASTIK XIX.",
} as const;
