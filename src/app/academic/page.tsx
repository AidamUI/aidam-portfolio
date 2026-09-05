import type { Metadata } from "next";
import { RoleEntry } from "@/components/RoleEntry";
import { Section } from "@/components/Section";
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
 * A native <details> drives the "show all courses" toggle with no JavaScript
 * at all — keyboard operable, announced correctly, open by default for a
 * printer or a screen reader in browse mode. Every course renders in full;
 * this is the one legitimate use of an expandable section per the redesign
 * brief, since the full course record is genuinely long (84+ credits across
 * six terms) and would otherwise crowd the page above the rest of the record.
 */
export default function AcademicPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-8 sm:px-8 sm:pt-24">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          {station.name}
        </h1>
        <p className="text-text-muted mt-3 max-w-prose">{station.blurb}</p>
      </div>

      <Section heading={ACADEMIC.institution}>
        <p className="max-w-prose">{ACADEMIC.faculty}</p>
        <p className="text-text-muted max-w-prose">{ACADEMIC.programme}</p>

        <dl className="mt-10 flex flex-col gap-6">
          <div>
            <dt className="text-text-muted text-sm font-semibold">
              {ACADEMIC_COPY.labelPeriod}
            </dt>
            <dd className="mt-1 text-lg font-medium">
              {ACADEMIC.start.slice(0, 4)}–{ACADEMIC.expectedEndLabel.slice(-4)}
            </dd>
          </div>
          <div>
            <dt className="text-text-muted text-sm font-semibold">
              {ACADEMIC_COPY.labelCgpa}
            </dt>
            <dd className="mt-1 text-lg font-medium">{ACADEMIC.cgpa}</dd>
          </div>
          <div>
            <dt className="text-text-muted text-sm font-semibold">
              {ACADEMIC_COPY.labelCredits}
            </dt>
            <dd className="mt-1 text-lg font-medium">
              {ACADEMIC_COPY.creditsValue(
                CREDITS_COMPLETED,
                CREDITS_IN_PROGRESS,
              )}
            </dd>
          </div>
          <div>
            <dt className="text-text-muted text-sm font-semibold">
              {ACADEMIC_COPY.labelCurrentTerm}
            </dt>
            <dd className="mt-1 text-lg font-medium">
              {ACADEMIC_COPY.currentTermValue(
                ACADEMIC.currentTermLabel,
                ACADEMIC.currentTermCredits,
              )}
            </dd>
          </div>
        </dl>
      </Section>

      <Section heading={ACADEMIC_COPY.honoursHeading} subtle>
        <div className="flex flex-col gap-8">
          {HONOURS.map((honour) => (
            <article key={honour.name}>
              <h3 className="text-lg font-bold">{honour.name}</h3>
              <p className="text-text-muted mt-1 font-mono text-sm">
                {honour.period}
              </p>
              {honour.note ? (
                <p className="text-text-muted mt-1 max-w-prose">
                  {honour.note}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      <Section
        heading={ACADEMIC_COPY.coursesHeading}
        blurb={`${ACADEMIC_COPY.coursesSummary(COURSE_COUNT, CREDITS_TOTAL)} ${ACADEMIC_COPY.coursesNote}`}
      >
        <details>
          <summary className="border-border-strong inline-block cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold">
            {ACADEMIC_COPY.coursesToggle}
          </summary>

          <div className="mt-10 flex flex-col gap-10">
            {TERMS.map((term) => (
              <article key={term.label}>
                <h3 className="text-lg font-bold">
                  {term.label}
                  {term.note ? (
                    <span className="text-text-muted ml-2 text-sm font-normal">
                      {term.note}
                    </span>
                  ) : null}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {term.courses.map((course) => (
                    <li
                      key={course.name}
                      className="flex justify-between gap-4"
                    >
                      <span>{course.name}</span>
                      <span className="text-text-muted shrink-0 font-mono text-sm">
                        {course.credits} {ACADEMIC_COPY.creditSuffix}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </details>
      </Section>

      <Section heading={ACADEMIC_COPY.teachingHeading} subtle>
        <div className="flex flex-col gap-10">
          {TEACHING_ROLES.map((role) => (
            <RoleEntry key={role.title} role={role} />
          ))}
        </div>
        <p className="text-text-muted mt-10 max-w-prose text-sm">
          {TEACHING_LOAD}
        </p>
      </Section>

      <Section heading={ACADEMIC_COPY.priorSchoolHeading}>
        <p className="text-lg font-medium">{PRIOR_SCHOOL.name}</p>
        <p className="text-text-muted">{PRIOR_SCHOOL.track}</p>
        <p className="text-text-muted font-mono text-sm">
          {PRIOR_SCHOOL.period}
        </p>
      </Section>
    </>
  );
}
