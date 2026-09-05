import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * The database handle, or `null` when no connection string is configured.
 *
 * Null is a real, supported state rather than a bug. The guestbook is the only
 * feature that needs Postgres, and every other route on this site is static —
 * so a missing DATABASE_URL must degrade to "the guestbook is not accepting
 * messages yet" rather than taking the build or the whole site down with it.
 * That also means the site deploys and works before the database exists.
 *
 * Every caller checks for null. `requireDb()` is for the paths that genuinely
 * cannot proceed.
 */
export const db = process.env.DATABASE_URL
  ? drizzle(neon(process.env.DATABASE_URL), { schema })
  : null;

export const isDatabaseConfigured = db !== null;

export function requireDb() {
  if (!db) {
    throw new Error(
      "DATABASE_URL is not set. The guestbook needs a Postgres connection.",
    );
  }
  return db;
}

export { schema };
