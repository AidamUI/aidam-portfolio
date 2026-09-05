import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { Section } from "@/components/Section";
import { GUESTBOOK_ADMIN } from "@/content/guestbook";
import { isDatabaseConfigured } from "@/db";
import { isAuthorised } from "@/lib/admin-auth";
import { dayMonthYear } from "@/lib/format";
import {
  deleteMessage,
  getAllMessages,
  setMessageStatus,
} from "@/lib/messages";

export const metadata: Metadata = {
  title: GUESTBOOK_ADMIN.heading,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function PageHeading({ blurb }: { blurb?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-16 pb-8 sm:px-8 sm:pt-24">
      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
        {GUESTBOOK_ADMIN.heading}
      </h1>
      {blurb ? <p className="text-text-muted mt-3">{blurb}</p> : null}
    </div>
  );
}

/**
 * The approval queue.
 *
 * Middleware already returns 401 for anyone without the secret, so reaching
 * this component means the credentials checked out. It checks again anyway,
 * before any database call: middleware is a filter and a misconfigured
 * matcher would silently open the queue, which is exactly the kind of failure
 * that should not depend on one line of routing config.
 *
 * Approve and reject are server actions on plain forms, so the queue works
 * without JavaScript like the rest of the site.
 */
export default async function AdminPage() {
  const requestHeaders = await headers();
  const authorised = await isAuthorised(
    new Request("https://local/", { headers: requestHeaders }),
  );

  if (!authorised) {
    return <PageHeading blurb="Not authorised." />;
  }

  if (!isDatabaseConfigured) {
    return (
      <PageHeading blurb="No database configured, so there is no queue to show." />
    );
  }

  const all = await getAllMessages();
  const pending = all.filter((m) => m.status === "pending");
  const decided = all.filter((m) => m.status !== "pending");

  async function approve(formData: FormData) {
    "use server";
    await setMessageStatus(String(formData.get("id")), "approved");
    revalidatePath("/guestbook/admin");
  }

  async function reject(formData: FormData) {
    "use server";
    await setMessageStatus(String(formData.get("id")), "rejected");
    revalidatePath("/guestbook/admin");
  }

  async function remove(formData: FormData) {
    "use server";
    await deleteMessage(String(formData.get("id")));
    revalidatePath("/guestbook/admin");
  }

  return (
    <>
      <PageHeading blurb={`${pending.length} pending`} />

      <div className="mx-auto max-w-3xl px-6 pb-24 sm:px-8">
        {pending.length === 0 ? (
          <p className="text-text-muted">{GUESTBOOK_ADMIN.emptyQueue}</p>
        ) : (
          <ul className="flex flex-col gap-8">
            {pending.map((message) => (
              <li key={message.id} className="border-border border-t pt-8">
                <p className="max-w-prose whitespace-pre-line">
                  {message.body}
                </p>
                <p className="text-text-muted mt-3 font-mono text-xs">
                  <time dateTime={message.createdAt.toISOString()}>
                    {dayMonthYear(message.createdAt)}
                  </time>
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <form action={approve}>
                    <input type="hidden" name="id" value={message.id} />
                    <button
                      type="submit"
                      className="border-accent text-accent rounded-full border px-4 py-1.5 text-sm font-semibold"
                    >
                      {GUESTBOOK_ADMIN.approve}
                    </button>
                  </form>
                  <form action={reject}>
                    <input type="hidden" name="id" value={message.id} />
                    <button
                      type="submit"
                      className="border-border-strong text-text-muted rounded-full border px-4 py-1.5 text-sm font-semibold"
                    >
                      {GUESTBOOK_ADMIN.reject}
                    </button>
                  </form>
                  <form action={remove}>
                    <input type="hidden" name="id" value={message.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-red-500 px-4 py-1.5 text-sm font-semibold text-red-500"
                    >
                      {GUESTBOOK_ADMIN.remove}
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Section heading="Decided" subtle>
        {decided.length === 0 ? (
          <p className="text-text-muted">Nothing decided yet.</p>
        ) : (
          <ul className="flex flex-col gap-6">
            {decided.map((message) => (
              <li key={message.id} className="border-border border-t pt-6">
                <p className="text-text-muted text-sm font-semibold">
                  {
                    GUESTBOOK_ADMIN.statusLabels[
                      message.status as keyof typeof GUESTBOOK_ADMIN.statusLabels
                    ]
                  }
                </p>
                <p className="mt-1 max-w-prose whitespace-pre-line">
                  {message.body}
                </p>
                <form action={remove} className="mt-3">
                  <input type="hidden" name="id" value={message.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-500 px-4 py-1.5 text-sm font-semibold text-red-500"
                  >
                    {GUESTBOOK_ADMIN.remove}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
