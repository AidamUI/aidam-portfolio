/**
 * The "currently" block: what's happening this month. Source: now.ts.
 *
 * This is the block that keeps the site feeling alive, so it carries its own
 * date rather than the build date — a rebuild for an unrelated reason must not
 * make stale news look fresh.
 *
 * The marker fill (--marker, yellow) is the only use of that token on the page,
 * per design-system.md: "you are here" and live status ONLY.
 */

import { NOW } from "@/content/now";
import { formatDate } from "@/lib/format";

export function NowServing() {
  const updated = formatDate(NOW.updated);

  return (
    <section className="px-lg py-xl">
      <div className="bg-platform-2 border-marker p-lg relative border-l-[4px]">
        {/* Marker dot */}
        <div
          className="bg-marker absolute top-[24px] -left-[10px] h-[16px] w-[16px] rounded-full"
          aria-hidden="true"
        />

        <div className="mb-md gap-md flex items-baseline justify-between">
          <h2 className="sign-type text-ink text-[19px]">{NOW.heading}</h2>
          <time
            dateTime={NOW.updated}
            className="text-ink-2 shrink-0 font-mono text-[13px]"
          >
            {updated}
          </time>
        </div>

        <ul className="gap-md flex flex-col">
          {NOW.items.map((item, i) => (
            <li key={i} className="text-ink text-[17px] leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
