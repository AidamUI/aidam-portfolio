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
  },
  about: {
    code: "A1",
    heading: "About",
    more: "More about the work",
  },
  featured: {
    code: "P1",
    heading: "Featured projects",
  },
  skills: {
    code: "W1.1",
    heading: "Built with",
    more: "Full skills list",
  },
  contact: {
    heading: "Elsewhere",
  },
} as const;
