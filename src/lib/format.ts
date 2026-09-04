/**
 * Stamped once, when the page is statically generated. Every content route is
 * prerendered, so this is genuinely the build date rather than a moving clock —
 * and because it is baked into the HTML there is nothing for the client to
 * re-render and no hydration mismatch to guard against.
 *
 * The locale is pinned so the build machine's locale cannot change the output.
 */
const now = new Date();

export const buildDate = {
  iso: now.toISOString().slice(0, 10),
  label: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(now),
};

/** Formats an ISO `YYYY-MM` or `YYYY-MM-DD` as "Jun 2026". */
export function monthYear(iso: string): string {
  const [year, month] = iso.split("-");
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date(Number(year), Number(month) - 1, 15));
}
