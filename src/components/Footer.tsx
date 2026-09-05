import Link from "next/link";
import { CV, EMAIL, FOOTER, SOCIALS } from "@/content/site";
import { STATIONS } from "@/content/stations";
import { buildDate } from "@/lib/format";

/** Plain link lists — pages, then elsewhere, then the build date. */
export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="text-text-muted mb-4 text-sm font-semibold tracking-wide uppercase">
              {FOOTER.navHeading}
            </h2>
            <ul className="flex flex-col gap-3">
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

          <div>
            <h2 className="text-text-muted mb-4 text-sm font-semibold tracking-wide uppercase">
              {FOOTER.elsewhereHeading}
            </h2>
            <ul className="flex flex-col gap-3">
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
                    <span className="text-text-muted ml-2 text-xs">
                      {social.note}
                    </span>
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
        </div>

        <div className="border-border mt-16 border-t pt-8">
          <p className="text-text-muted text-xs">
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
          <p className="text-text-muted mt-1 text-xs">
            {FOOTER.updatedPrefix}{" "}
            <time dateTime={buildDate.iso}>{buildDate.label}</time>.
          </p>
        </div>
      </div>
    </footer>
  );
}
