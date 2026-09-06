import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { Section, Stack } from "@/components/Section";
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
    <div className="mx-auto max-w-[1180px] px-6 pt-13 pb-6 sm:px-8 sm:pt-20">
      <h1 className="text-4xl sm:text-5xl">{GUESTBOOK_ADMIN.heading}</h1>
      {blurb ? <p className="text-mut mt-3">{blurb}</p> : null}
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

      <Stack>
        <Section>
          {pending.length === 0 ? (
            <p className="text-mut">{GUESTBOOK_ADMIN.emptyQueue}</p>
          ) : (
            <ul className="flex flex-col gap-7">
              {pending.map((message) => (
                <li
                  key={message.id}
                  className="border-line border-t pt-7 first:border-t-0 first:pt-0"
                >
                  <p className="max-w-prose whitespace-pre-line">
                    {message.body}
                  </p>
                  <p className="text-mut mt-3 font-mono text-xs">
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
                        className="border-line-strong text-mut rounded-full border px-4 py-1.5 text-sm font-semibold"
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
        </Section>

        <Section heading="Decided">
          {decided.length === 0 ? (
            <p className="text-mut">Nothing decided yet.</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {decided.map((message) => (
                <li
                  key={message.id}
                  className="border-line border-t pt-6 first:border-t-0 first:pt-0"
                >
                  <p className="text-mut text-sm font-semibold">
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
      </Stack>
    </>
  );
}
