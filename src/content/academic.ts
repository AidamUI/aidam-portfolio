import type { Honour, Term } from "./types";

/**
 * Academic record. Source: content.md §8, from the official UI transcript.
 *
 * ── NO GRADES. ANYWHERE. EVER. ────────────────────────────────────────────
 * Course names and credits only. The `Course` type has no grade field at all,
 * so this is enforced by shape rather than by discipline. The CGPA stays as a
 * single headline number, which is the one figure Aidam asked to publish.
 *
 * Also deliberately absent, and to stay absent: the student ID and the
 * academic advisor's name. content.md marks both internal-use only, and this
 * repository is public — so neither is written out here either, not even to
 * say what is being left out.
 */

export const ACADEMIC = {
  institution: "Universitas Indonesia",
  faculty: "Faculty of Computer Science",
  programme: "Bachelor of Computer Science, Information Systems",
  start: "2024-06",
  expectedEnd: "2027-12",
  expectedEndLabel: "Expected December 2027",
  cgpa: "3.87 / 4.00",
  creditsCompleted: 84,
  currentTermLabel: "2026/2027, Term 1",
  currentTermCredits: 20,
} as const;

/**
 * Two separate awards, not one programme. context.md §3 is explicit about this
 * and both the CV and LinkedIn currently blur them.
 */
export const HONOURS: Honour[] = [
  {
    name: "Dana Abadi UI — Dato' Dr. Low Tuck Kwong & Purnomo Yusgiantoro Center Scholarship",
    period: "Feb – Jun 2026",
  },
  {
    name: "Fully funded short-term exchange, Universiti Malaya",
    period: "September 2025",
    note: "A separate award from the Dana Abadi scholarship, not the same programme.",
  },
];

export const PRIOR_SCHOOL = {
  name: "Al Wildan 3 International Islamic School",
  track: "Natural Sciences",
  period: "Jul 2018 – Jul 2024",
} as const;

/**
 * The complete record: 84 credits across six terms, names and credits only.
 * Newest first, so the term in progress is the one a reader meets.
 */
export const TERMS: Term[] = [
  {
    label: "2026/2027, Term 1",
    note: "In progress — 20 credits",
    inProgress: true,
    courses: [
      { name: "IS Analysis and Design", credits: 3 },
      { name: "Enterprise Application Programming", credits: 4 },
      { name: "Computer Vision", credits: 3 },
      { name: "Data Communication Networks", credits: 4 },
      { name: "Knowledge Graph", credits: 3 },
      { name: "CS Special Topics", credits: 3 },
    ],
  },
  {
    label: "2025/2026, Term 2",
    courses: [
      { name: "Security-Driven Software Development", credits: 3 },
      { name: "Human-Computer Interaction", credits: 3 },
      { name: "Introduction to AI & Data Science", credits: 4 },
      { name: "Business Intelligence", credits: 3 },
      { name: "Accounting & Enterprise Information System", credits: 4 },
      { name: "Interpersonal Relationship", credits: 3 },
    ],
  },
  {
    label: "2025/2026, Term 1",
    courses: [
      { name: "Platform-Based Programming", credits: 4 },
      { name: "Databases", credits: 4 },
      { name: "Introduction to Statistics", credits: 4 },
      { name: "Introduction to Operating Systems", credits: 3 },
      { name: "Information Technology Project Management", credits: 3 },
    ],
  },
  {
    label: "2024/2025, Term 3",
    note: "Short semester",
    courses: [{ name: "Data Structures & Algorithms", credits: 4 }],
  },
  {
    label: "2024/2025, Term 2",
    courses: [
      { name: "Discrete Mathematics 2", credits: 3 },
      { name: "Programming Foundations 2", credits: 4 },
      { name: "Linear Algebra", credits: 3 },
      { name: "Introduction to Computer Architecture", credits: 3 },
      { name: "Principles of Information Systems", credits: 3 },
      { name: "Integrated Personality Development Skills", credits: 6 },
    ],
  },
  {
    label: "2024/2025, Term 1",
    courses: [
      { name: "Discrete Mathematics 1", credits: 3 },
      { name: "Calculus 1", credits: 3 },
      { name: "Programming Foundations 1", credits: 4 },
      { name: "Business Management", credits: 3 },
      { name: "Business and Technical Communication", credits: 3 },
      { name: "English", credits: 2 },
      { name: "Religion", credits: 2 },
    ],
  },
];

/**
 * Derived, so the headline figures can never drift from the course list.
 *
 * The distinction matters: the six terms sum to 104 credits, but 20 of those
 * are the term in progress. "84 credits completed" is the completed figure and
 * excludes the current term — summing all six and calling it completed would
 * overstate the record by a full semester.
 */
const creditsIn = (terms: Term[]) =>
  terms.reduce(
    (total, term) =>
      total + term.courses.reduce((sum, course) => sum + course.credits, 0),
    0,
  );

export const CREDITS_COMPLETED = creditsIn(TERMS.filter((t) => !t.inProgress));
export const CREDITS_IN_PROGRESS = creditsIn(TERMS.filter((t) => t.inProgress));
export const CREDITS_TOTAL = CREDITS_COMPLETED + CREDITS_IN_PROGRESS;

export const COURSE_COUNT = TERMS.reduce(
  (total, term) => total + term.courses.length,
  0,
);

export const ACADEMIC_COPY = {
  /** Section headings and field labels — no user-visible string in a component. */
  degreeHeading: "Degree",
  honoursHeading: "Scholarships and honours",
  teachingHeading: "Teaching",
  priorSchoolHeading: "Prior school",
  labelPeriod: "Period",
  labelCgpa: "CGPA",
  labelCredits: "Credits",
  labelCurrentTerm: "Current term",
  creditsValue: (done: number, doing: number) =>
    `${done} completed, ${doing} in progress`,
  currentTermValue: (label: string, credits: number) =>
    `${label} — ${credits} credits`,
  coursesSummary: (courses: number, credits: number) =>
    `${courses} courses, ${credits} credits.`,
  creditSuffix: "cr",
  coursesHeading: "Full course record",
  /**
   * The course list is long, so it sits behind a disclosure rather than
   * pushing the degree facts off the first screen — prd.md §5.4 asks for
   * exactly that.
   */
  coursesToggle: "Show all courses",
  coursesNote: "Names and credits only.",
} as const;
