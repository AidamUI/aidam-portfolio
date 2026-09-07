import type { LegacyProject, Project, ProjectStatus } from "./types";

/**
 * Placeholder images ship at 1600x1000. Replacing one is a file swap at the
 * same path in public/images/projects/<slug>/; only a different aspect ratio
 * needs these numbers changed. Regenerate them with `pnpm placeholders`.
 */
const SHOT = { width: 1600, height: 1000 } as const;

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
    what: "Photo-based grading, then matching: upload a crop image, get a condition and severity read, and get routed to nearby buyers who want that grade.",
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
    role: "Business planning and go-to-market, in GEMASTIK's ICT Business Development division.",
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
    role: "I built it end to end with Tasya Pandya: the dataset merge, the posting parser, and the dashboard on top of them.",
    problem:
      "Reskilling programmes often get built around whatever skills sound current, without data on what a specific city's employers actually need.",
    what: "Unifies 35+ BPS provincial datasets into one national city-level database using Python, processes 4,800+ JobStreet postings to extract specific skill requirements, and feeds a Tableau dashboard visualising regional skill gaps to power a reskilling platform's recommendation engine.",
    build:
      "Built in Python: 35+ provincial datasets normalised to a common city-level schema, then 4,800+ job postings processed to pull out the skill requirements behind them. The output feeds a Tableau dashboard of regional skill gaps.",
    outcome:
      "Built for the Compfest Data Science Academy, with Tasya Pandya. The dashboard is public and lives on her Tableau Public profile.",
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
    images: [
      {
        src: "/images/projects/skillpath/01.png",
        alt: "The regional skill-gap dashboard, showing demand by city.",
        caption: "The dashboard the pipeline feeds. Built with Tasya Pandya.",
        ...SHOT,
      },
      {
        src: "/images/projects/skillpath/02.png",
        alt: "The merge step that normalises 35+ provincial datasets to one city-level schema.",
        caption: "Thirty-five provincial datasets, unified into one schema.",
        ...SHOT,
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
    role: "Coursework, split across a front end repo and a back end repo.",
    problem:
      "Coursework for Enterprise Application Programming, a course on this term's schedule.",
    what: "The practicum asks for a front end and a back end built the way the course's enterprise application architecture module expects. In progress this term, so the repositories below are still empty.",
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
    // Platform-Based Programming sits in content.md §8's "2025/2026, Term 1",
    // so the calendar year the course opened is 2025 — matching football-news,
    // which is the same course.
    year: 2025,
    role: "Coursework for Platform-Based Programming: the web app and the mobile client that consumes it.",
    problem:
      "Platform-Based Programming asks for one product delivered twice: a Django web app and a Flutter client against the same REST API.",
    what: "A Django football merchandise store styled with Tailwind CSS: product CRUD, JSON and XML API endpoints, and session-based auth with last-login tracking. The Flutter client reuses that same Django session to consume the store over its API, themed around Liverpool FC's colours.",
    stack: ["Django", "Flutter", "Dart", "Tailwind CSS"],
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
    images: [
      {
        src: "/images/projects/kosinduy/01.png",
        alt: "The football store running on the web.",
        caption: "The store, server-rendered on the web.",
        ...SHOT,
      },
      {
        src: "/images/projects/kosinduy/02.png",
        alt: "The Flutter client consuming the same REST API.",
        caption: "The same API, consumed by a second client.",
        ...SHOT,
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
    role: "Coursework for Platform-Based Programming: the web app and the mobile client that consumes it.",
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
    images: [
      {
        src: "/images/projects/football-news/01.png",
        alt: "The news reader running on the web.",
        caption: "The reader, on the web.",
        ...SHOT,
      },
      {
        src: "/images/projects/football-news/02.png",
        alt: "The Flutter client for the same backend.",
        caption: "The same reader, on a phone.",
        ...SHOT,
      },
    ],
  },
  {
    slug: "triathlon",
    code: "P1.4",
    name: "Triathlon",
    tagline: "an integrated platform for endurance-sport athletes",
    status: "coursework",
    year: 2025,
    role: "Coursework for Platform-Based Programming, on a six-person team. I owned the Forum module, web and mobile, plus its test suite and performance work.",
    problem:
      "An athlete's digital life is currently split across separate apps: activity tracking, community discussion, buying gear, and booking a facility.",
    what: "Triathlon consolidates activity tracking, a community forum, an equipment shop, and facility booking into one platform, with role-based access for regular users, sellers, and facility admins. Built by six students. I owned the Forum module: thread-based discussion with auto-bumping and voting, on both the Django web app and the Flutter mobile client.",
    build:
      "Django (MVT) on the web, a Flutter client consuming it over a REST/JSON API with session-based auth. For the Forum module specifically: 195 tests across models, services, utilities and caching, a TTL-cached forum feed, and a 300ms search debounce, both covered in more detail on the blog.",
    outcome:
      "Built with Randuichi Touya (Activities), Muhammad Helmi Alfarissi (User/Profile), Syakirah Zahra Dhawini (Ticketing), Justin Dwitama Seniang (Places), and Jarred Muhammad Radithya (Shop).",
    stack: ["Django", "Flutter", "Dart", "Python"],
    links: [
      {
        label: "triathlon",
        href: "https://github.com/pbp-kelompok-d1/triathlon",
      },
      {
        label: "triathlon-mobile",
        href: "https://github.com/pbp-kelompok-d1/triathlon-mobile",
      },
      {
        label: "Blog: testing the Triathlon forum",
        href: "/blog/testing-the-triathlon-forum",
      },
      {
        label: "Blog: optimising the Triathlon forum",
        href: "/blog/optimising-the-triathlon-forum",
      },
    ],
    images: [
      {
        src: "/images/blog/testing-the-triathlon-forum/01.jpg",
        alt: "The Triathlon app's splash screen.",
        width: 568,
        height: 1076,
      },
      {
        src: "/images/blog/testing-the-triathlon-forum/02.jpg",
        alt: "The Triathlon app's home dashboard, with training summary and quick access tiles.",
        width: 568,
        height: 1079,
      },
      {
        src: "/images/blog/testing-the-triathlon-forum/03.jpg",
        alt: "The Triathlon app's Forum tab, listing recent posts.",
        width: 568,
        height: 1083,
      },
      {
        src: "/images/blog/testing-the-triathlon-forum/04.jpg",
        alt: "A Triathlon forum post open, with replies underneath.",
        width: 566,
        height: 1076,
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
  blurb: "Where I started.",
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

/**
 * How each status reads on the index, and the order the groups appear in.
 * Competing first because it is what is live right now; early work last.
 */
export const STATUS_GROUPS: {
  status: ProjectStatus;
  code: string;
  heading: string;
  blurb: string;
}[] = [
  {
    status: "competing",
    code: "P1.A",
    heading: "In competition",
    blurb: "GEMASTIK XIX, national round. Still being judged.",
  },
  {
    status: "shipped",
    code: "P1.B",
    heading: "Shipped",
    blurb: "Finished and public.",
  },
  {
    status: "coursework",
    code: "P1.C",
    heading: "Coursework",
    blurb: "Built for coursework.",
  },
  {
    status: "archived",
    code: "P1.D",
    heading: "Archived",
    blurb: "Older work.",
  },
];

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  competing: "competing",
  shipped: "shipped",
  coursework: "coursework",
  archived: "archived",
};

export const PROJECTS_COPY = {
  intro: "Projects and competitions, newest first.",
  roleLabel: "My part",
  stackLabel: "Built with",
  withheldLabel: "Details withheld",
  imagesLabel: "Screens",
  noImagesYet: "No screenshots up yet.",
  moreProjects: "More projects",
  viewCaseStudy: "Full case study",
  nextProject: "Next",
  prevProject: "Previous",
} as const;

export function projectsWithStatus(status: ProjectStatus): Project[] {
  return PROJECTS.filter((project) => project.status === status);
}
