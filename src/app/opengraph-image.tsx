import { PROFILE } from "@/content/profile";
import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og";

export const alt = `${PROFILE.name} — ${PROFILE.goesBy}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * The site-level card. Next inherits this into every route that does not
 * define its own, so the pages below only override where a more specific
 * card genuinely helps.
 */
export default function Image() {
  return renderCard({
    title: PROFILE.name,
    subtitle: "Builds software, teaches it, sells it. Jakarta.",
    footer: "aidam-portfolio.vercel.app",
  });
}
