import type { LegacyProject, Project } from "./types";

/**
 * Every project on the site. Source: content.md §7.
 *
 * ── STANDING RULE, DO NOT RELAX WITHOUT AN EXPLICIT GREEN LIGHT ────────────
 *
 * TERRA and Mantau are live GEMASTIK XIX entries still being judged. Both are
 * `confidential: true`, which the `Project` type turns into a hard constraint:
 * `stack`, `links`, `images`, `build` and `outcome` are typed `never` on a
 * confidential project, so adding any of them is a build error rather than a
 * leak. The case-study template branches on the same field.
 *
 * That means, specifically, no link to any of the two competition orgs'
 * repositories anywhere on the site, and no implementation or business-model
 * detail on either page.
 *
 * Role claims are fine — a role is not implementation detail. Everything else
 * stays at the level of "what problem this solves".
 *
 * This lifts only when Aidam says the competition has concluded. Do not infer
 * it from a date, from the repositories being public, or from anything else.
 *
 * ── Naming ────────────────────────────────────────────────────────────────
 * The CV's "AI-Powered" title prefixes and its absolute-sounding monitoring
 * claim are deliberately gone: context.md §6 flags both as failing Aidam's own
 * evidence-over-buzzwords rule. Don't reintroduce either.
 */

export const PROJECTS: Project[] = [
  {
    slug: "terra",
    code: "P1.1",
    name: "TERRA",
    tagline: "post-harvest marketplace for off-grade crops",
    status: "competing",
    year: 2026,
    featured: true,
    confidential: true,
    role: "Sole backend developer.",
    problem:
      "A farmer holding damaged or substandard harvest has no efficient way to reach the buyer who actually wants that grade, so it gets dumped or sold at a loss.",
    what: "Photo-based grading, then matching — upload a crop image, get a condition and severity read, get routed to nearby buyers who want that grade.",
    withheldNote:
      "TERRA is still being judged in the GEMASTIK XIX national round, so the build details, the architecture and the repositories stay off this page until the competition concludes.",
  },
  {
    slug: "mantau",
    code: "P1.2",
    name: "Mantau",
    tagline: "fall detection on the CCTV people already own",
    status: "competing",
    year: 2026,
    featured: true,
    confidential: true,
    /**
     * [CONFIRM] content.md §7 gives Mantau no role line, unlike TERRA's "sole
     * backend developer". prd.md §5.3 requires every project page to state a
     * role in one unambiguous sentence, so this is derived from the entry's
     * division (ICT Business Development) and kept free of any business-model
     * detail. Replace it with Aidam's own wording when he supplies one.
     */
    role: "I work the business side of this entry rather than the build.",
    problem:
      "Elderly fall detection means wearables people won't wear or hardware families won't buy.",
    what: "Connects an existing household CCTV feed to a detection engine and alerts family fast, without new hardware.",
    withheldNote:
      "Mantau is still being judged in the GEMASTIK XIX national round, so the business model, the projections and the prototype stay off this page until the competition concludes.",
  },
  {
    slug: "skillpath",
    code: "P1.3",
    name: "SkillPath",
    tagline: "regional skill gaps from public labour data",
    status: "shipped",
    year: 2025,
    featured: true,
    role: "I built the data pipeline: the merge of the provincial datasets and the posting parser behind the dashboard.",
    problem:
      "Reskilling programmes get pointed at whatever skills sound current, not at what a particular city's employers are actually short of.",
    what: "Merges 35+ BPS provincial datasets into one city-level national database, parses 4,800+ JobStreet postings for the skills they ask for, and surfaces the gap per region so a reskilling platform can recommend against real demand.",
    build:
      "Python for the merge and the parsing — 35+ provincial datasets normalised to a common city-level schema, then 4,800+ job postings processed to pull out the skill requirements behind them. The output feeds a Tableau dashboard of regional skill gaps.",
    outcome:
      "Built for the Compfest Data Science Academy. The dashboard is public and hosted on teammate Tasya Pandya's Tableau Public profile — the visualisation work is hers, the pipeline underneath it is mine.",
    stack: ["Python", "Tableau", "SQL"],
    links: [
      {
        label: "Compfest-DSA-DataProcessing",
        href: "https://github.com/AidamUI/Compfest-DSA-DataProcessing",
      },
      {
        label: "Tableau dashboard (built with Tasya Pandya)",
        href: "https://public.tableau.com/app/profile/tasya.pandya/viz/COMPFESTIndonesiasUnemployment/IndonesiaUnemployementDemograph",
      },
    ],
  },
  {
    slug: "praktikum-apap",
    code: "P1.4",
    name: "APAP practicum",
    tagline: "enterprise application architecture coursework",
    status: "coursework",
    year: 2026,
    role: "Coursework, built across the front end and the back end.",
    problem:
      "The Enterprise Application Programming practicum: build a service the way an enterprise would, rather than the way a student would.",
    what: "A split front end and back end, exercising the layered architecture and service boundaries the course is about.",
    /** [CHECK] Spring Boot is inferred from the course, not confirmed outright. */
    stack: ["Spring Boot", "Java"],
    links: [
      {
        label: "praktikum-apap-be",
        href: "https://github.com/AidamUI/praktikum-apap-be",
      },
      {
        label: "praktikum-apap-fe",
        href: "https://github.com/AidamUI/praktikum-apap-fe",
      },
    ],
  },
  {
    slug: "kosinduy",
    code: "P1.4",
    name: "kosinduy_YNWA",
    tagline: "Django and Flutter football store",
    status: "coursework",
    year: 2026,
    role: "Coursework for Platform-Based Programming — the web app and the mobile client that consumes it.",
    problem:
      "Platform-Based Programming asks for one product delivered twice: a Django web app and a Flutter client against the same REST API.",
    what: "A football merchandise store, server-rendered on the web and consumed by a Flutter app over REST.",
    stack: ["Django", "Flutter", "Dart", "PostgreSQL"],
    links: [
      {
        label: "kosinduy_YNWA",
        href: "https://github.com/AidamUI/kosinduy_YNWA",
      },
      {
        label: "KosinduyYNWA-mobile",
        href: "https://github.com/AidamUI/KosinduyYNWA-mobile",
      },
    ],
  },
  {
    slug: "football-news",
    code: "P1.4",
    name: "football-news",
    tagline: "news app, web and mobile",
    status: "coursework",
    year: 2025,
    role: "Coursework for Platform-Based Programming — the web app and the mobile client that consumes it.",
    problem:
      "The same course, the same shape: prove the web app and the mobile client can share one backend.",
    what: "A football news reader with a Django backend and a Flutter client.",
    stack: ["Django", "Flutter", "Dart"],
    links: [
      {
        label: "football-news",
        href: "https://github.com/AidamUI/football-news",
      },
      {
        label: "football-news mobile",
        href: "https://github.com/AidamUI/football-news-mobile",
      },
    ],
  },
];

/**
 * The compressed "early work" row at the bottom of /projects. Kept on purpose,
 * framed honestly, no case study pages. All on the legacy AidamGit account,
 * which stays labelled as such rather than being merged into AidamUI.
 */
export const LEGACY_PROJECTS: LegacyProject[] = [
  { name: "click-wars", href: "https://github.com/AidamGit/click-wars" },
  { name: "snake-game", href: "https://github.com/AidamGit/snake-game" },
  { name: "pong-game", href: "https://github.com/AidamGit/pong-game" },
  {
    name: "USA-States-Guesser",
    href: "https://github.com/AidamGit/USA-States-Guesser",
  },
  {
    name: "pomodoro-timer",
    href: "https://github.com/AidamGit/pomodoro-timer",
  },
];

export const LEGACY_COPY = {
  heading: "Early work, 2023–24",
  blurb: "Where I started. Left up on purpose.",
} as const;

/**
 * Kinefeet2_POC and hangrycasestudy are excluded from the site entirely, per
 * Aidam's call. SiakTzuTest belongs on the gallery, not here.
 */
export const EXCLUDED_REPOS = ["Kinefeet2_POC", "hangrycasestudy"] as const;

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
