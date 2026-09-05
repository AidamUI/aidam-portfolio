import { ImageResponse } from "next/og";

/**
 * Share cards, drawn with the site's own signage system rather than a
 * screenshot (tech-plan.md §5): the graphite ground, a route line down the
 * left, a station code in its line colour, and the name in heavy Archivo.
 *
 * The palette is repeated as literals here on purpose. Satori resolves no CSS
 * custom properties and never loads globals.css, so `var(--platform)` would
 * silently render as nothing. These are the graphite values from
 * design-system.md; if the tokens ever change, they change here too.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const PLATFORM = "#1E2733";
const PLATFORM_2 = "#26313F";
const INK = "#F3F5F7";
const INK_2 = "#A9B4C0";
const LINE_WORK = "#4C8DFF";
const LINE_LIFE = "#FF8A5C";

/**
 * Satori needs real font data — it cannot use a system font stack, and it does
 * not read woff2, which is the only format next/font keeps. So the TTF is
 * fetched from Google's static host and held for the lifetime of the lambda.
 * Vercel caches the generated image, so this runs once per cold start at most.
 *
 * A failure here must not take the card down: `loadArchivo` returns null and
 * the caller falls back to Satori's default face rather than throwing a 500 at
 * whatever just tried to unfurl the link.
 */
let cached: ArrayBuffer | null = null;

export async function loadArchivo(): Promise<ArrayBuffer | null> {
  if (cached) return cached;
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Archivo:wght@700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((response) => response.text());

    const url = css.match(/src:\s*url\((https:[^)]+\.(?:ttf|otf))\)/)?.[1];
    if (!url) return null;

    cached = await fetch(url).then((response) => response.arrayBuffer());
    return cached;
  } catch {
    return null;
  }
}

export type CardOptions = {
  /** Station code, e.g. W1 or P1.1. */
  code: string;
  /** The big line. */
  title: string;
  /** One quiet line under it. */
  subtitle?: string;
  line?: "kerja" | "pribadi";
  /** Small mono line at the foot, e.g. the site name. */
  footer?: string;
};

export async function renderCard({
  code,
  title,
  subtitle,
  line = "kerja",
  footer,
}: CardOptions): Promise<ImageResponse> {
  const font = await loadArchivo();
  const accent = line === "kerja" ? LINE_WORK : LINE_LIFE;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: PLATFORM,
        color: INK,
        fontFamily: font ? "Archivo" : "sans-serif",
      }}
    >
      {/* The route line, in the rail, exactly as every page has it. */}
      <div style={{ width: 72, display: "flex", justifyContent: "center" }}>
        <div style={{ width: 8, height: "100%", backgroundColor: accent }} />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px 56px 40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `4px solid ${accent}`,
              borderRadius: 999,
              padding: "6px 22px",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {code}
          </div>
          <div style={{ fontSize: 28, color: INK_2 }}>
            {line === "kerja" ? "Jalur Kerja" : "Jalur Pribadi"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: title.length > 28 ? 76 : 104,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                marginTop: 24,
                fontSize: 34,
                color: INK_2,
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            borderTop: `4px solid ${PLATFORM_2}`,
            paddingTop: 24,
            fontSize: 26,
            color: INK_2,
          }}
        >
          {footer ?? ""}
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: font
        ? [{ name: "Archivo", data: font, weight: 700, style: "normal" }]
        : undefined,
    },
  );
}
