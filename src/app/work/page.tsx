import type { Metadata } from "next";
import Link from "next/link";
import { RoleEntry } from "@/components/RoleEntry";
import { StationSign } from "@/components/StationSign";
import {
  CERTIFICATIONS,
  LANGUAGES,
  PRACTICE,
  SKILL_TIERS,
  skillsInTier,
} from "@/content/skills";
import { ORG_ROLES, TECHTONIC, TECHTONIC_COPY } from "@/content/orgs";
import {
  PROFESSIONAL_ROLES,
  TEACHING_LOAD,
  TEACHING_ROLES,
} from "@/content/roles";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  alternates: { canonical: "/work" },
  description: `Professional and organisational experience — ${SITE.goesBy}`,
};

export default function WorkPage() {
  return (
    <>
      <StationSign
        code="W1"
        name="Work"
        line="kerja"
        blurb="IBM, teaching, and the organisations"
        as="h1"
      />

      {/* Professional roles */}
      <section className="px-lg py-xl">
        <h2 className="code-type mb-lg text-ink-2 text-[15px]">Professional</h2>
        {PROFESSIONAL_ROLES.map((role, i) => (
          <RoleEntry key={i} role={role} />
        ))}
      </section>

      {/* Teaching roles */}
      <section className="bg-platform-2 px-lg py-xl">
        <h2 className="code-type mb-lg text-ink-2 text-[15px]">Teaching</h2>
        {TEACHING_ROLES.map((role, i) => (
          <RoleEntry key={i} role={role} />
        ))}
        <p className="measure text-ink-2 mt-xl text-[15px] leading-relaxed">
          {TEACHING_LOAD}
        </p>
      </section>

      {/* Organisational roles */}
      <section className="px-lg py-xl">
        <h2 className="code-type mb-lg text-ink-2 text-[15px]">
          Organisational
        </h2>
        {ORG_ROLES.map((role, i) => (
          <RoleEntry key={i} role={role} />
        ))}
      </section>

      {/* TechTonic series */}
      <section className="bg-platform-2 px-lg py-xl">
        <h3 className="sign-type mb-md text-ink text-[19px]">
          {TECHTONIC_COPY.heading}
        </h3>
        <p className="measure text-ink-2 mb-lg text-[15px] leading-relaxed">
          {TECHTONIC_COPY.blurb}
        </p>
        <ul className="gap-sm flex flex-wrap">
          {TECHTONIC.map((post, i) => (
            <li key={i}>
              <a
                href={post.href}
                rel="noopener noreferrer"
                className="text-ink font-mono text-[13px] underline"
              >
                {post.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <StationSign
        code="W1.1"
        name="Skills"
        line="kerja"
        blurb="Tiered strictly by evidence"
      />

      {SKILL_TIERS.map((tierDef) => {
        const skills = skillsInTier(tierDef.tier);
        if (skills.length === 0) return null;

        return (
          <section key={tierDef.tier} className="px-lg py-xl">
            <h3 className="sign-type mb-sm text-ink text-[19px]">
              {tierDef.heading}
            </h3>
            <p className="measure text-ink-2 mb-lg text-[15px]">
              {tierDef.blurb}
            </p>

            <ul className="gap-md flex flex-wrap">
              {skills.map((skill, i) => (
                <li key={i}>
                  {skill.tier === "used" ? (
                    <div>
                      <span className="text-ink text-[17px]">{skill.name}</span>
                      <ul className="mt-xs gap-sm flex flex-wrap">
                        {skill.evidence.map((artifact, j) => (
                          <li key={j}>
                            <Link
                              href={artifact.href}
                              className="text-ink-2 font-mono text-[13px] underline"
                            >
                              {artifact.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <span className="text-ink text-[17px]">{skill.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {/* Practice */}
      <section className="bg-platform-2 px-lg py-xl">
        <h3 className="sign-type mb-lg text-ink text-[19px]">Practice</h3>
        <ul className="gap-md flex flex-wrap">
          {PRACTICE.map((item, i) => (
            <li key={i} className="text-ink text-[17px]">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Languages */}
      <section className="px-lg py-xl">
        <h3 className="sign-type mb-lg text-ink text-[19px]">Languages</h3>
        <ul className="gap-md flex flex-col">
          {LANGUAGES.map((lang, i) => (
            <li key={i}>
              <span className="text-ink text-[17px]">{lang.name}</span>
              <span className="text-ink-2 ml-sm text-[15px]">{lang.level}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Certifications */}
      <section className="bg-platform-2 px-lg py-xl">
        <h3 className="sign-type mb-lg text-ink text-[19px]">Certifications</h3>
        <ul className="gap-sm flex flex-col">
          {CERTIFICATIONS.map((cert, i) => (
            <li key={i} className="text-ink text-[15px]">
              {cert}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
