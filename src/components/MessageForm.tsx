import { submitMessage } from "@/app/guestbook/actions";
import { GUESTBOOK } from "@/content/guestbook";
import { issueFormToken } from "@/lib/validate";
import { CharacterCounter } from "./CharacterCounter";

/**
 * One textarea, no name field, no login. That is the whole form.
 *
 * A server component wrapping a server action, so it posts and works with
 * JavaScript disabled. The only client code on the page is the character
 * counter, which enhances the textarea rather than owning it — with no JS the
 * browser's own `maxlength` still holds the line, and the server validates
 * regardless.
 */
export function MessageForm({ disabled = false }: { disabled?: boolean }) {
  // Issued per render, signed, and checked on submit. This is what makes the
  // dwell-time check real: the clock cannot be rewound by editing the form.
  const token = issueFormToken();

  return (
    <form action={submitMessage} className="mt-lg">
      <input type="hidden" name="token" value={token} />

      {/*
        Honeypot. Positioned off-screen rather than `display: none`, because
        bots skip hidden fields but happily fill ones that are merely moved.
        Hidden from assistive tech and removed from the tab order, so a human
        never meets it either way.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Leave this empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label htmlFor="body" className="code-type text-ink-2 block">
        {GUESTBOOK.fieldLabel}
      </label>

      <CharacterCounter
        max={GUESTBOOK.maxLength}
        suffix={GUESTBOOK.counterSuffix}
      >
        <textarea
          id="body"
          name="body"
          rows={5}
          maxLength={GUESTBOOK.maxLength}
          required
          disabled={disabled}
          placeholder={GUESTBOOK.placeholder}
          className="border-ink-2 bg-platform text-ink mt-sm px-md py-sm w-full border-2 text-[17px] disabled:opacity-50"
        />
      </CharacterCounter>

      <button
        type="submit"
        disabled={disabled}
        className="code-type border-ink-2 text-ink mt-md px-lg py-sm hover:border-line-work border-2 transition-colors disabled:opacity-50"
      >
        {GUESTBOOK.submit}
      </button>
    </form>
  );
}
