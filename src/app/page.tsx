import Link from "next/link";
import { StationBadge } from "@/components/StationBadge";
import { StationSign } from "@/components/StationSign";
import { SITE } from "@/content/site";
import { SHELL } from "@/content/shell";
import { LINES, STATIONS } from "@/content/stations";

export default function HomePage() {
  return (
    <>
      <section className="px-lg pt-2xl pb-xl">
        <h1 className="hero-type measure text-ink">{SITE.name}</h1>
        <p className="measure mt-lg text-ink">{SHELL.heroLine}</p>
        <p className="measure mt-md font-mono text-[13px] text-ink-2">
          {SHELL.subLine}
        </p>
      </section>

      {/* Removed in M2, when the real home page lands. */}
      <StationSign
        code="M0"
        name={SHELL.buildNoticeTitle}
        line="pribadi"
        blurb={SHELL.buildNotice}
      />

      <StationSign code="//" name={SHELL.mapTitle} line="kerja" blurb={SHELL.mapBlurb} />

      <div className="px-lg py-xl">
        {(["kerja", "pribadi"] as const).map((lineId) => (
          <section key={lineId} className="mb-xl last:mb-0">
            <h2 className="code-type mb-md text-ink-2">{LINES[lineId].name}</h2>
            <ul
              className={`border-l-[3px] pl-lg ${
                lineId === "kerja" ? "border-line-work" : "border-line-life"
              }`}
            >
              {STATIONS.filter((s) => s.line === lineId).map((station) => (
                <li key={station.code} className="mb-lg last:mb-0">
                  <Link href={station.href} className="flex items-start gap-md">
                    <StationBadge
                      code={station.code}
                      line={station.line}
                      className="mt-[3px]"
                    />
                    <span>
                      <span className="sign-type block text-[19px] text-ink">
                        {station.name}
                      </span>
                      <span className="measure block text-[15px] text-ink-2">
                        {station.blurb}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
