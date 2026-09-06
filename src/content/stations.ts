import type { Line, Station } from "./types";

/**
 * The route map. Codes come from design-system.md § Station codes and appear
 * in the header, on section signs, and in the footer's miniature diagram.
 *
 * Colour never carries meaning alone — every station renders its code and its
 * name next to the colour, so the map survives greyscale and colour blindness.
 */

export const LINES: Record<Line["id"], Line> = {
  kerja: {
    id: "kerja",
    name: "Jalur Kerja",
    colorVar: "--line-work",
    colorClass: "text-line-work",
  },
  pribadi: {
    id: "pribadi",
    name: "Jalur Pribadi",
    colorVar: "--line-life",
    colorClass: "text-line-life",
  },
};

export const STATIONS: Station[] = [
  {
    code: "W1",
    name: "Work",
    href: "/work",
    line: "kerja",
    blurb: "IBM, teaching, and the organisations",
  },
  {
    code: "A1",
    name: "Academic",
    href: "/academic",
    line: "kerja",
    blurb: "Degree, coursework, scholarships",
  },
  {
    code: "P1",
    name: "Projects",
    href: "/projects",
    line: "kerja",
    blurb: "Everything shipped, newest first",
  },
  {
    code: "B1",
    name: "Blog",
    href: "/blog",
    line: "pribadi",
    blurb: "Posts, reposts and the odd video, copied over by hand",
  },
  {
    code: "O1",
    name: "Documentation",
    href: "/documentation",
    line: "pribadi",
    blurb: "Photos and documentation, by album",
  },
  {
    code: "G1",
    name: "Guestbook",
    href: "/guestbook",
    line: "pribadi",
    blurb: "Anonymous messages",
  },
];

/** Home is the interchange where both lines meet — it has no code of its own. */
export const INTERCHANGE = {
  name: "Home",
  href: "/",
  blurb: "Where both lines meet",
} as const;

/**
 * Resolves the station a pathname belongs to, including case-study children
 * (`/projects/terra` is still P1) and album pages (`/documentation/kerja` is
 * still O1). Returns null on the home page, which is the interchange.
 */
export function stationForPath(pathname: string): Station | null {
  return (
    STATIONS.find(
      (s) => pathname === s.href || pathname.startsWith(`${s.href}/`),
    ) ?? null
  );
}
