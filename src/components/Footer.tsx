import Link from "next/link";
import { CV, EMAIL, FOOTER, SITE, SOCIALS } from "@/content/site";
import { LINES, STATIONS } from "@/content/stations";
import { buildDate } from "@/lib/format";
import { StationBadge } from "./StationBadge";

/**
 * The route diagram in miniature, then links, then the build date.
 *
 * The map is drawn as one strip per line rather than a single strip of all five
 * stations: at 320px a five-station horizontal run either wraps (breaking the
 * line it is drawn on) or scrolls (hiding half the map). Two short lines are
 * both truthful to the two-line system and legible on the narrowest target.
 */
export function Footer() {
  return (
    <footer className="border-t-[3px] border-line-life bg-platform-2">
      <div className="px-lg py-2xl">
        <h2 className="code-type mb-lg text-ink-2">{FOOTER.mapLabel}</h2>

        <div className="mb-2xl flex flex-col gap-lg">
          {(["kerja", "pribadi"] as const).map((lineId) => (
            <div key={lineId}>
              <p className="code-type mb-sm text-ink-2">{LINES[lineId].name}</p>
              <ul
                className={`flex flex-wrap items-center gap-md border-l-[3px] pl-md ${
                  lineId === "kerja" ? "border-line-work" : "border-line-life"
                }`}
              >
                {STATIONS.filter((s) => s.line === lineId).map((station) => (
                  <li key={station.code}>
                    <Link
                      href={station.href}
                      className="flex items-center gap-sm text-ink"
                    >
                      <StationBadge code={station.code} line={station.line} />
                      <span className="sign-type text-[15px]">
                        {station.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="code-type mb-lg text-ink-2">Elsewhere</h2>
        <ul className="mb-2xl flex flex-col gap-sm">
          <li>
            <a href={EMAIL.href} className="text-ink underline">
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
                className="text-ink underline"
              >
                {social.label}
              </a>
              {social.note ? (
                <span className="ml-sm text-[15px] text-ink-2">
                  {social.note}
                </span>
              ) : null}
            </li>
          ))}
          <li>
            <a href={CV.href} download={CV.filename} className="text-ink underline">
              {CV.label}
            </a>
          </li>
        </ul>

        <p className="text-[15px] text-ink-2">
          {FOOTER.builtWith}{" "}
          <a
            href={FOOTER.sourceHref}
            rel="noopener noreferrer"
            className="underline"
          >
            {FOOTER.sourceLabel}
          </a>
          .
        </p>
        <p className="font-mono text-[13px] text-ink-2">
          {FOOTER.updatedPrefix} <time dateTime={buildDate.iso}>{buildDate.label}</time>.
        </p>
        <p className="sr-only">{SITE.name}</p>
      </div>
    </footer>
  );
}
