import type { Metadata } from "next";
import Link from "next/link";
import { RoleEntry } from "@/components/RoleEntry";
import { Section } from "@/components/Section";
import { ORG_ROLES, TECHTONIC, TECHTONIC_COPY } from "@/content/orgs";
import {
  PROFESSIONAL_ROLES,
  TEACHING_LOAD,
  TEACHING_ROLES,
} from "@/content/roles";
import {
  CERTIFICATIONS,
  LANGUAGES,
  PRACTICE,
  SKILL_TIERS,
  skillsInTier,
} from "@/content/skills";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  alternates: { canonical: "/work" },
  description: `Professional and organisational experience — ${SITE.goesBy}`,
};

/**
 * Every role, every skill tier, every certification — nothing truncated,
 * nothing behind a "show more". Single column, generous spacing between
 * each block per the redesign brief.
 */
export default function WorkPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-8 sm:px-8 sm:pt-24">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Work</h1>
        <p className="text-text-muted mt-3 max-w-prose">
          IBM, teaching, and the organisations.
        </p>
      </div>

      <Section heading="Professional">
        <div className="flex flex-col gap-10">
          {PROFESSIONAL_ROLES.map((role) => (
            <RoleEntry key={role.title} role={role} />
          ))}
        </div>
      </Section>

      <Section heading="Teaching" subtle>
        <div className="flex flex-col gap-10">
          {TEACHING_ROLES.map((role) => (
            <RoleEntry key={role.title} role={role} />
          ))}
        </div>
        <p className="text-text-muted mt-10 max-w-prose text-sm">
          {TEACHING_LOAD}
        </p>
      </Section>

      <Section heading="Organisational">
        <div className="flex flex-col gap-10">
          {ORG_ROLES.map((role) => (
            <RoleEntry key={role.title} role={role} />
          ))}
        </div>
      </Section>

      <Section
        heading={TECHTONIC_COPY.heading}
        blurb={TECHTONIC_COPY.blurb}
        subtle
      >
        <ul className="flex flex-wrap gap-3">
          {TECHTONIC.map((post) => (
            <li key={post.href}>
              <a
                href={post.href}
                rel="noopener noreferrer"
                className="border-border-strong text-text-muted hover:border-accent hover:text-accent inline-block rounded-full border px-3 py-1 text-sm transition-colors"
              >
                {post.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        heading="Skills"
        blurb="Tiered strictly by evidence — every claim links to what proves it."
      >
        <div className="flex flex-col gap-12">
          {SKILL_TIERS.map((tierDef) => {
            const skills = skillsInTier(tierDef.tier);
            if (skills.length === 0) return null;

            return (
              <div key={tierDef.tier}>
                <h3 className="text-lg font-bold">{tierDef.heading}</h3>
                <p className="text-text-muted mt-1 mb-6 max-w-prose text-sm">
                  {tierDef.blurb}
                </p>

                <ul className="flex flex-col gap-4">
                  {skills.map((skill) => (
                    <li key={skill.name}>
                      {skill.tier === "used" ? (
                        <div>
                          <span className="font-medium">{skill.name}</span>
                          <ul className="mt-2 flex flex-wrap gap-3">
                            {skill.evidence.map((artifact) => (
                              <li key={artifact.href}>
                                <Link
                                  href={artifact.href}
                                  className="text-accent text-sm underline"
                                >
                                  {artifact.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <span>{skill.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section heading="Practice" subtle>
        <ul className="flex flex-wrap gap-3">
          {PRACTICE.map((item) => (
            <li
              key={item}
              className="border-border rounded-full border px-4 py-1.5"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="Languages">
        <ul className="flex flex-col gap-3">
          {LANGUAGES.map((lang) => (
            <li key={lang.name}>
              <span className="font-medium">{lang.name}</span>
              <span className="text-text-muted ml-2 text-sm">{lang.level}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="Certifications" subtle>
        <ul className="flex flex-col gap-3">
          {CERTIFICATIONS.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
