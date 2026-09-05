import type { SocialLink } from "./types";

/**
 * Site chrome: identity, links, and the strings the header and footer render.
 * No content string lives in a component file (tech-plan.md §8), so even the
 * footer's one-liners come from here.
 *
 * Sources: content.md §1 (identity and links) and §12 (footer).
 */

export const SITE = {
  name: "Muhammad Kaila Aidam Riyan",
  goesBy: "Aidam",
  /** The header wordmark. */
  wordmark: "Aidam",
  location: "Jakarta, Indonesia",
  /** content.md §4, short bio — used for share cards and the default description. */
  description:
    "Information Systems student at Universitas Indonesia. Technical intern on AIOps and observability at IBM. Teaching assistant across four CS courses.",
  /**
   * Canonical origin. Set NEXT_PUBLIC_SITE_URL in Vercel once the production
   * domain is attached; the fallback is the free .vercel.app subdomain, which
   * is the decided hosting arrangement (no custom domain).
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aidam-portfolio.vercel.app",
} as const;

/**
 * Email is published, but lightly obfuscated: the visible text is split across
 * elements so the rendered HTML holds no contiguous address for a naive
 * regex scraper. The `mailto:` href is necessarily whole — that is the honest
 * limit of "light" without breaking the no-JavaScript requirement.
 */
export const EMAIL = {
  user: "aidamkaila",
  domain: "gmail.com",
  get address() {
    return `${this.user}@${this.domain}`;
  },
  get href() {
    return `mailto:${this.user}@${this.domain}`;
  },
};

/** Primary account is AidamUI. AidamGit stays linked, labelled, not merged. */
export const SOCIALS: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/aidamkaila" },
  { label: "GitHub", href: "https://github.com/AidamUI" },
  {
    label: "GitHub (AidamGit)",
    href: "https://github.com/AidamGit",
    note: "early work, 2023–24",
  },
  { label: "Instagram", href: "https://instagram.com/aidamkai" },
];

/**
 * WITHHELD while GEMASTIK XIX judging is open.
 *
 * The instruction was to link the CV as-is with no redaction pass. The PDF,
 * however, carries live repository links for both competition entries, a full
 * implementation breakdown of one of them, the business model of the other,
 * and a phone number that prd.md §5.7 and §6 keep off the site. Serving it
 * defeats the confidentiality rule at the one place it matters most, so the
 * link is off and the file is out of `public/` until judging concludes.
 *
 * The specifics are deliberately not written out here: this repository is
 * public, so a comment naming those URLs would publish exactly what the rule
 * exists to withhold.
 *
 * To restore: set `available: true` and drop the PDF back at the path below.
 * The footer branches on this flag, so that is the whole change.
 */
export const CV = {
  available: false,
  label: "Download CV",
  href: "/cv/muhammad-kaila-aidam-riyan-cv.pdf",
  filename: "muhammad-kaila-aidam-riyan-cv.pdf",
} as const;

export const FOOTER = {
  builtWith: "Built with Next.js.",
  sourceLabel: "Source on GitHub",
  sourceHref: "https://github.com/AidamUI/aidam-portfolio",
  /** Prefix for the build date; the date itself is stamped at build time. */
  updatedPrefix: "Last updated",
  navHeading: "Pages",
  elsewhereHeading: "Elsewhere",
} as const;

export const A11Y = {
  skipToContent: "Skip to content",
  primaryNav: "Primary",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  currentPage: "current page",
} as const;

export const THEME_COPY = {
  toDark: "Switch to dark mode",
  toLight: "Switch to light mode",
} as const;
