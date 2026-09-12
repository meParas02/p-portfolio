"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { setLenis, smoothScrollTo, smoothScrollToElement } from "@/lib/smooth-scroll";

function HashScroll() {
  const lenis = useLenis();

  useEffect(() => {
    setLenis(lenis ?? null);
    return () => setLenis(null);
  }, [lenis]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) {
        return;
      }

      const target = (event.target as HTMLElement | null)?.closest("a[href^='#']");
      if (!(target instanceof HTMLAnchorElement)) return;

      const hash = target.getAttribute("href");
      if (!hash || hash === "#") return;

      if (hash === "#top") {
        event.preventDefault();
        smoothScrollTo(0);
        history.replaceState(null, "", "#top");
        return;
      }

      const id = decodeURIComponent(hash.slice(1));
      const element = document.getElementById(id);
      if (!element) return;

      event.preventDefault();
      smoothScrollToElement(element);
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        lerp: 0.08,
        smoothWheel: true,
        autoRaf: true,
        anchors: false,
        respectReducedMotion: false,
      }}
    >
      <HashScroll />
      {children}
    </ReactLenis>
  );
}
