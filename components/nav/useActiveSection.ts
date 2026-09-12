"use client";

import { useEffect, useState } from "react";
import type { NavSection } from "@/lib/types";

/** Matches the breakpoint at which `NavLinks` stops being `display: none`. */
const DESKTOP_NAV_QUERY = "(min-width: 1024px)";

/**
 * Tracks which section is centred in the viewport. Uses IntersectionObserver
 * rather than a scroll listener so nothing runs on the main thread between
 * section boundaries.
 *
 * The observer is only attached while the link list it highlights is actually
 * visible, so phones pay nothing for it. The media query is re-checked on
 * change rather than on mount alone, to cover rotation and desktop resizes.
 */
export function useActiveSection(sections: NavSection[]): string {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_NAV_QUERY);
    let observer: IntersectionObserver | null = null;

    const observe = () => {
      const elements = sections
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          // Several sections can straddle the band; the highest one wins so the
          // highlight matches what the reader is looking at.
          const topMost = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

          if (topMost) setActiveId(topMost.target.id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );

      elements.forEach((el) => observer?.observe(el));
    };

    const sync = () => {
      observer?.disconnect();
      observer = null;
      if (mediaQuery.matches) observe();
    };

    sync();
    mediaQuery.addEventListener("change", sync);

    return () => {
      mediaQuery.removeEventListener("change", sync);
      observer?.disconnect();
    };
  }, [sections]);

  return activeId;
}
