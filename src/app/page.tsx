import type { Metadata } from "next";
import Link from "next/link";
import { CareerRoute } from "@/components/CareerRoute";
import { NowServing } from "@/components/NowServing";
import { PersonSchema } from "@/components/PersonSchema";
import { ProjectRow } from "@/components/ProjectRow";
import { StackTag } from "@/components/StackTag";
import { StationSign } from "@/components/StationSign";
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
 * The interchange, where both lines meet.
 *
 * prd.md §5.1 asks the hero to carry the positioning in one screen, then for a
 * dated "currently" block, then featured projects, then a contact strip. This
 * adds the connective tissue between those: who he is in his own words, the
 * four facts a recruiter is actually scanning for, and what he builds with —
 * each linking to the page that backs it up rather than asserting it here.
 *
 * Every figure on this page is one he can expand on for five minutes, which is
 * the standard prd.md §6 sets. No invented metrics.
 */
export default function HomePage() {
  const featured = PROJECTS.filter((project) => project.featured);
  const core = skillsInTier("core");

  return (
    <>
      <PersonSchema />

      <section className="px-lg pt-2xl pb-xl">
        <h1 className="hero-type text-ink">
          {/* One span per line, so the wrap count never depends on the font. */}
          {PROFILE.nameLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="measure text-ink mt-lg text-[17px] leading-relaxed">
          {PROFILE.hero}
        </p>
        <p className="measure text-ink-2 mt-md font-mono text-[13px]">
          {PROFILE.heroSub}
        </p>
      </section>

      <CareerRoute />

      <NowServing />

      {/* The four facts a recruiter scans for, each linked to its evidence. */}
      <StationSign
        code={HOME.glance.code}
        name={HOME.glance.heading}
        line="kerja"
        blurb={HOME.glance.blurb}
      />
      <section className="px-lg py-xl">
        <ul className="gap-lg grid sm:grid-cols-2">
          {PROFILE.glance.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="group block">
                <span className="sign-type text-line-work block text-[32px] leading-none">
                  {item.figure}
                </span>
                <span className="measure text-ink-2 mt-sm group-hover:text-ink block text-[15px] leading-relaxed transition-colors">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="measure text-ink-2 mt-xl text-[15px] leading-relaxed">
          {TEACHING_LOAD}
        </p>
      </section>

      <StationSign
        code={HOME.about.code}
        name={HOME.about.heading}
        line="kerja"
        blurb={HOME.about.blurb}
      />
      <section className="px-lg py-xl">
        {PROFILE.about.slice(0, 2).map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="measure text-ink mb-md text-[17px] leading-relaxed last:mb-0"
          >
            {paragraph}
          </p>
        ))}
        <p className="mt-lg">
          <Link href="/work" className="text-ink text-[15px] underline">
            {HOME.about.more}
          </Link>
        </p>
      </section>

      <StationSign
        code={HOME.featured.code}
        name={HOME.featured.heading}
        line="kerja"
        blurb={HOME.featured.blurb}
      />
      <section className="px-lg py-xl">
        {featured.map((project) => (
          <ProjectRow key={project.slug} project={project} as="h3" />
        ))}
        <p className="mt-lg">
          <Link href="/projects" className="text-ink text-[15px] underline">
            {PROJECTS_COPY.moreProjects}
          </Link>
        </p>
      </section>

      <StationSign
        code={HOME.skills.code}
        name={HOME.skills.heading}
        line="kerja"
        blurb={HOME.skills.blurb}
      />
      <section className="px-lg py-xl">
        <ul className="gap-sm flex flex-wrap">
          {core.map((skill) => (
            <li key={skill.name}>
              <StackTag name={skill.name} />
            </li>
          ))}
        </ul>
        <p className="measure text-ink-2 mt-lg text-[15px] leading-relaxed">
          {HOME.skills.note}
        </p>
        <p className="mt-md">
          <Link href="/work" className="text-ink text-[15px] underline">
            {HOME.skills.more}
          </Link>
        </p>
      </section>

      <section className="bg-platform-2 border-line-life px-lg py-xl border-t-[3px]">
        <h2 className="sign-type text-ink mb-lg text-[19px]">
          {HOME.contact.heading}
        </h2>
        <ul className="gap-sm flex flex-col">
          <li>
            <a href={EMAIL.href} className="text-ink text-[17px] underline">
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
                className="text-ink text-[17px] underline"
              >
                {social.label}
              </a>
              {social.note ? (
                <span className="text-ink-2 ml-sm text-[15px]">
                  {social.note}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
