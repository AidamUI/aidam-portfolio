import type { Metadata } from "next";
import { MessageForm } from "@/components/MessageForm";
import { MessageWall } from "@/components/MessageWall";
import { Section } from "@/components/Section";
import { GUESTBOOK } from "@/content/guestbook";
import { stationForPath } from "@/content/stations";
import { isDatabaseConfigured } from "@/db";
import { getApprovedMessages } from "@/lib/messages";
import { messageFor, type Rejection } from "@/lib/validate";

const station = stationForPath("/guestbook")!;

export const metadata: Metadata = {
  title: station.name,
  description: GUESTBOOK.intro,
  alternates: { canonical: station.href },
};

/**
 * Dynamic, not static.
 *
 * The form carries a signed token issued at render time, which is what makes
 * the dwell-time check meaningful — a prerendered page would hand every
 * visitor the same token, stamped at build time, and the check would pass for
 * anything forever. The approved messages are cached separately and
 * revalidated by tag when Aidam approves something, so this costs a small
 * render rather than a query per request.
 */
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ outcome?: string }>;
};

const OUTCOMES = new Set<string>([
  "sent",
  "empty",
  "too-long",
  "too-fast",
  "stale",
  "honeypot",
  "blocked",
  "rate-limited",
  "unavailable",
  "error",
]);

export default async function GuestbookPage({ searchParams }: Props) {
  const { outcome } = await searchParams;
  const messages = await getApprovedMessages();

  // The outcome arrives in the URL so the result survives a full page load,
  // which is what makes the no-JavaScript path work. It is validated against a
  // fixed set before it is used — nothing from the query string is rendered.
  const known = outcome && OUTCOMES.has(outcome) ? outcome : null;
  const confirmation =
    known === "sent"
      ? GUESTBOOK.sent
      : known
        ? messageFor(known as Rejection)
        : null;
  const isGood =
    known === "sent" || known === "honeypot" || known === "blocked";

  return (
    <>
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-8 sm:px-8 sm:pt-24">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          {GUESTBOOK.heading}
        </h1>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-24 sm:px-8">
        <p className="max-w-prose">{GUESTBOOK.intro}</p>

        {confirmation ? (
          <p
            role="status"
            className={`mt-8 max-w-prose border-l-4 pl-6 ${
              isGood ? "border-accent" : "border-red-500"
            }`}
          >
            {confirmation}
          </p>
        ) : null}

        {isDatabaseConfigured ? (
          <MessageForm />
        ) : (
          <>
            <p className="text-text-muted mt-8 max-w-prose">
              {GUESTBOOK.unavailable}
            </p>
            <MessageForm disabled />
          </>
        )}
      </div>

      <Section heading={GUESTBOOK.wallHeading} subtle>
        <MessageWall messages={messages} />
      </Section>
    </>
  );
}
