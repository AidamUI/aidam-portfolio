"use client";

import { useId, useState, type ReactElement, cloneElement } from "react";

/**
 * The live character counter.
 *
 * Pure enhancement: it wraps the textarea the server rendered rather than
 * replacing it, so with JavaScript off the field is still a normal textarea
 * with a native `maxlength` and the counter is simply absent. Nothing about
 * submitting depends on this component.
 *
 * The count is announced politely rather than on every keystroke — `aria-live`
 * on a per-character counter would make a screen reader unusable, so the
 * region only speaks once the writer is close to the limit.
 */
export function CharacterCounter({
  max,
  suffix,
  children,
}: {
  max: number;
  suffix: string;
  children: ReactElement<{
    "aria-describedby"?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }>;
}) {
  const [used, setUsed] = useState(0);
  const id = useId();
  const remaining = max - used;
  const close = remaining <= 50;

  return (
    <>
      {cloneElement(children, {
        "aria-describedby": id,
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
          setUsed(event.target.value.length),
      })}
      <p
        id={id}
        aria-live={close ? "polite" : "off"}
        className={`mt-xs font-mono text-[13px] ${
          close ? "text-marker" : "text-ink-2"
        }`}
      >
        {used} {suffix}
      </p>
    </>
  );
}
