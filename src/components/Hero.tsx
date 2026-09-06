import type { ReactNode } from "react";

/**
 * The page title card: it sits directly under a `Scene` banner and overlaps
 * it with a negative top margin, so the sky-to-ground illustration reads as
 * one continuous backdrop the content rises out of, rather than a hero image
 * followed by an unrelated page.
 */
export function Hero({
  eyebrow,
  title,
  as: Heading = "h1",
  children,
}: {
  eyebrow?: string;
  title: string;
  as?: "h1" | "h2";
  children?: ReactNode;
}) {
  return (
    <div className="relative z-10 mx-auto -mt-14 max-w-[1180px] px-6 sm:-mt-20 sm:px-8">
      <div className="card px-7 py-10 sm:px-12 sm:py-12 lg:px-14">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Heading
          className={
            eyebrow ? "mt-4 text-4xl sm:text-[42px]" : "text-4xl sm:text-5xl"
          }
        >
          {title}
        </Heading>
        {children}
      </div>
    </div>
  );
}
