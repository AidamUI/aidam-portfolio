import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/db";
import { getApprovedMessages } from "@/lib/messages";
import { insertIfUnderLimit } from "@/lib/rate-limit";
import { clientIp, hashIp, validateSubmission } from "@/lib/validate";

/**
 * The public message API.
 *
 * GET returns approved messages and nothing else. There is no `status` query
 * parameter, and adding one would be a mistake: prd.md §5.6 requires that no
 * unapproved message be reachable publicly *including through the API*, so the
 * filter is compiled into `getApprovedMessages` rather than chosen per request.
 * The response shape carries id, body and date — never the sender hash.
 *
 * POST exists for completeness and parity with the tech plan. The page itself
 * submits through a server action instead, so that it works without
 * JavaScript; this endpoint runs the identical validation, the identical rate
 * limit, and returns 202 with no echo of the body.
 */

export async function GET() {
  const messages = await getApprovedMessages();

  return NextResponse.json(
    {
      messages: messages.map((message) => ({
        id: message.id,
        body: message.body,
        createdAt: message.createdAt.toISOString(),
      })),
    },
    {
      headers: {
        // Revalidated by tag on approval; this is just a courtesy for clients.
        "Cache-Control": "public, max-age=0, s-maxage=60",
      },
    },
  );
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      payload = (await request.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
  } else {
    const form = await request.formData();
    payload = Object.fromEntries(form.entries());
  }

  const validation = validateSubmission({
    body: payload.body,
    honeypot: payload.website,
    token: typeof payload.token === "string" ? payload.token : null,
  });

  if (!validation.ok) {
    // Honeypot and link-spam hits get the same 202 a real message gets. The
    // message is dropped; a distinct status code would just be a free oracle
    // telling a bot which control to work around.
    if (validation.reason === "honeypot" || validation.reason === "blocked") {
      return new NextResponse(null, { status: 202 });
    }
    return NextResponse.json({ error: validation.reason }, { status: 400 });
  }

  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const ipHash = hashIp(clientIp(request.headers));

  try {
    const stored = await insertIfUnderLimit(ipHash, validation.body);
    if (!stored) {
      return NextResponse.json({ error: "rate-limited" }, { status: 429 });
    }
  } catch {
    return NextResponse.json({ error: "error" }, { status: 500 });
  }

  // 202, no body: accepted for review, not published. Echoing the message back
  // would imply it went live.
  return new NextResponse(null, { status: 202 });
}
