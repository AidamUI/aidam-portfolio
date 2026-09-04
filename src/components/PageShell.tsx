"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { stationForPath } from "@/content/stations";
import { RouteLine } from "./RouteLine";

/**
 * The rail the route line runs in, wrapping every page's <main>.
 *
 * Client-side only because the spine takes its colour from whichever line the
 * current station sits on, and a layout cannot read the pathname on the server.
 * `children` stays a server-rendered slot, so no page content is pulled into
 * the client bundle by this — only the ~30 lines here and the line colour.
 *
 * Home is the interchange where both lines meet; it defaults to the work line,
 * which is the one the reader is most likely to follow from there.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const line = stationForPath(pathname)?.line ?? "kerja";

  return (
    <div className="rail-pad relative flex-1">
      <RouteLine line={line} />
      <main id="main" tabIndex={-1} className="pb-3xl">
        {children}
      </main>
    </div>
  );
}
