import type { PublicMessage } from "@/db/schema";
import { GUESTBOOK } from "@/content/guestbook";
import { dayMonthYear } from "@/lib/format";

/**
 * Approved messages, newest first.
 *
 * A date and the words. There is no author line because there is no author —
 * not hidden, not anonymised, simply never collected. Do not add one.
 *
 * `whitespace-pre-line` renders the writer's paragraph breaks; the body was
 * stripped to plain text on the way in, and React escapes on the way out, so
 * nothing here needs `dangerouslySetInnerHTML` and nothing here should get it.
 */
export function MessageWall({ messages }: { messages: PublicMessage[] }) {
  if (messages.length === 0) {
    return (
      <p className="measure text-ink-2 text-[15px]">{GUESTBOOK.emptyWall}</p>
    );
  }

  return (
    <>
      <p className="text-ink-2 mb-lg text-[15px]">{GUESTBOOK.wallNote}</p>
      <ul className="flex flex-col">
        {messages.map((message) => (
          <li key={message.id} className="border-rule py-lg border-t">
            <p className="measure text-ink text-[17px] whitespace-pre-line">
              {message.body}
            </p>
            <p className="text-ink-2 mt-sm font-mono text-[13px]">
              <time dateTime={message.createdAt.toISOString()}>
                {dayMonthYear(message.createdAt)}
              </time>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
