import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

function headerOffset() {
  const header = document.querySelector("header");
  return (header?.getBoundingClientRect().height ?? 80) + 12;
}

/** Absolute page Y for an element, using Lenis scroll if it is driving the page. */
function pageY(element: HTMLElement) {
  const current = lenis ? lenis.scroll : window.scrollY;
  return current + element.getBoundingClientRect().top;
}

export function smoothScrollTo(top: number) {
  const next = Math.max(0, top);
  if (lenis) {
    lenis.scrollTo(next, { duration: 0.9, lock: true, force: true });
    return;
  }
  window.scrollTo({ top: next, behavior: "smooth" });
}

export function smoothScrollToElement(element: HTMLElement) {
  const paddingTop = parseFloat(getComputedStyle(element).paddingTop) || 0;
  const top = Math.max(0, pageY(element) + paddingTop - headerOffset());

  if (lenis) {
    lenis.scrollTo(top, { duration: 0.9, lock: true, force: true });
    return;
  }
  window.scrollTo({ top, behavior: "smooth" });
}
