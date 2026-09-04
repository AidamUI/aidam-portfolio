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
  display: "swap",
  variable: "--font-archivo",
});

/** Dates and numbers only, where the content is genuinely data. */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});
