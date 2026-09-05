import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { GUESTBOOK } from "@/content/guestbook";

/**
 * Server-side validation for the guestbook. Everything here runs on the server
 * and is the only thing that decides whether a message is stored — the client
 * checks are conveniences, not gates.
 */

export const MAX_LENGTH = GUESTBOOK.maxLength;

/** Bots submit instantly. A human takes longer than this to write a sentence. */
export const MIN_DWELL_MS = 2_000;

/** A token older than this is stale; ask for a fresh form. */
export const MAX_DWELL_MS = 6 * 60 * 60 * 1_000;

export type Rejection =
  | "empty"
  | "too-long"
  | "too-fast"
  | "stale"
  | "honeypot"
  | "blocked"
  | "rate-limited"
  | "unavailable"
  | "error";

/**
 * Strips markup and normalises whitespace.
 *
 * React escapes on render, so this is not what stops XSS — not rendering
 * untrusted HTML is. This exists so that what is *stored* is plain text, per
 * tech-plan.md §4: if the body is ever exported, mailed, or rendered by
 * something less careful than React, it should still be inert.
 */
/**
 * Drops control characters while keeping newlines. Written as a scan rather
 * than a regex character class on purpose: the escape sequence for this range
 * is easy to mangle in transit, and a silently broken one would leave NUL and
 * friends in stored text.
 */
function stripControl(input: string): string {
  let out = "";
  for (const ch of input) {
    const code = ch.codePointAt(0) ?? 0;
    // 10 is newline, 127 is DEL; keep the former, drop the rest.
    if (code === 10 || (code >= 32 && code !== 127)) out += ch;
  }
  return out;
}

export function sanitise(input: string): string {
  return stripControl(input)
    .replace(/<[^>]*>/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

/**
 * A deliberately small auto-reject filter: links and the handful of slurs that
 * make up almost all drive-by spam. Anything subtler is a judgement call, and
 * the approval queue exists precisely so those get made by a human rather than
 * by a regex. Over-tuning this would start silently eating real messages.
 */
const BLOCKED = [
  /https?:\/\//i,
  /\bwww\.\w/i,
  /\b[\w.-]+\.(?:com|net|org|ru|xyz|top|click|shop)\b/i,
  /\b(?:viagra|casino|crypto\s*giveaway|seo\s*service|forex)\b/i,
];

export function isBlocked(body: string): boolean {
  return BLOCKED.some((pattern) => pattern.test(body));
}

/* ── Form token: proves the form was rendered before it was submitted ────── */

function secret(): string {
  // Falls back to a build-local constant so the form still works before the
  // env var is set. That weakens the dwell check to obscurity, never the
  // rate limit or the approval queue, which are the real controls.
  return process.env.GUESTBOOK_IP_SALT ?? "aidam-portfolio-dev-salt";
}

/** `<issuedAt>.<hmac>` — unforgeable, so the dwell clock cannot be rewound. */
export function issueFormToken(now: number = Date.now()): string {
  const issued = String(now);
  const mac = createHmac("sha256", secret()).update(issued).digest("hex");
  return `${issued}.${mac}`;
}

export function checkFormToken(
  token: string | null,
  now: number = Date.now(),
): Rejection | null {
  if (!token) return "too-fast";

  const [issued, mac] = token.split(".");
  if (!issued || !mac) return "too-fast";

  const expected = createHmac("sha256", secret()).update(issued).digest("hex");
  const a = Buffer.from(mac, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return "too-fast";

  const age = now - Number(issued);
  if (!Number.isFinite(age)) return "too-fast";
  if (age < MIN_DWELL_MS) return "too-fast";
  if (age > MAX_DWELL_MS) return "stale";

  return null;
}

/* ── Sender identity, reduced to something that cannot identify a sender ──── */

/**
 * Salted hash of the IP, for rate limiting only.
 *
 * The salt rotates monthly, which is what makes this genuinely one-way in
 * practice: the IPv4 space is small enough to brute-force a bare hash, so an
 * unsalted digest would be pseudonymous rather than anonymous. Rotating it
 * also caps how long any hash stays comparable, so old rows cannot be linked
 * to new ones even by whoever holds the salt.
 */
export function hashIp(ip: string, now: Date = new Date()): string {
  const period = `${now.getUTCFullYear()}-${now.getUTCMonth()}`;
  return createHash("sha256")
    .update(`${secret()}:${period}:${ip}`)
    .digest("hex");
}

/**
 * Vercel puts the client IP in `x-forwarded-for`, left-most entry. Falls back
 * to a constant so a missing header degrades to "everyone shares one bucket"
 * — stricter, never looser.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}

/* ── The body itself ─────────────────────────────────────────────────────── */

export type ValidationResult =
  { ok: true; body: string } | { ok: false; reason: Rejection };

export function validateSubmission(input: {
  body: unknown;
  honeypot: unknown;
  token: string | null;
  now?: number;
}): ValidationResult {
  // A bot filling every field it finds trips this before anything else runs.
  if (typeof input.honeypot === "string" && input.honeypot.trim() !== "") {
    return { ok: false, reason: "honeypot" };
  }

  const dwell = checkFormToken(input.token, input.now);
  if (dwell) return { ok: false, reason: dwell };

  if (typeof input.body !== "string") return { ok: false, reason: "empty" };

  const body = sanitise(input.body);
  if (body.length === 0) return { ok: false, reason: "empty" };
  if (body.length > MAX_LENGTH) return { ok: false, reason: "too-long" };
  if (isBlocked(body)) return { ok: false, reason: "blocked" };

  return { ok: true, body };
}

/** Maps a rejection onto the copy the visitor actually sees. */
export function messageFor(reason: Rejection): string {
  switch (reason) {
    case "empty":
      return GUESTBOOK.empty;
    case "too-long":
      return GUESTBOOK.tooLong;
    case "rate-limited":
      return GUESTBOOK.rateLimited;
    case "unavailable":
      return GUESTBOOK.unavailable;
    // "honeypot" and "blocked" are answered with the ordinary success line on
    // purpose: telling a spammer which control caught them just tells them
    // what to change. The message is dropped, not queued.
    case "honeypot":
    case "blocked":
      return GUESTBOOK.sent;
    default:
      return GUESTBOOK.error;
  }
}
