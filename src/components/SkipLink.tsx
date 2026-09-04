import { A11Y } from "@/content/site";

/** First focusable thing on the page. Invisible until focused, then a sign. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="code-type sr-only focus:not-sr-only focus:absolute focus:left-md focus:top-md focus:z-50 focus:bg-marker focus:px-md focus:py-sm focus:text-on-marker"
    >
      {A11Y.skipToContent}
    </a>
  );
}
