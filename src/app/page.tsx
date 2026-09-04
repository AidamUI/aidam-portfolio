import Link from "next/link";
import { CareerRoute } from "@/components/CareerRoute";
import { NowServing } from "@/components/NowServing";
import { ProjectBand } from "@/components/ProjectBand";
import { StationSign } from "@/components/StationSign";
import { PROFILE } from "@/content/profile";
import { PROJECTS } from "@/content/projects";
import { EMAIL, SOCIALS } from "@/content/site";

export default function HomePage() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="px-lg pt-2xl pb-xl">
        <h1 className="hero-type measure text-ink">{PROFILE.name}</h1>
        <p className="measure mt-lg text-ink text-[17px] leading-relaxed">
          {PROFILE.hero}
        </p>
        <p className="measure mt-md text-ink-2 font-mono text-[13px]">
          {PROFILE.heroSub}
        </p>
      </section>

      {/* Career timeline */}
      <CareerRoute />

      {/* Now serving */}
      <NowServing />

      {/* Featured projects */}
      <StationSign
        code="P1"
        name="Featured projects"
        line="kerja"
        blurb="Three things worth looking at"
      />
      <div className="pb-xl">
        {featuredProjects.map((project) => (
          <ProjectBand key={project.slug} project={project} featured />
        ))}
      </div>

      {/* Contact strip */}
      <section className="bg-platform-2 border-line-life border-t-[3px] px-lg py-xl">
        <h2 className="sign-type mb-lg text-ink text-[19px]">Elsewhere</h2>
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
                <span className="ml-sm text-ink-2 text-[15px]">
                  {social.note}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-lg text-ink-2 text-[15px]">
          Or explore the{" "}
          <Link href="/work" className="underline">
            work
          </Link>
          ,{" "}
          <Link href="/academic" className="underline">
            academic
          </Link>
          , and{" "}
          <Link href="/projects" className="underline">
            projects
          </Link>{" "}
          pages.
        </p>
      </section>
    </>
  );
}

// Made with Bob
