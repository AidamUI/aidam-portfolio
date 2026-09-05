import { ImageResponse } from "next/og";

/**
 * Share cards: clean and typographic, matching the redesigned site — a white
 * card, a single accent bar, the title in heavy Lato, one quiet line beneath.
 *
 * Colours are repeated as literals here on purpose. Satori resolves no CSS
 * custom properties and never loads globals.css, so `var(--accent)` would
 * silently render as nothing. These are the light-mode token values from
 * globals.css; if the tokens ever change, they change here too.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#FFFFFF";
const TEXT = "#16181D";
const TEXT_MUTED = "#5B6270";
const ACCENT = "#2F5CE0";

/**
 * Satori needs real font data — it cannot use a system font stack, and it
 * does not read woff2, which is the only format next/font keeps. So the TTF
 * is fetched from Google's static host and held for the lifetime of the
 * lambda. Vercel caches the generated image, so this runs once per cold
 * start at most.
 *
 * A failure here must not take the card down: `loadLato` returns null and the
 * caller falls back to Satori's default face rather than throwing a 500 at
 * whatever just tried to unfurl the link.
 */
const cache = new Map<string, ArrayBuffer>();

async function loadLato(weight: 400 | 900): Promise<ArrayBuffer | null> {
  const key = String(weight);
  if (cache.has(key)) return cache.get(key)!;
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Lato:wght@${weight}&display=swap`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((response) => response.text());

    const url = css.match(/src:\s*url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) return null;

    const data = await fetch(url).then((response) => response.arrayBuffer());
    cache.set(key, data);
    return data;
  } catch {
    return null;
  }
}

export type CardOptions = {
  /** The big line. */
  title: string;
  /** One quiet line under it. */
  subtitle?: string;
  /** Small line at the foot, e.g. the site name or a project's status. */
  footer?: string;
};

export async function renderCard({
  title,
  subtitle,
  footer,
}: CardOptions): Promise<ImageResponse> {
  const [regular, black] = await Promise.all([loadLato(400), loadLato(900)]);
  const hasFont = Boolean(regular && black);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: BG,
        color: TEXT,
        fontFamily: hasFont ? "Lato" : "sans-serif",
      }}
    >
      <div style={{ display: "flex", height: 10, backgroundColor: ACCENT }} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: title.length > 24 ? 72 : 92,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                marginTop: 24,
                fontSize: 32,
                fontWeight: 400,
                color: TEXT_MUTED,
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", fontSize: 24, color: TEXT_MUTED }}>
          {footer ?? ""}
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: hasFont
        ? [
            { name: "Lato", data: regular!, weight: 400, style: "normal" },
            { name: "Lato", data: black!, weight: 900, style: "normal" },
          ]
        : undefined,
    },
  );
}
