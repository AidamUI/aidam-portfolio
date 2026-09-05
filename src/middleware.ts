import { NextResponse } from "next/server";
import { isAuthorised, unauthorised } from "@/lib/admin-auth";

/**
 * Gates the approval queue and the message mutation endpoints.
 *
 * Everything else on the site is public and static, so the matcher below is
 * deliberately narrow — middleware that runs on every request would put a
 * function invocation in front of pages that are otherwise served straight
 * from the edge cache.
 */
export const config = {
  matcher: ["/guestbook/admin", "/guestbook/admin/:path*", "/api/messages/:id"],
};

export async function middleware(request: Request) {
  if (await isAuthorised(request)) {
    return NextResponse.next();
  }
  return unauthorised();
}
