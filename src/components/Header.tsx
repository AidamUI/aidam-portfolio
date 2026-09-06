"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { A11Y, SITE } from "@/content/site";
import { STATIONS } from "@/content/stations";
import { stageFromPathname } from "@/lib/stage";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { TrailMarker } from "./mountain/TrailMarker";
import { ThemeToggle } from "./ThemeToggle";

/**
 * The header: wordmark, a pill nav, the trail marker (a miniature of the
 * whole ascent, with a dot advancing as the current page is scrolled), and
 * the day/night toggle. The active page is marked two ways so colour is never
 * the only signal: `aria-current="page"` for assistive tech, and a filled
 * pill plus heavier weight for sighted readers.
 */
export function Header() {
  const pathname = usePathname();
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
    <header className="border-line bg-card/95 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-3.5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
          aria-current={isCurrent("/") ? "page" : undefined}
        >
          {SITE.wordmark}
        </Link>

        <nav aria-label={A11Y.primaryNav} className="hidden sm:block">
          <ul className="flex items-center gap-1">
            {STATIONS.map((station) => {
              const current = isCurrent(station.href);
              return (
                <li key={station.href}>
                  <Link
                    href={station.href}
                    aria-current={current ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      current
                        ? "bg-pill-bg text-pill-ink"
                        : "text-mut hover:text-ink"
                    }`}
                  >
                    <span
                      className={
                        current
                          ? "underline decoration-2 underline-offset-4"
                          : ""
                      }
                    >
                      {station.name}
                    </span>
                    {current ? (
                      <span className="sr-only"> ({A11Y.currentPage})</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <TrailMarker
            stage={stageFromPathname(pathname)}
            progress={progress}
          />
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
            className="hover:bg-pill-bg inline-flex h-9 w-9 items-center justify-center rounded-full sm:hidden"
          >
            <MenuGlyph open={open} />
            <span className="sr-only">
              {open ? A11Y.closeMenu : A11Y.openMenu}
            </span>
          </button>
        </div>
      </div>

      <div
        id={menuId}
        ref={panelRef}
        hidden={!open}
        className="border-line bg-card border-t sm:hidden"
      >
        <nav aria-label={A11Y.primaryNav}>
          <ul>
            {STATIONS.map((station) => {
              const current = isCurrent(station.href);
              return (
                <li key={station.href} className="border-line border-b">
                  <Link
                    href={station.href}
                    aria-current={current ? "page" : undefined}
                    className="block px-6 py-4 sm:px-8"
                  >
                    <span
                      className={`block text-base ${
                        current
                          ? "text-ink font-semibold underline decoration-2 underline-offset-4"
                          : "text-ink"
                      }`}
                    >
                      {station.name}
                    </span>
                    <span className="text-mut mt-1 block text-sm">
                      {station.blurb}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      {open ? (
        <path
          d="M3 3 L13 13 M13 3 L3 13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M2 4 H14 M2 8 H14 M2 12 H14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
