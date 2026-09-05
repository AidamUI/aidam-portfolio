"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isDatabaseConfigured } from "@/db";
import { insertIfUnderLimit } from "@/lib/rate-limit";
import {
  clientIp,
  hashIp,
  validateSubmission,
  type Rejection,
} from "@/lib/validate";

/**
 * Submitting a message.
 *
 * A server action rather than a fetch, so the form works with JavaScript
 * disabled — prd.md §5.6 requires the page to render and read without it, and
 * there is no good reason for writing to be the exception. React posts the
 * form natively when it has not hydrated, the action runs the same either way,
 * and the result is delivered by redirect so the outcome survives a full page
 * load. No JSON, no client state machine.
 *
 * The redirect target carries only an outcome keyword, never the message body
 * — a submitted message must not end up in the visitor's history or in a
 * referrer header.
 */
export async function submitMessage(formData: FormData): Promise<void> {
  const outcome = await handle(formData);
  redirect(`/guestbook?outcome=${outcome}`);
}

type Outcome = "sent" | Rejection;

async function handle(formData: FormData): Promise<Outcome> {
  const validation = validateSubmission({
    body: formData.get("body"),
    honeypot: formData.get("website"),
    token: (formData.get("token") as string | null) ?? null,
  });

  if (!validation.ok) {
    // A honeypot or link-spam hit is answered exactly like a success. The
    // message is dropped and never queued; telling the sender which control
    // caught them only tells them what to change next time.
    return validation.reason;
  }

  if (!isDatabaseConfigured) return "unavailable";

  const requestHeaders = await headers();
  const ipHash = hashIp(clientIp(requestHeaders));

  try {
    const stored = await insertIfUnderLimit(ipHash, validation.body);
    return stored ? "sent" : "rate-limited";
  } catch {
    // Deliberately not logging the body: an error path is exactly where an
    // anonymous message would otherwise end up sitting in a log aggregator.
    return "error";
  }
}
