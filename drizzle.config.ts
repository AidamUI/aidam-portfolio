import type { Config } from "drizzle-kit";

/**
 * Migration config. Dev-only: drizzle-kit never runs in the deployed app.
 *
 *   pnpm db:push      apply src/db/schema.ts to the database
 *   pnpm db:studio    browse the queue locally
 */
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
} satisfies Config;
