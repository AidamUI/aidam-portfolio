import type { Metadata } from "next";
import { RoleEntry } from "@/components/RoleEntry";
import { StationSign } from "@/components/StationSign";
import {
  ACADEMIC,
  ACADEMIC_COPY,
  COURSE_COUNT,
  CREDITS_COMPLETED,
  CREDITS_IN_PROGRESS,
  CREDITS_TOTAL,
  HONOURS,
  PRIOR_SCHOOL,
  TERMS,
} from "@/content/academic";
import { TEACHING_LOAD, TEACHING_ROLES } from "@/content/roles";
import { SITE } from "@/content/site";
import { stationForPath } from "@/content/stations";

const station = stationForPath("/academic")!;

export const metadata: Metadata = {
  title: station.name,
  description: `${ACADEMIC.programme} at ${ACADEMIC.institution}, teaching, scholarships and the full course record — ${SITE.goesBy}`,
  alternates: { canonical: station.href },
};

/**
 * A server component on purpose.
 *
 * This page was briefly a client component so a useState could drive the
 * "show all courses" toggle, which silently broke two things: a client
 * component cannot export `metadata`, so the route lost its title and
 * description entirely, and the whole course record shipped in the JS bundle
 * on a page that is otherwise pure text.
 *
 * A native <details> does the same job with no JavaScript at all — keyboard
 * operable, announced correctly, and open by default for anyone who arrives
 * with a printer or a screen reader in browse mode. prd.md §5.4 asks only that
 * the course list not crowd the first screen, which this satisfies.
 */
export default function AcademicPage() {
  return (
    <>
      <StationSign
        code={station.code}
        name={station.name}
        line={station.line}
        blurb={station.blurb}
        as="h1"
      />

      <section className="px-lg py-xl">
        <h2 className="sign-type mb-md text-ink text-[22px]">
          {ACADEMIC.institution}
        </h2>
        <p className="text-ink text-[17px]">{ACADEMIC.faculty}</p>
        <p className="text-ink-2 text-[17px]">{ACADEMIC.programme}</p>

        <dl className="mt-lg gap-md flex flex-col">
          <div>
            <dt className="code-type text-ink-2 text-[13px]">
              {ACADEMIC_COPY.labelPeriod}
            </dt>
            <dd className="text-ink font-mono text-[15px]">
              {ACADEMIC.start.slice(0, 4)} – {ACADEMIC.expectedEndLabel}
            </dd>
          </div>
          <div>
            <dt className="code-type text-ink-2 text-[13px]">
              {ACADEMIC_COPY.labelCgpa}
            </dt>
            <dd className="text-ink font-mono text-[17px]">{ACADEMIC.cgpa}</dd>
          </div>
          <div>
            <dt className="code-type text-ink-2 text-[13px]">
              {ACADEMIC_COPY.labelCredits}
            </dt>
            <dd className="text-ink font-mono text-[15px]">
              {ACADEMIC_COPY.creditsValue(
                CREDITS_COMPLETED,
                CREDITS_IN_PROGRESS,
              )}
            </dd>
          </div>
          <div>
            <dt className="code-type text-ink-2 text-[13px]">
              {ACADEMIC_COPY.labelCurrentTerm}
            </dt>
            <dd className="text-ink text-[15px]">
              {ACADEMIC_COPY.currentTermValue(
                ACADEMIC.currentTermLabel,
                ACADEMIC.currentTermCredits,
              )}
            </dd>
          </div>
        </dl>
      </section>

      <section className="bg-platform-2 px-lg py-xl">
        <h2 className="sign-type mb-lg text-ink text-[19px]">
          {ACADEMIC_COPY.honoursHeading}
        </h2>
        {HONOURS.map((honour) => (
          <article key={honour.name} className="mb-lg last:mb-0">
            <h3 className="text-ink text-[17px] leading-snug">{honour.name}</h3>
            <p className="text-ink-2 mt-xs font-mono text-[13px]">
              {honour.period}
            </p>
            {honour.note ? (
              <p className="measure text-ink-2 mt-xs text-[15px]">
                {honour.note}
              </p>
            ) : null}
          </article>
        ))}
      </section>

      <section className="px-lg py-xl">
        <h2 className="sign-type mb-sm text-ink text-[19px]">
          {ACADEMIC_COPY.coursesHeading}
        </h2>
        <p className="text-ink-2 mb-lg text-[15px]">
          {ACADEMIC_COPY.coursesSummary(COURSE_COUNT, CREDITS_TOTAL)}{" "}
          {ACADEMIC_COPY.coursesNote}
        </p>

        <details className="group">
          <summary className="code-type border-ink-2 px-md py-sm text-ink inline-block cursor-pointer border-2">
            {ACADEMIC_COPY.coursesToggle}
          </summary>

          <div className="mt-xl gap-xl flex flex-col">
            {TERMS.map((term) => (
              <article key={term.label}>
                <h3 className="sign-type mb-sm text-ink text-[17px]">
                  {term.label}
                  {term.note ? (
                    <span className="text-ink-2 ml-sm font-sans text-[15px] font-normal">
                      {term.note}
                    </span>
                  ) : null}
                </h3>
                <ul className="gap-sm flex flex-col">
                  {term.courses.map((course) => (
                    <li
                      key={course.name}
                      className="gap-md flex justify-between"
                    >
                      <span className="text-ink text-[15px]">
                        {course.name}
                      </span>
                      <span className="text-ink-2 shrink-0 font-mono text-[13px]">
                        {course.credits} {ACADEMIC_COPY.creditSuffix}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </details>
      </section>

      <section className="bg-platform-2 px-lg py-xl">
        <h2 className="sign-type mb-lg text-ink text-[19px]">
          {ACADEMIC_COPY.teachingHeading}
        </h2>
        {TEACHING_ROLES.map((role) => (
          <RoleEntry key={role.title} role={role} />
        ))}
        <p className="measure text-ink-2 mt-xl text-[15px] leading-relaxed">
          {TEACHING_LOAD}
        </p>
      </section>

      <section className="px-lg py-xl">
        <h2 className="sign-type mb-md text-ink text-[19px]">
          {ACADEMIC_COPY.priorSchoolHeading}
        </h2>
        <p className="text-ink text-[17px]">{PRIOR_SCHOOL.name}</p>
        <p className="text-ink-2 text-[15px]">{PRIOR_SCHOOL.track}</p>
        <p className="text-ink-2 font-mono text-[13px]">
          {PRIOR_SCHOOL.period}
        </p>
      </section>
    </>
  );
}
