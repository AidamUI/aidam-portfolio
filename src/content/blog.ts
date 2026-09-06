import type { BlogPost } from "./types";

/**
 * A one-time transplant of LinkedIn activity, newest first. There is no API
 * for a personal profile's posts, so this is copied by hand rather than
 * synced — it will drift out of date, and that is the honest cost of there
 * being no other way to do it.
 *
 * `repost` entries are someone else's post, kept in their voice and
 * attributed to them — Aidam shared it, he did not write it. `video` entries
 * were originally a clip; there is no file to embed, so the page shows a
 * placeholder frame and describes what was in it. Every photo referenced by
 * `placeholderImages` is likewise a placeholder — none of the original images
 * were carried over.
 *
 * Dates are as precise as LinkedIn's own relative timestamps ("2mo", "1yr")
 * allow, snapped to a real date where the site already records one (an
 * internship or role start date) rather than left as a guess twice over.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "two-months-into-ibm",
    title:
      "Two months into IBM: what observability actually looks like in production",
    date: "2026-09-04",
    kind: "post",
    excerpt:
      "Two months of Instana demos taught me observability is mostly about closing the gap between what a team thinks is running and what actually is.",
    tags: ["IBM", "Instana", "Observability", "APM", "DevOps"],
    placeholderImages: 5,
    body: [
      "Working across technical demos, Instana pitches, and client deployment support alongside implementation partners has changed how I think about observability entirely.",
      "Application Performance Monitoring sounds abstract until you watch it in a production enterprise stack. Before this internship, I understood APM mostly as a checkbox item — something teams needed for compliance or peace of mind. It took sitting in on real deployments and demos to see that real-time monitoring isn't a nice-to-have. A latency spike buried three services deep, or a dependency nobody mapped, can quietly erode a company's bottom line long before anyone notices an outage.",
      "That shift became concrete once I started working hands-on with IBM Instana. The capability that stood out most was the single-agent architecture. Watching one agent auto-discover a stack, trace every service, and map dependencies in real time — without weeks of manual instrumentation — was the moment observability stopped being a concept I could describe and became something I could actually demonstrate with confidence.",
      "What's been more eye-opening, though, is what that discovery process actually surfaces. Enterprise architecture at scale is rarely as documented as anyone assumes. In more than one deployment, the client's own team was seeing their topology map for the first time: forgotten microservices still running, dependencies nobody remembered wiring up, background processes quietly consuming resources with no clear owner. Full visibility doesn't just monitor the systems a company already knows about — it closes the gap between what a team thinks is running and what's actually running, and that gap is where most operational risk hides. Closing it is what turns remediation from reactive firefighting into something closer to instant, before an issue ever reaches an end user.",
      "Two months in, I still have a lot to learn about how this plays out across different client environments. Looking forward to the rest of this internship.",
    ],
  },
  {
    slug: "indonesia-builders-day-2026",
    title: "Indonesia Builders Day 2026",
    date: "2026-08-30",
    kind: "repost",
    repostedFrom: {
      name: "Luna Aramita",
      title:
        "CSE Intern @ IBM | IE Telkom University 2nd year | Physics Laboratory Assistant",
    },
    excerpt: "A repost from Luna Aramita on Indonesia Builders Day 2026.",
    tags: [
      "IndonesiaBuildersDay2026",
      "IBM",
      "LifeAtIBM",
      "DevelopersOfIndonesia",
      "TechCommunity",
    ],
    placeholderImages: 5,
    body: [
      "Honored to be part of the energy at Indonesia Builders Day 2026! Empowering Developers. Shaping the Nation.",
      "Surrounded by brilliant minds and forward-thinking builders, this event was a huge inspiration for my journey at IBM. Grateful for the exposure, the connections, and the shared passion for technology and innovation.",
      "Onward to building the future!",
    ],
  },
  {
    slug: "joining-ibm-as-btss",
    title: "Joining IBM as a Brand Technical Sales Specialist",
    date: "2026-06-01",
    kind: "post",
    excerpt:
      "Joining IBM's Brand Technical Sales Specialist programme for the summer.",
    tags: ["IBM", "Internship", "BTSS", "Career", "TechSales"],
    placeholderImages: 1,
    body: [
      "I'm excited to share that I'm joining IBM as Brand Technical Sales Specialist (BTSS) for my summer internship.",
      "Looking forward to learning and growing from hands-on industry experience while making an impact along the way.",
    ],
  },
  {
    slug: "testing-the-triathlon-forum",
    title: "Confidence in code: testing the Triathlon forum",
    date: "2026-01-12",
    kind: "post",
    excerpt:
      "195 tests, four layers, one debouncer — how the Triathlon forum earned its safety net.",
    tags: [
      "UnitTesting",
      "Flutter",
      "SoftwareTesting",
      "QualityAssurance",
      "Dart",
      "FasilkomUI",
    ],
    placeholderImages: 4,
    body: [
      'In the final stretch of our Platform-Based Programming project, I focused on the "safety net" of every professional application: unit testing. It\'s usually the first thing to get skipped, and the first thing you miss once the codebase grows.',
      "Three reasons it was worth the time: regression prevention, so new features don't quietly break what already worked; documentation, since a good test reads as a living record of how the code is supposed to behave; and refactoring safety — the confidence to clean up and optimise without guessing.",
      "For the Forum module specifically, I wrote 195 tests across four layers: models (JSON serialisation and null-value edge cases), services (business logic like administrative permissions and authorship checks), utilities (async tests verifying the timing of our debouncer), and caching (TTL expiration and hit/miss statistics).",
      "One example — testing that the debouncer actually waits before firing:",
      {
        code: "test('should execute callback after delay', () async {\n  int callCount = 0;\n  debouncer.run(() => callCount++);\n\n  expect(callCount, 0); // Should not execute immediately\n\n  await Future.delayed(Duration(milliseconds: 150));\n  expect(callCount, 1); // Executes after the 100ms debounce\n});",
      },
      "With all 195 tests passing, Triathlon stopped being just a class project and became a reliable piece of software. Across this project I learned that great engineering is mostly about the foundation: clean environment configuration, optimised performance, and the confidence that comes from actually testing your assumptions.",
      "Credit to the team: Randuichi Touya (Activities), Muhammad Helmi Alfarissi (User/Profile), Syakirah Zahra Dhawini (Ticketing), Justin Dwitama Seniang (Places), and Jarred Muhammad Radithya (Shop). Together we built more than an app — a scalable platform.",
      '"Code without tests is broken by design." — Jacob Kaplan-Moss',
    ],
  },
  {
    slug: "optimising-the-triathlon-forum",
    title: "Faster, lighter, better: optimising the Triathlon forum",
    date: "2026-01-08",
    kind: "post",
    excerpt:
      "A TTL cache and a 300ms debounce turned seven API calls into one.",
    tags: [
      "FlutterPerformance",
      "MobileUX",
      "Dart",
      "Programming",
      "Optimization",
    ],
    placeholderImages: 0,
    body: [
      "In mobile development, performance isn't just a metric — it's the user experience. For the Triathlon Forum I leaned on two techniques to keep the UI feeling snappy and the backend healthy: caching and debouncing.",
      "Forum cache service (TTL strategy). We don't need to hit the server every time someone opens the forum, so I built a cache that stores posts with a time-to-live:",
      {
        code: "List<ForumPost>? getCachedPosts() {\n  if (!_isCacheEnabled) return null;\n  if (_postsCache != null && !_postsCache!.isExpired(_cacheTtl)) {\n    _cacheHits++;\n    return _postsCache!.data;\n  }\n  _cacheMisses++;\n  return null;\n}",
      },
      'Search debouncer. Without debouncing, every keystroke in the search bar fires a filter or an API call. A 300ms delay waits for the person to actually finish typing before doing anything: typing "flutter" without a debounce is 7 API calls; with one, it\'s 1.',
      "The result: a large drop in server requests during search, near-instant responses on cached data, and lower battery and data use from not re-rendering on every keystroke. Small optimisations, but they're the difference between an app that works and one that feels considered.",
    ],
  },
  {
    slug: "ai-in-indonesian-hr-survey",
    title: "A five-minute survey on AI in Indonesian HR",
    date: "2025-12-10",
    kind: "post",
    excerpt:
      "A short survey for a Statistics course, and a small thank-you for anyone who filled it in.",
    tags: [
      "HumanResources",
      "AI",
      "FutureOfWork",
      "UniversitasIndonesia",
      "CSUI",
      "HRTech",
    ],
    placeholderImages: 1,
    body: [
      "How is AI reshaping human resources in Indonesia? For an Introduction to Statistics project at Universitas Indonesia, my team and I ran a short survey of HR practitioners — whether their company was fully leaning into AI or just starting to explore it — to get real data on adoption rather than assumptions.",
      "The call-out offered a small thank-you — IDR 500,000 in e-wallet credit, split across five respondents — for anyone willing to give five to ten minutes to it. The survey has since closed.",
    ],
  },
  {
    slug: "failed-as-a-mentee-succeeded-as-a-mentor",
    title: "Failed as a mentee, succeeded as a mentor",
    date: "2025-10-08",
    kind: "repost",
    repostedFrom: {
      name: "Mayangkasih Arynsyah Sheila",
      title:
        "IS Product Consultant | Co-Founder @ Halo IS | Mentor Product Design & Product Management",
    },
    excerpt:
      "A repost from Mayangkasih Arynsyah Sheila on turning a COMPFEST rejection into a mentorship.",
    placeholderImages: 4,
    body: [
      "A few months ago I planned to register for a University of Indonesia programme with a product management track — and it turned out, I failed.",
      "COMPFEST was often a hot topic in my circle. Some people got in on the first try; others tried three times and gave up. A few months passed peacefully after my rejection. I kept busy sharing opinions on product management on LinkedIn, and a few professionals reached out to connect and swap perspectives.",
      "Then one day I got a DM inviting me to mentor at COMPFEST's graduation night — handling product creation and enhancement for a team I'd go on to mentor.",
      "And here I am, together with Team Gamma, having run a fun, insightful, discussion-filled mentoring session. Their questions kept giving me fresh angles on solving unemployment in Indonesia with AI-powered systems.",
      "By the end, everything went smoothly — our team pitched to the judges and several members walked away with awards. I've never been prouder to get a mentorship offer for something I was actually rejected from as a participant.",
      "Shoutout to Team Gamma — Aidam Kaila included — for the session, and to everyone at COMPFEST who made the invitation possible.",
    ],
  },
  {
    slug: "leadconnect-x-global-leadspace",
    title: "LeadConnect x Global LeadSpace",
    date: "2025-09-10",
    kind: "repost",
    repostedFrom: {
      name: "Bintang Arieta Ramadhia",
      title:
        "Business Development | Project & Event Coordination | Public Health Undergraduate at University of Indonesia",
    },
    excerpt:
      "A repost from Bintang Arieta Ramadhia on running LeadConnect x Global LeadSpace.",
    placeholderImages: 4,
    body: [
      "Last Saturday reminded me why I love creating spaces that bring people together — spaces that spark meaningful conversations and genuine connection.",
      "Together with a co-lead, I had the honour of running LeadConnect x Global LeadSpace, a one-day event bringing together students, young leaders and professionals from companies like Spotify, McKinsey, PwC, Deloitte and GoTo.",
      'We designed it for real, honest conversations — the kind that leave you thinking "that one conversation changed how I see my future." From tech to consulting, finance to global-culture stories, it was good to watch the room light up with curiosity.',
      "Grateful to every speaker and mentor who shared their time and story, and to the organising team who helped shape the day.",
    ],
  },
  {
    slug: "starting-at-ristek",
    title: "Starting a new position at RISTEK Fasilkom UI",
    date: "2025-02-10",
    kind: "post",
    excerpt: "Starting as Marketing and Communications at RISTEK Fasilkom UI.",
    placeholderImages: 1,
    body: [
      "I'm happy to share that I'm starting a new position as Marketing and Communications at RISTEK, Fakultas Ilmu Komputer Universitas Indonesia!",
    ],
  },
  {
    slug: "al-wildan-grand-opening-speech",
    title: "English speech at Al-Wildan 8's grand opening",
    date: "2024-01-28",
    kind: "video",
    videoDuration: "6:37",
    excerpt:
      "A video: an English speech on inherited knowledge at Al-Wildan 8's opening.",
    placeholderImages: 0,
    body: [
      'At the grand opening of Al-Wildan 8 in Parung/Kemang, I was invited to give an English speech on "Knowledge Inherited From the Prophets."',
    ],
  },
  {
    slug: "muslim-fest-ice-bsd",
    title: "Interviewing visitors at Muslim Fest, ICE BSD",
    date: "2023-08-27",
    kind: "video",
    videoDuration: "2:11",
    excerpt:
      "A video: interviewing Muslim Fest visitors as a school ambassador.",
    placeholderImages: 0,
    body: [
      "At Muslim Fest in ICE BSD, some of my peers and I were invited by our school as ambassadors to help promote it during the event. That meant communicating in English and interviewing visitors on camera — like the clip here.",
    ],
  },
];

export const BLOG_COPY = {
  heading: "Blog",
  blurb:
    "Posts, reposts and a couple of videos, copied over from LinkedIn by hand — there's no API for a personal profile's activity, so this is a one-time transplant, not a live feed. It will drift out of date, and that's the honest cost of there being no other way to do it.",
  kindLabel: {
    post: "Post",
    repost: "Repost",
    video: "Video",
  },
  repostedFromPrefix: "Reposted from",
  allPosts: "All posts",
} as const;

export function postBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
