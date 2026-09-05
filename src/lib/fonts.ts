import { Lato } from "next/font/google";

/**
 * One clean family, per the redesign brief: comfortable body text, heavier
 * weights for headings, nothing else competing for attention.
 *
 * `display: "optional"` rather than `"swap"`: a font that swaps in after
 * paint can change line-wrap points once its metrics differ from the
 * system-font fallback, which is exactly what caused a measured 0.028 layout
 * shift in the previous design. `optional` never swaps — the browser either
 * has Lato in time for first paint or keeps the fallback for that visit — so
 * this class of shift is prevented by construction rather than by tuning line
 * breaks per page.
 */
export const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "optional",
  variable: "--font-lato",
});
