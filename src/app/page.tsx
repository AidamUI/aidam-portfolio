import type { Metadata } from "next";
import Link from "next/link";
import { CareerRoute } from "@/components/CareerRoute";
import { NowServing } from "@/components/NowServing";
import { PersonSchema } from "@/components/PersonSchema";
import { ProjectRow } from "@/components/ProjectRow";
import { Section } from "@/components/Section";
import { StackTag } from "@/components/StackTag";
import { HOME } from "@/content/home";
import { PROFILE } from "@/content/profile";
import { PROJECTS, PROJECTS_COPY } from "@/content/projects";
import { TEACHING_LOAD } from "@/content/roles";
import { EMAIL, SOCIALS } from "@/content/site";
import { skillsInTier } from "@/content/skills";

// Canonical lives here, not on the layout, so no other route can inherit it.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * The home page. prd.md §5.1 asks the hero to carry the positioning in one
 * screen, then a dated "currently" block, then featured projects, then a
 * contact strip. This adds the connective tissue between those: who he is in
 * his own words, the facts a recruiter is scanning for, and what he builds
 * with — each linking to the page that backs it up.
 *
 * Every figure on this page is one he can expand on for five minutes
 * (prd.md §6). No invented metrics.
 *
 * Single column throughout, generous spacing between every block — the
 * redesign favours a long, calm page over cramming everything above the fold.
 */
export default function HomePage() {
  const featured = PROJECTS.filter((project) => project.featured);
  const core = skillsInTier("core");

  return (
    <>
      <PersonSchema />

      <div className="mx-auto max-w-3xl px-6 pt-16 pb-8 sm:px-8 sm:pt-24">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          {PROFILE.name}
        </h1>
        <p className="mt-6 max-w-prose text-lg">{PROFILE.hero}</p>
        <p className="text-text-muted mt-4 font-mono text-sm">
          {PROFILE.heroSub}
        </p>
      </div>

      <CareerRoute />
      <NowServing />

      <Section heading={HOME.glance.heading} blurb={HOME.glance.blurb}>
        <ul className="flex flex-col gap-8">
          {PROFILE.glance.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="group block">
                <span className="text-accent block text-3xl leading-none font-black">
                  {item.figure}
                </span>
                <span className="text-text-muted group-hover:text-text mt-2 block max-w-prose transition-colors">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-text-muted mt-10 max-w-prose text-sm">
          {TEACHING_LOAD}
        </p>
      </Section>

      <Section heading={HOME.about.heading} blurb={HOME.about.blurb} subtle>
        <div className="flex flex-col gap-6">
          {PROFILE.about.slice(0, 2).map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="max-w-prose">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-8">
          <Link href="/work" className="text-accent font-medium underline">
            {HOME.about.more}
          </Link>
        </p>
      </Section>

      <Section heading={HOME.featured.heading} blurb={HOME.featured.blurb}>
        <div className="flex flex-col gap-6">
          {featured.map((project) => (
            <ProjectRow key={project.slug} project={project} as="h3" />
          ))}
        </div>
        <p className="mt-8">
          <Link href="/projects" className="text-accent font-medium underline">
            {PROJECTS_COPY.moreProjects}
          </Link>
        </p>
      </Section>

      <Section heading={HOME.skills.heading} blurb={HOME.skills.blurb} subtle>
        <ul className="flex flex-wrap gap-3">
          {core.map((skill) => (
            <li key={skill.name}>
              <StackTag name={skill.name} />
            </li>
          ))}
        </ul>
        <p className="text-text-muted mt-8 max-w-prose text-sm">
          {HOME.skills.note}
        </p>
        <p className="mt-4">
          <Link href="/work" className="text-accent font-medium underline">
            {HOME.skills.more}
          </Link>
        </p>
      </Section>

      <Section heading={HOME.contact.heading}>
        <ul className="flex flex-col gap-4">
          <li>
            <a
              href={EMAIL.href}
              className="hover:text-accent text-lg transition-colors"
            >
              {/* Split so the rendered HTML holds no contiguous address. */}
              <span>{EMAIL.user}</span>
              <span>@</span>
              <span>{EMAIL.domain}</span>
            </a>
          </li>
          {SOCIALS.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                rel="me noopener noreferrer"
                className="hover:text-accent text-lg transition-colors"
              >
                {social.label}
              </a>
              {social.note ? (
                <span className="text-text-muted ml-2 text-sm">
                  {social.note}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
