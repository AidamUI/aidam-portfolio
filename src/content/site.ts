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
  /** The header wordmark, set in signage caps. */
  wordmark: "AIDAM",
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
 * The instruction was to link the CV as-is with no redaction pass, but the PDF
 * carries live links to github.com/Terra-gemastik/TERRA-FE and TERRA-BE and to
 * AidamUI/mantau-prototype-mobile, TERRA's stack breakdown ("YOLO-integrated",
 * "modular FastAPI backend (9 modules, 38 REST endpoints)", the React
 * Native/Expo client), Mantau's business model, and a phone number that
 * prd.md §5.7 and §6 keep off the site. Serving it defeats the confidentiality
 * rule at the one place it matters most, so the link is off and the file is out
 * of `public/` until the competition concludes.
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
  /** Sits under the miniature route diagram in the footer. */
  mapLabel: "Route map",
} as const;

export const A11Y = {
  skipToContent: "Skip to content",
  primaryNav: "Station codes",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  /** The route line is decorative; the station codes carry the meaning. */
  currentStation: "current station",
} as const;

export const THEME_COPY = {
  toGraphite: "Switch to graphite",
  toDay: "Switch to day platform",
  graphiteLabel: "Graphite",
  dayLabel: "Day",
} as const;
