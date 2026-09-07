import type { ReactNode } from "react";

/**
 * One card: the unit nearly every block of content on the site is made of.
 * Cards float on the page's ground colour rather than sitting flush against
 * each other, so `Stack` is what supplies the gap between a run of them.
 */
export function Section({
  heading,
  blurb,
  as: Heading = "h2",
  children,
}: {
  heading?: string;
  blurb?: string;
  as?: "h1" | "h2";
  children: ReactNode;
}) {
  return (
    <section className="card px-6 py-8 sm:px-12 sm:py-11 lg:px-14">
      {heading ? (
        <header className="mb-6 sm:mb-8">
          <Heading
            className={
              Heading === "h1"
                ? "text-4xl sm:text-5xl"
                : "text-2xl sm:text-[26px]"
            }
          >
            {heading}
          </Heading>
          {blurb ? <p className="text-mut mt-3 max-w-prose">{blurb}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

/** The vertical rhythm between a page's cards, under the overlapping Hero. */
export function Stack({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 pt-6 pb-16 sm:gap-7 sm:px-8 sm:pt-7 sm:pb-24">
      {children}
    </div>
  );
}
