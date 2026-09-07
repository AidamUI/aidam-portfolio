"use client";

import { useEffect, useState } from "react";

/**
 * How far down the current page the reader has scrolled, 0 to 1. Drives the
 * hero scene's parallax offset and the header's trail-marker dot.
 *
 * Updates are rAF-throttled and gated to a 0.02 delta so a decorative effect
 * never re-renders on every scroll tick. Resets to 0 on mount, so a route
 * change (a fresh page, a fresh scene) starts the marker back at its stage's
 * resting position rather than carrying over the previous page's scroll.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    function measure() {
      raf = 0;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const next = Math.min(1, y / max);
      setProgress((prev) => (Math.abs(prev - next) > 0.02 ? next : prev));
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}
