import Link from "next/link";
import { SKILLS } from "@/content/skills";

/**
 * A pill naming one technology. Where Aidam has a named project or role
 * behind it, the pill links to that evidence; where he does not, it stays
 * plain text rather than linking somewhere that would not back it up.
 */
export function StackTag({
  name,
  /** Set false where the tag sits inside another link. */
  interactive = true,
}: {
  name: string;
  interactive?: boolean;
}) {
  const skill = SKILLS.find(
    (candidate) => candidate.name.toLowerCase() === name.toLowerCase(),
  );
  const evidence = skill && skill.tier === "used" ? skill.evidence[0] : null;

  const pill =
    "border-border-strong text-text-muted inline-block rounded-full border px-3 py-1 text-sm";

  if (!evidence || !interactive) {
    return <span className={pill}>{name}</span>;
  }

  return (
    <Link
      href={evidence.href}
      className={`${pill} hover:border-accent hover:text-accent transition-colors`}
    >
      {name}
    </Link>
  );
}
