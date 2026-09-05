/**
 * Home page copy. The interchange where both lines meet.
 *
 * Lives here rather than in the page so that changing a section heading is a
 * content edit, not a component edit — tech-plan.md §8: no content string in a
 * component file.
 */
export const HOME = {
  glance: {
    code: "W1",
    heading: "At a glance",
    blurb: "Four things, each with a page behind it",
  },
  about: {
    code: "A1",
    heading: "About",
    blurb: "In my own words",
    more: "More about the work",
  },
  featured: {
    code: "P1",
    heading: "Featured projects",
    blurb: "Three worth opening",
  },
  skills: {
    code: "W1.1",
    heading: "Built with",
    blurb: "What I reach for without thinking about it",
    note: "Everything I claim is tiered by evidence — what I build with daily, what a named project backs up, and what I am still learning.",
    more: "The full breakdown, with the proof attached",
  },
  contact: {
    heading: "Elsewhere",
  },
} as const;
