import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Scene } from "@/components/mountain/Scene";
import { RoleEntry } from "@/components/RoleEntry";
import { Section, Stack } from "@/components/Section";
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
import { PERSONAL_PHOTOS } from "@/content/media";
import { TEACHING_LOAD, TEACHING_ROLES } from "@/content/roles";
import { SITE } from "@/content/site";
import { STAGE_EYEBROW } from "@/content/stage";
import { stationForPath } from "@/content/stations";

const station = stationForPath("/academic")!;

export const metadata: Metadata = {
  title: station.name,
  description: `${ACADEMIC.programme} at ${ACADEMIC.institution}, teaching, scholarships and the full course record, ${SITE.goesBy}`,
  alternates: { canonical: station.href },
};

/**
 * A server component on purpose.
 *
 * A native <details> drives the "show all courses" toggle with no JavaScript
 * at all — keyboard operable, announced correctly, open by default for a
 * printer or a screen reader in browse mode. Every course renders in full;
 * this is the one legitimate use of an expandable section here, since the
 * full course record is genuinely long (84+ credits across six terms) and
 * would otherwise crowd the page above the rest of the record.
 */
export default function AcademicPage() {
  return (
    <>
      <Scene stage="academic" />
      <Hero eyebrow={STAGE_EYEBROW.academic} title={station.name}>
        <p className="text-mut mt-4 max-w-prose">{station.blurb}</p>
      </Hero>

      <Stack>
        <Section heading={ACADEMIC.institution}>
          <Image
            src={PERSONAL_PHOTOS.academic.src}
            alt={PERSONAL_PHOTOS.academic.alt}
            width={PERSONAL_PHOTOS.academic.width}
            height={PERSONAL_PHOTOS.academic.height}
            className="mb-8 h-auto w-full max-w-xs rounded-2xl object-cover"
          />
          <p className="max-w-prose font-semibold">{ACADEMIC.faculty}</p>
          <p className="text-mut max-w-prose">{ACADEMIC.programme}</p>

          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-mut text-sm">
                {ACADEMIC_COPY.labelPeriod}
              </span>
              <span className="font-display text-lg font-semibold">
                {ACADEMIC.start.slice(0, 4)}–
                {ACADEMIC.expectedEndLabel.slice(-4)}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-mut text-sm">
                {ACADEMIC_COPY.labelCgpa}
              </span>
              <span className="font-display text-lg font-semibold">
                {ACADEMIC.cgpa}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-mut text-sm">
                {ACADEMIC_COPY.labelCredits}
              </span>
              <span className="font-display text-lg font-semibold">
                {ACADEMIC_COPY.creditsValue(
                  CREDITS_COMPLETED,
                  CREDITS_IN_PROGRESS,
                )}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-mut text-sm">
                {ACADEMIC_COPY.labelCurrentTerm}
              </span>
              <span className="font-display text-lg font-semibold">
                {ACADEMIC_COPY.currentTermValue(
                  ACADEMIC.currentTermLabel,
                  ACADEMIC.currentTermCredits,
                )}
              </span>
            </div>
          </div>
        </Section>

        <Section heading={ACADEMIC_COPY.honoursHeading}>
          <div className="flex flex-col gap-7">
            {HONOURS.map((honour, i) => (
              <article
                key={honour.name}
                className={i === 0 ? "" : "border-line border-t pt-7"}
              >
                <p className="text-warm font-mono text-[11px] tracking-[0.1em] uppercase">
                  {honour.period}
                </p>
                <h3 className="font-display mt-2 text-lg font-semibold">
                  {honour.name}
                </h3>
                {honour.note ? (
                  <p className="text-mut mt-2 max-w-prose">{honour.note}</p>
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
            <summary className="border-line-strong inline-block cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold">
              {ACADEMIC_COPY.coursesToggle}
            </summary>

            <div className="mt-8 flex flex-col gap-8">
              {TERMS.map((term) => (
                <article key={term.label}>
                  <div className="border-accent flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-2 pb-3">
                    <h3 className="font-display font-semibold">
                      {term.label}
                      {term.note ? (
                        <span className="text-mut ml-2 text-sm font-normal">
                          {term.note}
                        </span>
                      ) : null}
                    </h3>
                    <span className="text-warm font-mono text-[11px] tracking-[0.1em] uppercase">
                      {term.courses.reduce((sum, c) => sum + c.credits, 0)}{" "}
                      credits
                    </span>
                  </div>
                  <ul className="flex flex-col">
                    {term.courses.map((course) => (
                      <li
                        key={course.name}
                        className="border-line flex justify-between gap-4 border-b py-3 last:border-b-0"
                      >
                        <span>{course.name}</span>
                        <span className="text-mut shrink-0 font-mono text-sm tabular-nums">
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

        <Section heading={ACADEMIC_COPY.teachingHeading}>
          <div className="flex flex-col gap-8">
            {TEACHING_ROLES.map((role) => (
              <RoleEntry key={role.title} role={role} />
            ))}
          </div>
          <p className="text-mut mt-8 max-w-prose text-sm">{TEACHING_LOAD}</p>
        </Section>

        <Section heading={ACADEMIC_COPY.priorSchoolHeading}>
          <p className="font-display text-lg font-semibold">
            {PRIOR_SCHOOL.name}
          </p>
          <p className="text-mut">{PRIOR_SCHOOL.track}</p>
          <p className="text-warm font-mono text-[11px] tracking-[0.1em] uppercase">
            {PRIOR_SCHOOL.period}
          </p>
        </Section>
      </Stack>
    </>
  );
}
