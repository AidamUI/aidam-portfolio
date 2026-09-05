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
    return <p className="text-text-muted">{GUESTBOOK.emptyWall}</p>;
  }

  return (
    <>
      <p className="text-text-muted mb-8 text-sm">{GUESTBOOK.wallNote}</p>
      <ul className="flex flex-col gap-8">
        {messages.map((message) => (
          <li key={message.id} className="border-border border-t pt-8">
            <p className="max-w-prose whitespace-pre-line">{message.body}</p>
            <p className="text-text-muted mt-3 font-mono text-xs">
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
