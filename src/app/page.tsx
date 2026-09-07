import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Hero } from "@/components/Hero";
import { CareerRoute } from "@/components/CareerRoute";
import { Scene } from "@/components/mountain/Scene";
import { NowServing } from "@/components/NowServing";
import { PersonSchema } from "@/components/PersonSchema";
import { ProjectRow } from "@/components/ProjectRow";
import { Section, Stack } from "@/components/Section";
import { StackTag } from "@/components/StackTag";
import { HOME } from "@/content/home";
import { PERSONAL_PHOTOS } from "@/content/media";
import { NOW } from "@/content/now";
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
 * The home page — the trailhead. prd.md §5.1 asks the hero to carry the
 * positioning in one screen, then a dated "currently" block, then featured
 * projects, then a contact strip. This adds the connective tissue between
 * those: who he is in his own words, the facts a recruiter is scanning for,
 * and what he builds with — each linking to the page that backs it up.
 *
 * Every figure on this page is one he can expand on for five minutes
 * (prd.md §6). No invented metrics.
 */
export default function HomePage() {
  const featured = PROJECTS.filter((project) => project.featured);
  const core = skillsInTier("core");

  return (
    <>
      <PersonSchema />
      <Scene stage="home" />

      <Hero
        eyebrow={`${PROFILE.name} · goes by ${PROFILE.goesBy}`}
        title={PROFILE.hero}
        image={PERSONAL_PHOTOS.headshot}
      >
        <p className="text-mut mt-6 max-w-prose">{PROFILE.heroSub}</p>
      </Hero>

      <Stack>
        <Section heading="Timeline">
          <CareerRoute />
        </Section>

        <Section heading={NOW.heading}>
          <NowServing />
        </Section>

        <Section heading={HOME.glance.heading}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {PROFILE.glance.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="card flex flex-col gap-3 px-5 py-6 transition-opacity hover:opacity-90"
              >
                <span className="font-display text-3xl font-semibold tracking-tight">
                  {item.figure}
                </span>
                <span className="text-mut text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
          <p className="text-mut mt-8 max-w-prose text-sm">{TEACHING_LOAD}</p>
        </Section>

        <Section heading={HOME.about.heading}>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            <Image
              src={PERSONAL_PHOTOS.about.src}
              alt={PERSONAL_PHOTOS.about.alt}
              width={PERSONAL_PHOTOS.about.width}
              height={PERSONAL_PHOTOS.about.height}
              className="h-auto w-full max-w-[240px] shrink-0 rounded-2xl object-cover sm:w-56"
            />
            <div className="flex flex-col gap-6">
              {PROFILE.about.slice(0, 2).map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="max-w-prose">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <p className="mt-8">
            <Link href="/work" className="text-accent font-semibold underline">
              {HOME.about.more}
            </Link>
          </p>
        </Section>

        <Section heading={HOME.featured.heading}>
          <div className="flex flex-col gap-7">
            {featured.map((project) => (
              <ProjectRow key={project.slug} project={project} as="h3" />
            ))}
          </div>
          <p className="mt-7">
            <Link
              href="/projects"
              className="text-accent font-semibold underline"
            >
              {PROJECTS_COPY.moreProjects}
            </Link>
          </p>
        </Section>

        <Section heading={HOME.skills.heading}>
          <p className="text-lg">
            {core.map((skill, i) => (
              <Fragment key={skill.name}>
                {i > 0 ? <span className="text-mut"> · </span> : null}
                <StackTag name={skill.name} />
              </Fragment>
            ))}
          </p>
          <p className="mt-4">
            <Link href="/work" className="text-accent font-semibold underline">
              {HOME.skills.more}
            </Link>
          </p>
        </Section>

        <Section heading={HOME.contact.heading}>
          <ul className="flex flex-col gap-3">
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
                  <span className="text-mut ml-2 text-sm">{social.note}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      </Stack>
    </>
  );
}
