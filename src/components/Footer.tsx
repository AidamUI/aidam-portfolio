import Link from "next/link";
import { CV, EMAIL, FOOTER, SOCIALS } from "@/content/site";
import { STATIONS } from "@/content/stations";
import { buildDate } from "@/lib/format";

/** Three plain link columns: pages, elsewhere, and this build. */
export function Footer() {
  return (
    <footer className="bg-card border-line border-t">
      <div className="mx-auto max-w-[940px] px-6 py-13 sm:px-8 sm:py-15">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <h2 className="eyebrow">{FOOTER.navHeading}</h2>
            <ul className="flex flex-col items-start gap-2">
              {STATIONS.map((station) => (
                <li key={station.href}>
                  <Link
                    href={station.href}
                    className="hover:text-accent text-sm transition-colors"
                  >
                    {station.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="eyebrow">{FOOTER.elsewhereHeading}</h2>
            <ul className="flex flex-col items-start gap-2">
              <li>
                <a
                  href={EMAIL.href}
                  className="hover:text-accent text-sm transition-colors"
                >
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
                    className="hover:text-accent text-sm transition-colors"
                  >
                    {social.label}
                  </a>
                  {social.note ? (
                    <span className="text-mut ml-2 text-xs">{social.note}</span>
                  ) : null}
                </li>
              ))}
              {CV.available ? (
                <li>
                  <a
                    href={CV.href}
                    download={CV.filename}
                    className="hover:text-accent text-sm transition-colors"
                  >
                    {CV.label}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="eyebrow">This build</h2>
            <p className="text-mut max-w-[34ch] text-sm">
              {FOOTER.builtWith}{" "}
              <a
                href={FOOTER.sourceHref}
                rel="noopener noreferrer"
                className="hover:text-accent underline transition-colors"
              >
                {FOOTER.sourceLabel}
              </a>
              .
            </p>
            <p className="text-mut text-sm">
              {FOOTER.updatedPrefix}{" "}
              <time dateTime={buildDate.iso}>{buildDate.label}</time>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
