import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { Hero } from "@/components/Hero";
import { Scene } from "@/components/mountain/Scene";
import { RoleEntry } from "@/components/RoleEntry";
import { Section, Stack } from "@/components/Section";
import { TagList } from "@/components/StackTag";
import { STAGE_EYEBROW } from "@/content/stage";
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
 * nothing behind a "show more".
 */
export default function WorkPage() {
  return (
    <>
      <Scene stage="work" />
      <Hero eyebrow={STAGE_EYEBROW.work} title="Work">
        <p className="text-mut mt-4 max-w-prose">
          IBM, teaching, and the organisations — the long walk across open
          ground.
        </p>
      </Hero>

      <Stack>
        <Section heading="Professional">
          <div className="flex flex-col gap-8">
            {PROFESSIONAL_ROLES.map((role) => (
              <RoleEntry key={role.title} role={role} />
            ))}
          </div>
        </Section>

        <Section heading="Teaching">
          <div className="flex flex-col gap-8">
            {TEACHING_ROLES.map((role) => (
              <RoleEntry key={role.title} role={role} />
            ))}
          </div>
          <p className="text-mut mt-8 max-w-prose text-sm">{TEACHING_LOAD}</p>
        </Section>

        <Section heading="Organisational">
          <div className="flex flex-col gap-8">
            {ORG_ROLES.map((role) => (
              <RoleEntry key={role.title} role={role} />
            ))}
          </div>
        </Section>

        <Section heading={TECHTONIC_COPY.heading} blurb={TECHTONIC_COPY.blurb}>
          <TagList
            items={TECHTONIC.map((post) => ({
              key: post.href,
              node: (
                <a
                  href={post.href}
                  rel="noopener noreferrer"
                  className="text-accent font-semibold underline decoration-1 underline-offset-2 hover:opacity-80"
                >
                  {post.label}
                </a>
              ),
            }))}
          />
        </Section>

        <Section
          heading="Skills"
          blurb="Tiered strictly by evidence — every claim links to what proves it."
        >
          <div className="flex flex-col gap-10">
            {SKILL_TIERS.map((tierDef) => {
              const skills = skillsInTier(tierDef.tier);
              if (skills.length === 0) return null;

              return (
                <div key={tierDef.tier}>
                  <p className="eyebrow">{tierDef.heading}</p>
                  <p className="text-mut mt-2 mb-4 max-w-prose text-sm">
                    {tierDef.blurb}
                  </p>

                  <ul className="flex flex-col gap-3">
                    {skills.map((skill) => (
                      <li key={skill.name}>
                        {skill.tier === "used" ? (
                          <div>
                            <span className="font-semibold">{skill.name}</span>
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
                        ) : skill.tier === "learning" ? (
                          <span className="text-mut">{skill.name}</span>
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

        <Section heading="Practice">
          <p className="text-lg">
            {PRACTICE.map((item, i) => (
              <Fragment key={item}>
                {i > 0 ? <span className="text-mut"> · </span> : null}
                {item}
              </Fragment>
            ))}
          </p>
        </Section>

        <Section heading="Languages">
          <ul className="flex flex-col gap-2">
            {LANGUAGES.map((lang) => (
              <li key={lang.name}>
                <span className="font-semibold">{lang.name}</span>
                <span className="text-mut ml-2 text-sm">{lang.level}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section heading="Certifications">
          <ul className="flex flex-col gap-2">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </Section>
      </Stack>
    </>
  );
}
