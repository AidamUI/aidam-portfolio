import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * The guestbook. Anonymous by design — tech-plan.md §4.
 *
 * There is no name column because there is no name. That is the feature, and
 * it also means there is nothing to leak: no account, no email, no handle, no
 * session. The only thing stored that relates to a sender at all is a salted
 * hash of their IP, which exists solely to make the rate limit work and is
 * never displayed, never joined against anything, and purged on a schedule.
 *
 * `status` is deliberately a plain text column with a check constraint rather
 * than a pg enum: a portfolio guestbook will never need a migration dance to
 * add a state, and the app narrows it to a union type anyway.
 */
export const messages = pgTable(
  "messages",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    /** <= 500 chars, plain text, HTML stripped before it ever gets here. */
    body: text("body").notNull(),
    /** pending | approved | rejected */
    status: text("status").notNull().default("pending"),
    /** sha256(ip + rotating salt). Rate limiting only. Never rendered. */
    ipHash: text("ip_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    // Drives the public wall: approved messages, newest first.
    index("messages_status_created_idx").on(table.status, table.createdAt),
    // Drives the rate limit: one sender's recent posts.
    index("messages_ip_created_idx").on(table.ipHash, table.createdAt),
  ],
);

export type MessageRow = typeof messages.$inferSelect;
export type MessageStatus = "pending" | "approved" | "rejected";

/** What the public wall is allowed to see. Note the absence of ipHash. */
export type PublicMessage = {
  id: string;
  body: string;
  createdAt: Date;
};
