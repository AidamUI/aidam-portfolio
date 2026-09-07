import Image from "next/image";
import type { ReactNode } from "react";

type HeroImage = { src: string; alt: string; width: number; height: number };

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
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  as?: "h1" | "h2";
  image?: HeroImage;
  children?: ReactNode;
}) {
  const heading = (
    <>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading
        className={
          eyebrow ? "mt-4 text-4xl sm:text-[42px]" : "text-4xl sm:text-5xl"
        }
      >
        {title}
      </Heading>
      {children}
    </>
  );

  return (
    <div className="relative z-10 mx-auto -mt-14 max-w-[1180px] px-6 sm:-mt-20 sm:px-8">
      <div className="card px-7 py-10 sm:px-12 sm:py-12 lg:px-14">
        {image ? (
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              className="h-24 w-24 shrink-0 rounded-full object-cover sm:h-28 sm:w-28"
            />
            <div className="min-w-0">{heading}</div>
          </div>
        ) : (
          heading
        )}
      </div>
    </div>
  );
}
