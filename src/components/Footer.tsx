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
    <footer className="border-line-life bg-platform-2 border-t-[3px]">
      <div className="px-lg py-2xl">
        <h2 className="code-type mb-lg text-ink-2">{FOOTER.mapLabel}</h2>

        <div className="mb-2xl gap-lg flex flex-col">
          {(["kerja", "pribadi"] as const).map((lineId) => (
            <div key={lineId}>
              <p className="code-type mb-sm text-ink-2">{LINES[lineId].name}</p>
              <ul
                className={`gap-md pl-md flex flex-wrap items-center border-l-[3px] ${
                  lineId === "kerja" ? "border-line-work" : "border-line-life"
                }`}
              >
                {STATIONS.filter((s) => s.line === lineId).map((station) => (
                  <li key={station.code}>
                    <Link
                      href={station.href}
                      className="gap-sm text-ink flex items-center"
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
        <ul className="mb-2xl gap-sm flex flex-col">
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
                <span className="ml-sm text-ink-2 text-[15px]">
                  {social.note}
                </span>
              ) : null}
            </li>
          ))}
          <li>
            <a
              href={CV.href}
              download={CV.filename}
              className="text-ink underline"
            >
              {CV.label}
            </a>
          </li>
        </ul>

        <p className="text-ink-2 text-[15px]">
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
        <p className="text-ink-2 font-mono text-[13px]">
          {FOOTER.updatedPrefix}{" "}
          <time dateTime={buildDate.iso}>{buildDate.label}</time>.
        </p>
        <p className="sr-only">{SITE.name}</p>
      </div>
    </footer>
  );
}
