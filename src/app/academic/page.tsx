"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { RoleEntry } from "@/components/RoleEntry";
import { StationSign } from "@/components/StationSign";
import {
  ACADEMIC,
  ACADEMIC_COPY,
  COURSE_COUNT,
  CREDITS_COMPLETED,
  CREDITS_IN_PROGRESS,
  HONOURS,
  PRIOR_SCHOOL,
  TERMS,
} from "@/content/academic";
import { TEACHING_LOAD, TEACHING_ROLES } from "@/content/roles";

export default function AcademicPage() {
  const [showAllCourses, setShowAllCourses] = useState(false);

  return (
    <>
      <StationSign
        code="A1"
        name="Academic"
        line="kerja"
        blurb="Degree, coursework, scholarships"
      />

      {/* Degree info */}
      <section className="px-lg py-xl">
        <h2 className="sign-type mb-md text-ink text-[22px]">
          {ACADEMIC.institution}
        </h2>
        <p className="text-ink text-[17px]">{ACADEMIC.faculty}</p>
        <p className="text-ink-2 text-[17px]">{ACADEMIC.programme}</p>

        <dl className="mt-lg gap-md flex flex-col">
          <div>
            <dt className="code-type text-ink-2 text-[13px]">Period</dt>
            <dd className="text-ink font-mono text-[15px]">
              {ACADEMIC.start.slice(0, 4)} – {ACADEMIC.expectedEndLabel}
            </dd>
          </div>
          <div>
            <dt className="code-type text-ink-2 text-[13px]">CGPA</dt>
            <dd className="text-ink font-mono text-[17px]">{ACADEMIC.cgpa}</dd>
          </div>
          <div>
            <dt className="code-type text-ink-2 text-[13px]">Credits</dt>
            <dd className="text-ink font-mono text-[15px]">
              {CREDITS_COMPLETED} completed, {CREDITS_IN_PROGRESS} in progress
            </dd>
          </div>
          <div>
            <dt className="code-type text-ink-2 text-[13px]">Current term</dt>
            <dd className="text-ink text-[15px]">
              {ACADEMIC.currentTermLabel} — {ACADEMIC.currentTermCredits}{" "}
              credits
            </dd>
          </div>
        </dl>
      </section>

      {/* Honours */}
      <section className="bg-platform-2 px-lg py-xl">
        <h2 className="sign-type mb-lg text-ink text-[19px]">
          Scholarships and honours
        </h2>
        {HONOURS.map((honour, i) => (
          <article key={i} className="mb-lg last:mb-0">
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

      {/* Course record */}
      <section className="px-lg py-xl">
        <h2 className="sign-type mb-sm text-ink text-[19px]">
          {ACADEMIC_COPY.coursesHeading}
        </h2>
        <p className="text-ink-2 mb-lg text-[15px]">
          {COURSE_COUNT} courses, {CREDITS_COMPLETED + CREDITS_IN_PROGRESS}{" "}
          credits. {ACADEMIC_COPY.coursesNote}
        </p>

        {!showAllCourses ? (
          <button
            onClick={() => setShowAllCourses(true)}
            className="border-ink-2 px-md py-sm text-ink border-2 transition-colors hover:bg-platform-2"
          >
            {ACADEMIC_COPY.coursesToggle}
          </button>
        ) : (
          <div className="gap-xl flex flex-col">
            {TERMS.map((term, i) => (
              <article key={i}>
                <h3 className="sign-type mb-sm text-ink text-[17px]">
                  {term.label}
                  {term.note ? (
                    <span className="text-ink-2 ml-sm font-sans text-[15px] font-normal">
                      {term.note}
                    </span>
                  ) : null}
                </h3>
                <ul className="gap-sm flex flex-col">
                  {term.courses.map((course, j) => (
                    <li key={j} className="flex justify-between gap-md">
                      <span className="text-ink text-[15px]">
                        {course.name}
                      </span>
                      <span className="text-ink-2 shrink-0 font-mono text-[13px]">
                        {course.credits} cr
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Teaching */}
      <section className="bg-platform-2 px-lg py-xl">
        <h2 className="sign-type mb-lg text-ink text-[19px]">Teaching</h2>
        {TEACHING_ROLES.map((role, i) => (
          <RoleEntry key={i} role={role} />
        ))}
        <p className="measure text-ink-2 mt-xl text-[15px] leading-relaxed">
          {TEACHING_LOAD}
        </p>
      </section>

      {/* Prior school */}
      <section className="px-lg py-xl">
        <h2 className="sign-type mb-md text-ink text-[19px]">Prior school</h2>
        <p className="text-ink text-[17px]">{PRIOR_SCHOOL.name}</p>
        <p className="text-ink-2 text-[15px]">{PRIOR_SCHOOL.track}</p>
        <p className="text-ink-2 font-mono text-[13px]">
          {PRIOR_SCHOOL.period}
        </p>
      </section>
    </>
  );
}

// Made with Bob
