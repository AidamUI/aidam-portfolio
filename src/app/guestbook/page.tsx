import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Scene } from "@/components/mountain/Scene";
import { MessageForm } from "@/components/MessageForm";
import { MessageWall } from "@/components/MessageWall";
import { Section, Stack } from "@/components/Section";
import { GUESTBOOK } from "@/content/guestbook";
import { STAGE_EYEBROW } from "@/content/stage";
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
      <Scene stage="guestbook" />
      <Hero eyebrow={STAGE_EYEBROW.guestbook} title={GUESTBOOK.heading}>
        <p className="mt-4 max-w-prose text-lg">{GUESTBOOK.intro}</p>
      </Hero>

      <Stack>
        <Section>
          {confirmation ? (
            <p
              role="status"
              className={`mb-8 max-w-prose border-l-4 pl-6 ${
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
              <p className="text-mut max-w-prose">{GUESTBOOK.unavailable}</p>
              <MessageForm disabled />
            </>
          )}
        </Section>

        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold sm:text-[26px]">
            {GUESTBOOK.wallHeading}
          </h2>
          <MessageWall messages={messages} />
        </div>
      </Stack>
    </>
  );
}
