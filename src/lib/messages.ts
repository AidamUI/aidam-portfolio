import { and, desc, eq, lt, sql } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";
import { db, requireDb } from "@/db";
import { messages, type MessageRow, type PublicMessage } from "@/db/schema";

export const MESSAGES_TAG = "guestbook-messages";

/**
 * The public wall.
 *
 * `status = 'approved'` is written into the query, not taken as an argument.
 * prd.md §5.6 requires that no unapproved message be reachable publicly,
 * including through the API — so there is deliberately no code path anywhere
 * that lets a caller choose which status the public read returns.
 *
 * The select list is explicit and omits `ipHash`. Even though the hash is not
 * an identifier, the shape that leaves this function simply does not carry it,
 * so it cannot be leaked by a later `JSON.stringify` of the wrong object.
 */
export const getApprovedMessages = unstable_cache(
  async (): Promise<PublicMessage[]> => {
    if (!db) return [];

    return db
      .select({
        id: messages.id,
        body: messages.body,
        createdAt: messages.createdAt,
      })
      .from(messages)
      .where(eq(messages.status, "approved"))
      .orderBy(desc(messages.createdAt))
      .limit(200);
  },
  [MESSAGES_TAG],
  { tags: [MESSAGES_TAG] },
);

/** Everything, for the admin queue only. Never called from a public path. */
export async function getAllMessages(): Promise<MessageRow[]> {
  const database = requireDb();
  return database
    .select()
    .from(messages)
    .orderBy(desc(messages.createdAt))
    .limit(500);
}

export async function setMessageStatus(
  id: string,
  status: "approved" | "rejected",
): Promise<void> {
  const database = requireDb();
  await database.update(messages).set({ status }).where(eq(messages.id, id));
  revalidateTag(MESSAGES_TAG);
}

export async function deleteMessage(id: string): Promise<void> {
  const database = requireDb();
  await database.delete(messages).where(eq(messages.id, id));
  revalidateTag(MESSAGES_TAG);
}

/**
 * Retention, per tech-plan.md §4. Anonymous has to mean anonymous, including
 * from Aidam, so the sender hash does not outlive its only purpose:
 *
 *   - rejected rows are deleted after 7 days,
 *   - `ip_hash` is blanked on anything older than 30 days, which keeps the
 *     message but destroys the last field that relates it to a sender.
 *
 * The monthly salt rotation in validate.ts already breaks comparability across
 * months; this removes the value outright. Call it from a scheduled job, or by
 * hand — it is idempotent.
 */
export async function purgeExpired(): Promise<{
  rejectedDeleted: number;
  hashesCleared: number;
}> {
  const database = requireDb();

  const rejected = await database
    .delete(messages)
    .where(
      and(
        eq(messages.status, "rejected"),
        lt(messages.createdAt, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      ),
    )
    .returning({ id: messages.id });

  const cleared = await database
    .update(messages)
    .set({ ipHash: "" })
    .where(
      and(
        sql`${messages.ipHash} <> ''`,
        lt(messages.createdAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
      ),
    )
    .returning({ id: messages.id });

  return { rejectedDeleted: rejected.length, hashesCleared: cleared.length };
}
