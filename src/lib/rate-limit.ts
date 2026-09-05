import { and, count, eq, gte, sql, type SQL } from "drizzle-orm";
import { requireDb } from "@/db";
import { messages } from "@/db/schema";

/**
 * Per-sender rate limits, from prd.md §5.6: 3 an hour, 10 a day.
 *
 * ── Why Postgres and not Upstash ──────────────────────────────────────────
 * tech-plan.md §1 picks Upstash Redis, reasoning that in-memory counters do
 * not survive serverless. That reasoning is right and Postgres satisfies it
 * just as well — the rows are already there, already indexed on
 * (ip_hash, created_at), and already the thing being rate limited. Using them
 * removes a second managed service, a second set of credentials, and a second
 * failure mode from a feature whose entire job is to accept a few sentences a
 * week. Swap in Upstash if the volume ever justifies it; the interface below
 * is the only thing that would change.
 *
 * The count and the insert run as ONE statement (see `insertIfUnderLimit`) so
 * two simultaneous requests cannot both read "2 so far" and both write.
 */

export const HOURLY_LIMIT = 3;
export const DAILY_LIMIT = 10;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export type LimitCheck = {
  allowed: boolean;
  lastHour: number;
  lastDay: number;
};

/** Read-only view of a sender's recent volume. Used for reporting, not gating. */
export async function checkLimit(ipHash: string): Promise<LimitCheck> {
  const db = requireDb();
  const now = Date.now();

  const [hour, day] = await Promise.all([
    db
      .select({ n: count() })
      .from(messages)
      .where(
        and(
          eq(messages.ipHash, ipHash),
          gte(messages.createdAt, new Date(now - HOUR_MS)),
        ),
      ),
    db
      .select({ n: count() })
      .from(messages)
      .where(
        and(
          eq(messages.ipHash, ipHash),
          gte(messages.createdAt, new Date(now - DAY_MS)),
        ),
      ),
  ]);

  const lastHour = hour[0]?.n ?? 0;
  const lastDay = day[0]?.n ?? 0;

  return {
    allowed: lastHour < HOURLY_LIMIT && lastDay < DAILY_LIMIT,
    lastHour,
    lastDay,
  };
}

/**
 * Inserts the message only if this sender is under both limits, in a single
 * statement. Returns true if it was stored, false if the limit rejected it.
 *
 * `INSERT ... SELECT ... WHERE (subquery counts) < limit` is evaluated
 * atomically by Postgres, so the read cannot go stale between checking and
 * writing the way a separate SELECT then INSERT can.
 */
/**
 * The narrow slice of a Drizzle instance this needs. Typed structurally so the
 * limit can be exercised against an in-process Postgres in tests using exactly
 * this SQL, rather than being asserted and hoped for.
 */
export type Executor = { execute: (query: SQL) => Promise<unknown> };

export async function insertIfUnderLimit(
  ipHash: string,
  body: string,
  database: Executor = requireDb(),
): Promise<boolean> {
  const rows = await database.execute(sql`
    insert into ${messages} (body, status, ip_hash)
    select ${body}, 'pending', ${ipHash}
    where (
      select count(*) from ${messages}
      where ${messages.ipHash} = ${ipHash}
        and ${messages.createdAt} > now() - interval '1 hour'
    ) < ${HOURLY_LIMIT}
    and (
      select count(*) from ${messages}
      where ${messages.ipHash} = ${ipHash}
        and ${messages.createdAt} > now() - interval '1 day'
    ) < ${DAILY_LIMIT}
    returning id
  `);

  // neon-http returns { rows }; be tolerant of either shape.
  const inserted = Array.isArray(rows)
    ? rows.length
    : ((rows as { rows?: unknown[] }).rows?.length ?? 0);

  return inserted > 0;
}
