import { Lato, Outfit } from "next/font/google";

/**
 * Two families: Lato for body copy, Outfit — a geometric sans with tighter
 * tracking — for headings and figures. Mono labels (eyebrows, dates, stats)
 * use the system monospace stack and need no font file at all.
 *
 * `display: "optional"` rather than `"swap"`: a font that swaps in after
 * paint can change line-wrap points once its metrics differ from the
 * system-font fallback, which is exactly what caused a measured 0.028 layout
 * shift in an earlier design. `optional` never swaps — the browser either has
 * the font in time for first paint or keeps the fallback for that visit — so
 * this class of shift is prevented by construction rather than by tuning line
 * breaks per page.
 */
export const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "optional",
  variable: "--font-lato",
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "optional",
  variable: "--font-outfit",
});
