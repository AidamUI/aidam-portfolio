import type { ReactNode } from "react";
import type { LineId } from "@/content/types";
import { StationBadge } from "./StationBadge";

/**
 * The site's signature element: a hard horizontal band carrying a code chip and
 * a section name, with the heavy 3px rule in the route colour that marks a
 * section boundary. Radius 0 — signs, panels and bands are never rounded.
 *
 * A station marker sits on the spine at the sign's height, reaching back into
 * the rail. It fades in with the line as it draws past.
 */
export function StationSign({
  code,
  name,
  line,
  blurb,
  as: Heading = "h2",
  meta,
}: {
  code: string;
  name: string;
  line: LineId;
  blurb?: string;
  as?: "h1" | "h2";
  meta?: ReactNode;
}) {
  const rule = line === "kerja" ? "border-line-work" : "border-line-life";
  const dot = line === "kerja" ? "bg-line-work" : "bg-line-life";

  return (
    <div className={`relative border-t-[3px] ${rule} bg-platform-2`}>
      {/* Station marker, sitting on the spine out in the rail. */}
      <span
        aria-hidden="true"
        className={`station-in absolute top-lg hidden h-[14px] w-[14px] -translate-x-1/2 rounded-marker md:block ${dot}`}
        style={{ left: "calc(var(--rail-line) - var(--rail))" }}
      />
      <div className="flex flex-wrap items-baseline gap-md px-lg py-md">
        <StationBadge code={code} line={line} />
        <Heading className="sign-type text-[22px] leading-tight text-ink">
          {name}
        </Heading>
        {blurb ? (
          <p className="measure text-[15px] text-ink-2">{blurb}</p>
        ) : null}
        {meta ? <div className="ml-auto font-mono text-[13px] text-ink-2">{meta}</div> : null}
      </div>
    </div>
  );
}
