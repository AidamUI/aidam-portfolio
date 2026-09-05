import { Archivo, IBM_Plex_Mono } from "next/font/google";

/**
 * One family; width does the work (design-system.md § Type).
 *
 * The `wdth` axis is loaded explicitly — Archivo's variable font carries it,
 * but next/font only ships non-default axes when they are named here. Without
 * it the wdth 110 / 115 signage weights silently fall back to normal width and
 * the whole type idea collapses.
 *
 * next/font self-hosts both faces and generates a metric-matched fallback, so
 * nothing shifts when Archivo lands.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  // `optional`, not `swap`. next/font's metric-matched fallback is generated
  // from Archivo at normal width, and the signage sets it at wdth 110-115, so
  // the real face is measurably wider than the fallback it is standing in for.
  // With `swap` that difference flipped a wrap point in the hero the moment
  // the font landed, dropping the page 35px — 0.028 CLS against a 0.02 budget.
  // `optional` never swaps: the browser either has the font in time or uses
  // the fallback for that paint and keeps it. Same-origin and immutably
  // cached, so it is there from the second view onward, and there is no
  // arrangement of line breaks that makes `swap` safe at every viewport width.
  display: "optional",
  variable: "--font-archivo",
});

/** Dates and numbers only, where the content is genuinely data. */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  // Same reasoning; mono sits next to prose whose height it would disturb.
  display: "optional",
  variable: "--font-plex-mono",
});
