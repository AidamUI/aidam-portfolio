import { A11Y } from "@/content/site";

/** First focusable thing on the page. Invisible until focused. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="bg-accent text-on-accent sr-only rounded-md px-4 py-2 text-sm font-semibold focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
    >
      {A11Y.skipToContent}
    </a>
  );
}
