import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StationSign } from "@/components/StationSign";
import { PROJECTS, projectBySlug } from "@/content/projects";
import { isConfidential } from "@/content/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.name,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    notFound();
  }

  const confidential = isConfidential(project);

  return (
    <>
      <StationSign
        code={project.code}
        name={project.name}
        line="kerja"
        blurb={project.tagline}
      />

      <article className="px-lg py-xl">
        {/* Metadata */}
        <div className="mb-xl gap-md flex flex-wrap items-baseline">
          <span className="code-type text-ink-2 text-[13px]">
            {project.status}
          </span>
          <span className="text-ink-2 font-mono text-[13px]">
            {project.year}
          </span>
        </div>

        {/* Role */}
        <section className="mb-2xl">
          <h2 className="sign-type mb-sm text-ink text-[19px]">My role</h2>
          <p className="measure text-ink text-[17px] leading-relaxed">
            {project.role}
          </p>
        </section>

        {/* Problem */}
        <section className="mb-2xl">
          <h2 className="sign-type mb-sm text-ink text-[19px]">Problem</h2>
          <p className="measure text-ink text-[17px] leading-relaxed">
            {project.problem}
          </p>
        </section>

        {/* What it does */}
        <section className="mb-2xl">
          <h2 className="sign-type mb-sm text-ink text-[19px]">
            What it does
          </h2>
          <p className="measure text-ink text-[17px] leading-relaxed">
            {project.what}
          </p>
        </section>

        {/* Confidential notice */}
        {confidential ? (
          <div className="bg-platform-2 border-marker mb-2xl border-l-[4px] p-lg">
            <p className="measure text-ink-2 text-[15px] leading-relaxed">
              {project.withheldNote}
            </p>
          </div>
        ) : (
          <>
            {/* Build */}
            {project.build ? (
              <section className="mb-2xl">
                <h2 className="sign-type mb-sm text-ink text-[19px]">Build</h2>
                <p className="measure text-ink text-[17px] leading-relaxed">
                  {project.build}
                </p>
              </section>
            ) : null}

            {/* Outcome */}
            {project.outcome ? (
              <section className="mb-2xl">
                <h2 className="sign-type mb-sm text-ink text-[19px]">
                  Outcome
                </h2>
                <p className="measure text-ink text-[17px] leading-relaxed">
                  {project.outcome}
                </p>
              </section>
            ) : null}

            {/* Stack */}
            {project.stack && project.stack.length > 0 ? (
              <section className="mb-2xl">
                <h2 className="sign-type mb-sm text-ink text-[19px]">Stack</h2>
                <ul className="gap-md flex flex-wrap">
                  {project.stack.map((tech, i) => (
                    <li key={i} className="text-ink font-mono text-[15px]">
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Links */}
            {project.links && project.links.length > 0 ? (
              <section className="mb-2xl">
                <h2 className="sign-type mb-sm text-ink text-[19px]">Links</h2>
                <ul className="gap-sm flex flex-col">
                  {project.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-ink text-[17px] underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </>
        )}

        {/* Back link */}
        <div className="border-rule mt-2xl border-t pt-lg">
          <Link href="/projects" className="text-ink-2 text-[15px] underline">
            ← All projects
          </Link>
        </div>
      </article>
    </>
  );
}

// Made with Bob
