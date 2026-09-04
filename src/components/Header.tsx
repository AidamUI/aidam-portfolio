"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { A11Y, SITE } from "@/content/site";
import { INTERCHANGE, LINES, STATIONS } from "@/content/stations";
import type { Station } from "@/content/types";
import { StationBadge } from "./StationBadge";
import { ThemeToggle } from "./ThemeToggle";

/**
 * The signage bar: wordmark left, station codes right, the current one filled.
 *
 * Deviation from the desktop wireframe, taken deliberately: the wireframe shows
 * bare codes (`W1 A1 P1 O1 G1`), but design-system.md's own accessibility rule
 * says "every route has a code and a label next to it, so the map works for
 * colourblind readers and in greyscale". A stranger cannot navigate five
 * two-character codes. The rule wins over the sketch, so the code chip carries
 * its name from `lg` up; below that the bar collapses to a menu that shows the
 * code, the name and the blurb, grouped under its line.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isCurrent = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname],
  );

  // Close on navigation. The layout persists across route changes, so without
  // this the panel would stay open over the page the reader just asked for.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Esc closes, focus is trapped while open, and the trigger gets focus back.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="border-line-work bg-platform sticky top-0 z-40 border-b-[3px]">
      <div className="gap-md px-lg py-md flex items-center justify-between">
        <Link
          href={INTERCHANGE.href}
          className="code-type text-ink shrink-0 text-[18px] tracking-[0.08em]"
          aria-current={isCurrent("/") ? "page" : undefined}
        >
          {SITE.wordmark}
        </Link>

        <nav aria-label={A11Y.primaryNav} className="hidden lg:block">
          <ul className="gap-lg flex items-center">
            {STATIONS.map((station) => (
              <li key={station.code}>
                <StationLink
                  station={station}
                  current={isCurrent(station.href)}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="gap-sm flex items-center">
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
            className="gap-sm border-ink-2 px-md py-xs text-ink flex shrink-0 items-center border-2 lg:hidden"
          >
            <MenuGlyph open={open} />
            <span className="sr-only">
              {open ? A11Y.closeMenu : A11Y.openMenu}
            </span>
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        ref={panelRef}
        hidden={!open}
        aria-label={A11Y.primaryNav}
        className="border-line-life bg-platform border-t-[3px] lg:hidden"
      >
        {(["kerja", "pribadi"] as const).map((lineId) => (
          <section key={lineId} aria-labelledby={`${menuId}-${lineId}`}>
            <p
              id={`${menuId}-${lineId}`}
              className="code-type border-rule px-lg py-sm text-ink-2 border-b"
            >
              {LINES[lineId].name}
            </p>
            <ul>
              {STATIONS.filter((s) => s.line === lineId).map((station) => (
                <li key={station.code} className="border-rule border-b">
                  <Link
                    href={station.href}
                    aria-current={isCurrent(station.href) ? "page" : undefined}
                    className="gap-md px-lg py-md flex items-start"
                  >
                    <StationBadge
                      code={station.code}
                      line={station.line}
                      active={isCurrent(station.href)}
                      className="mt-[3px]"
                    />
                    <span>
                      <span
                        className={`sign-type text-ink block text-[19px] ${
                          isCurrent(station.href)
                            ? "underline decoration-2 underline-offset-4"
                            : ""
                        }`}
                      >
                        {station.name}
                      </span>
                      <span className="text-ink-2 block text-[15px]">
                        {station.blurb}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </header>
  );
}

function StationLink({
  station,
  current,
}: {
  station: Station;
  current: boolean;
}) {
  return (
    <Link
      href={station.href}
      aria-current={current ? "page" : undefined}
      className="gap-sm text-ink flex items-center"
    >
      <StationBadge code={station.code} line={station.line} active={current} />
      <span
        className={`sign-type text-[15px] ${
          current ? "underline decoration-2 underline-offset-4" : ""
        }`}
      >
        {station.name}
      </span>
      {current ? <span className="sr-only">{A11Y.currentStation}</span> : null}
    </Link>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      {open ? (
        <path
          d="M3 3 L13 13 M13 3 L3 13"
          stroke="currentColor"
          strokeWidth="2"
        />
      ) : (
        <path
          d="M2 4 H14 M2 8 H14 M2 12 H14"
          stroke="currentColor"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}
