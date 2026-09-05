import Link from "next/link";
import { SKILLS } from "@/content/skills";

/**
 * A mono chip naming one technology.
 *
 * design-system.md calls for a StackTag that "links to the artifact that proves
 * the skill". Where the technology is one Aidam has evidence for, the chip
 * links to that evidence; where it is not, it stays plain text rather than
 * linking somewhere that would not back it up. A chip that links nowhere is
 * honest; a chip that links to a page not mentioning it is not.
 */
export function StackTag({
  name,
  /**
   * Set false where the tag sits inside another link — the index rows are
   * clickable as a whole, and an anchor inside an anchor is invalid HTML and a
   * nested-interactive accessibility failure.
   */
  interactive = true,
}: {
  name: string;
  interactive?: boolean;
}) {
  const skill = SKILLS.find(
    (candidate) => candidate.name.toLowerCase() === name.toLowerCase(),
  );
  const evidence = skill && skill.tier === "used" ? skill.evidence[0] : null;

  const chip =
    "border-rule text-ink-2 px-sm py-[2px] inline-block border font-mono text-[13px]";

  if (!evidence || !interactive) {
    return <span className={chip}>{name}</span>;
  }

  return (
    <Link
      href={evidence.href}
      className={`${chip} hover:border-line-work hover:text-ink transition-colors`}
    >
      {name}
    </Link>
  );
}
