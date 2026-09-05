import type { Metadata } from "next";
import { MessageForm } from "@/components/MessageForm";
import { MessageWall } from "@/components/MessageWall";
import { StationSign } from "@/components/StationSign";
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
      <StationSign
        code={station.code}
        name={GUESTBOOK.heading}
        line={station.line}
        blurb={station.blurb}
        as="h1"
      />

      <section className="px-lg py-xl">
        <p className="measure text-ink text-[17px]">{GUESTBOOK.intro}</p>

        {confirmation ? (
          <p
            role="status"
            className={`measure mt-lg pl-md border-l-[4px] text-[15px] ${
              isGood ? "border-marker text-ink" : "border-line-life text-ink"
            }`}
          >
            {confirmation}
          </p>
        ) : null}

        {isDatabaseConfigured ? (
          <MessageForm />
        ) : (
          <>
            <p className="measure text-ink-2 mt-lg text-[15px]">
              {GUESTBOOK.unavailable}
            </p>
            <MessageForm disabled />
          </>
        )}
      </section>

      <section className="bg-platform-2 px-lg py-xl">
        <h2 className="sign-type text-ink mb-lg text-[19px]">
          {GUESTBOOK.wallHeading}
        </h2>
        <MessageWall messages={messages} />
      </section>
    </>
  );
}
