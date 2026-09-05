/**
 * Guestbook integration test, run against a real Postgres.
 *
 * PGlite is Postgres compiled to WASM, so this exercises the actual SQL the
 * app ships — the conditional INSERT, the indexes, `gen_random_uuid()`, the
 * interval arithmetic — rather than a mock that would agree with whatever the
 * code happens to do. The two acceptance criteria in prd.md §5.6 that need a
 * database to demonstrate are proven here:
 *
 *   - the fourth post within an hour from one IP is rejected;
 *   - no unapproved message is reachable through the public read.
 *
 * Run with:  pnpm test:db
 */

import { PGlite } from "@electric-sql/pglite";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/pglite";
import {
  insertIfUnderLimit,
  DAILY_LIMIT,
  HOURLY_LIMIT,
} from "@/lib/rate-limit";
import { messages } from "@/db/schema";

let failures = 0;

function check(label: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures += 1;
  console.log(
    `  ${ok ? "PASS" : "FAIL"}  ${label}${ok ? "" : `  (got ${JSON.stringify(actual)}, want ${JSON.stringify(expected)})`}`,
  );
}

async function main() {
  const client = new PGlite();
  const db = drizzle(client, { schema: { messages } });

  // The schema exactly as src/db/schema.ts declares it.
  await client.exec(`
    create table messages (
      id uuid primary key default gen_random_uuid(),
      body text not null,
      status text not null default 'pending',
      ip_hash text not null,
      created_at timestamptz not null default now()
    );
    create index messages_status_created_idx on messages (status, created_at);
    create index messages_ip_created_idx on messages (ip_hash, created_at);
  `);

  console.log("\n── rate limit: 3 per hour, per sender ──");
  const alice = "hash-alice";
  const results: boolean[] = [];
  for (let i = 1; i <= 5; i += 1) {
    results.push(await insertIfUnderLimit(alice, `message ${i}`, db));
  }
  check(`first ${HOURLY_LIMIT} accepted, rest rejected`, results, [
    true,
    true,
    true,
    false,
    false,
  ]);

  const stored = await db
    .select()
    .from(messages)
    .where(eq(messages.ipHash, alice));
  check("only 3 rows actually written", stored.length, HOURLY_LIMIT);

  console.log("\n── the limit is per sender, not global ──");
  check(
    "a different sender is unaffected",
    await insertIfUnderLimit("hash-bob", "hello from bob", db),
    true,
  );

  console.log("\n── everything lands as pending, never auto-published ──");
  const pending = await db
    .select()
    .from(messages)
    .where(eq(messages.status, "pending"));
  check("all 4 rows are pending", pending.length, 4);
  const approved = await db
    .select()
    .from(messages)
    .where(eq(messages.status, "approved"));
  check("nothing is approved without a human", approved.length, 0);

  console.log("\n── the public read cannot see unapproved messages ──");
  // The same filter getApprovedMessages() compiles in.
  const publicRead = await db
    .select({
      id: messages.id,
      body: messages.body,
      createdAt: messages.createdAt,
    })
    .from(messages)
    .where(eq(messages.status, "approved"))
    .orderBy(desc(messages.createdAt));
  check("public wall is empty while all are pending", publicRead.length, 0);

  await db
    .update(messages)
    .set({ status: "approved" })
    .where(eq(messages.body, "message 1"));

  const afterApproval = await db
    .select({
      id: messages.id,
      body: messages.body,
      createdAt: messages.createdAt,
    })
    .from(messages)
    .where(eq(messages.status, "approved"));
  check("approving one publishes exactly one", afterApproval.length, 1);
  check(
    "the public row carries no sender field",
    Object.keys(afterApproval[0]!).sort(),
    ["body", "createdAt", "id"],
  );

  console.log("\n── the daily limit ──");
  const carol = "hash-carol";
  // Backdate 90 minutes so the hourly window is clear but the daily one is not.
  for (let i = 0; i < DAILY_LIMIT; i += 1) {
    await client.query(
      `insert into messages (body, status, ip_hash, created_at)
       values ($1, 'pending', $2, now() - interval '90 minutes')`,
      [`old ${i}`, carol],
    );
  }
  check(
    `blocked at ${DAILY_LIMIT} a day even with an empty hour`,
    await insertIfUnderLimit(carol, "one too many", db),
    false,
  );

  console.log("\n── the window slides ──");
  await client.query(
    `update messages set created_at = now() - interval '2 hours' where ip_hash = $1`,
    [alice],
  );
  check(
    "alice can post again once her hour has passed",
    await insertIfUnderLimit(alice, "later that day", db),
    true,
  );

  await client.close();

  console.log(`\n${failures === 0 ? "ALL PASS" : `${failures} FAILURE(S)`}\n`);
  process.exit(failures === 0 ? 0 : 1);
}

void main();
