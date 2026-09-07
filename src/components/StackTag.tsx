import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { SKILLS } from "@/content/skills";

/**
 * One technology. Default rendering is running text rather than a boxed
 * chip. Where Aidam has a named project or role behind it, it's an
 * underlined link to that evidence; where he does not, it stays plain —
 * never linking somewhere that would not back it up.
 *
 * `pill` swaps that for a bordered chip, for the one place (project preview
 * cards) that wants a stack read as a row of tags rather than a sentence.
 */
export function StackTag({
  name,
  interactive = true,
  pill = false,
}: {
  name: string;
  interactive?: boolean;
  pill?: boolean;
}) {
  const skill = SKILLS.find(
    (candidate) => candidate.name.toLowerCase() === name.toLowerCase(),
  );
  const evidence = skill && skill.tier === "used" ? skill.evidence[0] : null;

  if (pill) {
    const pillClass =
      "border-line inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium";

    if (!evidence || !interactive) {
      return <span className={pillClass}>{name}</span>;
    }

    return (
      <Link
        href={evidence.href}
        className={`${pillClass} hover:border-accent hover:text-accent transition-colors`}
      >
        {name}
      </Link>
    );
  }

  if (!evidence || !interactive) {
    return <span className="font-semibold">{name}</span>;
  }

  return (
    <Link
      href={evidence.href}
      className="text-accent font-semibold underline decoration-1 underline-offset-2 hover:opacity-80"
    >
      {name}
    </Link>
  );
}

/**
 * A run of tags (technologies, artifacts, links) as one flowing line of text
 * joined by a middle dot, rather than a grid of pill-shaped boxes.
 *
 * The separator is a real space-dot-space text node, not padding around a
 * bare "·" — CSS only gets a line-break opportunity at actual whitespace, so
 * padding alone lets a long run of tags glue into one unbreakable string and
 * overflow the page on narrow screens.
 */
export function TagList({
  items,
}: {
  items: { key: string; node: ReactNode }[];
}) {
  return (
    <p className="max-w-prose">
      {items.map((item, i) => (
        <Fragment key={item.key}>
          {i > 0 ? <span className="text-mut"> · </span> : null}
          {item.node}
        </Fragment>
      ))}
    </p>
  );
}
