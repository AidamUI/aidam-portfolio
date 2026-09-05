import type { ReactNode } from "react";

/**
 * The one section wrapper used on every page: a centred single-column reading
 * column with generous vertical rhythm between sections (96px desktop, 64px
 * mobile) and a heading with room to breathe below it. Consistent spacing is
 * what makes a long, content-complete page feel calm rather than dense.
 */
export function Section({
  heading,
  blurb,
  subtle = false,
  as: Heading = "h2",
  children,
}: {
  heading?: string;
  blurb?: string;
  /** A faint background tint, for visually separating a dense block. */
  subtle?: boolean;
  as?: "h1" | "h2";
  children: ReactNode;
}) {
  return (
    <section className={subtle ? "bg-bg-subtle" : undefined}>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
        {heading ? (
          <header className="mb-10">
            <Heading
              className={
                Heading === "h1"
                  ? "text-4xl font-black tracking-tight sm:text-5xl"
                  : "text-2xl font-bold sm:text-3xl"
              }
            >
              {heading}
            </Heading>
            {blurb ? (
              <p className="text-text-muted mt-3 max-w-prose">{blurb}</p>
            ) : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
