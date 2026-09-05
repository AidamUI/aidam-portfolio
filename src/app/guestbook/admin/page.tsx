import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { StationSign } from "@/components/StationSign";
import { GUESTBOOK_ADMIN } from "@/content/guestbook";
import { isDatabaseConfigured } from "@/db";
import { isAuthorised } from "@/lib/admin-auth";
import {
  deleteMessage,
  getAllMessages,
  setMessageStatus,
} from "@/lib/messages";
import { dayMonthYear } from "@/lib/format";

export const metadata: Metadata = {
  title: GUESTBOOK_ADMIN.heading,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

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
    return (
      <>
        <StationSign
          code="G1"
          name={GUESTBOOK_ADMIN.heading}
          line="pribadi"
          as="h1"
        />
        <p className="px-lg py-xl text-ink">Not authorised.</p>
      </>
    );
  }

  if (!isDatabaseConfigured) {
    return (
      <>
        <StationSign
          code="G1"
          name={GUESTBOOK_ADMIN.heading}
          line="pribadi"
          as="h1"
        />
        <p className="px-lg py-xl text-ink">
          No database configured, so there is no queue to show.
        </p>
      </>
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
      <StationSign
        code="G1"
        name={GUESTBOOK_ADMIN.heading}
        line="pribadi"
        blurb={`${pending.length} pending`}
        as="h1"
      />

      <section className="px-lg py-xl">
        {pending.length === 0 ? (
          <p className="text-ink-2 text-[15px]">{GUESTBOOK_ADMIN.emptyQueue}</p>
        ) : (
          <ul className="flex flex-col">
            {pending.map((message) => (
              <li key={message.id} className="border-rule py-lg border-t">
                <p className="measure text-ink text-[17px] whitespace-pre-line">
                  {message.body}
                </p>
                <p className="text-ink-2 mt-sm font-mono text-[13px]">
                  <time dateTime={message.createdAt.toISOString()}>
                    {dayMonthYear(message.createdAt)}
                  </time>
                </p>
                <div className="gap-sm mt-md flex flex-wrap">
                  <form action={approve}>
                    <input type="hidden" name="id" value={message.id} />
                    <button
                      type="submit"
                      className="code-type border-line-work text-ink px-md py-xs border-2"
                    >
                      {GUESTBOOK_ADMIN.approve}
                    </button>
                  </form>
                  <form action={reject}>
                    <input type="hidden" name="id" value={message.id} />
                    <button
                      type="submit"
                      className="code-type border-ink-2 text-ink px-md py-xs border-2"
                    >
                      {GUESTBOOK_ADMIN.reject}
                    </button>
                  </form>
                  <form action={remove}>
                    <input type="hidden" name="id" value={message.id} />
                    <button
                      type="submit"
                      className="code-type border-line-life text-ink px-md py-xs border-2"
                    >
                      {GUESTBOOK_ADMIN.remove}
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-platform-2 px-lg py-xl">
        <h2 className="sign-type text-ink mb-lg text-[19px]">Decided</h2>
        {decided.length === 0 ? (
          <p className="text-ink-2 text-[15px]">Nothing decided yet.</p>
        ) : (
          <ul className="flex flex-col">
            {decided.map((message) => (
              <li key={message.id} className="border-rule py-md border-t">
                <p className="code-type text-ink-2">
                  {
                    GUESTBOOK_ADMIN.statusLabels[
                      message.status as keyof typeof GUESTBOOK_ADMIN.statusLabels
                    ]
                  }
                </p>
                <p className="measure text-ink text-[15px] whitespace-pre-line">
                  {message.body}
                </p>
                <form action={remove} className="mt-sm">
                  <input type="hidden" name="id" value={message.id} />
                  <button
                    type="submit"
                    className="code-type border-line-life text-ink px-md py-xs border-2"
                  >
                    {GUESTBOOK_ADMIN.remove}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
