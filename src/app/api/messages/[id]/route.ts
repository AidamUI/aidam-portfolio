import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/db";
import { isAuthorised, unauthorised } from "@/lib/admin-auth";
import { deleteMessage, setMessageStatus } from "@/lib/messages";

/**
 * Moderation endpoints. Middleware gates this path too, but the check runs
 * again here — before any database call, per tech-plan.md §4 — because a
 * matcher typo should not be the only thing standing between the public and
 * the queue.
 */

type Params = { params: Promise<{ id: string }> };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAuthorised(request))) return unauthorised();
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const { id } = await params;
  if (!UUID.test(id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  let status: unknown;
  try {
    ({ status } = (await request.json()) as { status?: unknown });
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  if (status !== "approved" && status !== "rejected") {
    return NextResponse.json({ error: "invalid status" }, { status: 400 });
  }

  await setMessageStatus(id, status);
  return new NextResponse(null, { status: 204 });
}

export async function DELETE(request: Request, { params }: Params) {
  if (!(await isAuthorised(request))) return unauthorised();
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const { id } = await params;
  if (!UUID.test(id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }

  await deleteMessage(id);
  return new NextResponse(null, { status: 204 });
}
