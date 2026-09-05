/**
 * Admin gate for the approval queue.
 *
 * Basic Auth over HTTPS, checked in middleware so an unauthenticated request
 * gets a real 401 with a `WWW-Authenticate` challenge and never reaches a
 * route handler or a database call. The handlers check again themselves —
 * middleware is a filter, not a permission model, and defence in depth here
 * costs one function call.
 *
 * The comparison is double-HMAC rather than `===`: both values are signed with
 * a per-call random key and the digests compared, which takes the same time
 * whether the first byte differs or the last. This runs on the Edge runtime,
 * where `node:crypto`'s `timingSafeEqual` is unavailable, so it is built from
 * Web Crypto.
 */

async function digest(value: string, key: CryptoKey): Promise<Uint8Array> {
  const bytes = new TextEncoder().encode(value);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, bytes));
}

/** Constant-time string comparison, Edge-safe. */
export async function safeEqual(a: string, b: string): Promise<boolean> {
  const raw = crypto.getRandomValues(new Uint8Array(32));
  const key = await crypto.subtle.importKey(
    "raw",
    raw,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const [da, db] = await Promise.all([digest(a, key), digest(b, key)]);

  let diff = da.length ^ db.length;
  for (let i = 0; i < da.length; i += 1) {
    diff |= da[i]! ^ db[i % db.length]!;
  }
  return diff === 0;
}

/**
 * True when the request carries the right Basic Auth credentials.
 *
 * With no secret configured the answer is always false — the queue fails
 * closed. An unset password must never mean "let everyone in".
 */
export async function isAuthorised(request: Request): Promise<boolean> {
  const expected = process.env.GUESTBOOK_ADMIN_SECRET;
  if (!expected) return false;

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;

  let decoded: string;
  try {
    decoded = atob(header.slice("Basic ".length));
  } catch {
    return false;
  }

  // The username is ignored; the secret is the password half.
  const supplied = decoded.slice(decoded.indexOf(":") + 1);
  return safeEqual(supplied, expected);
}

export function unauthorised(): Response {
  return new Response("Not authorised.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Guestbook queue", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}
