import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

function headerOffset() {
  const header = document.querySelector("header");
  return (header?.getBoundingClientRect().height ?? 80) + 12;
}

export function smoothScrollTo(top: number) {
  const next = Math.max(0, top);
  if (lenis) {
    lenis.scrollTo(next, { duration: 1.2, immediate: false });
    return;
  }
  window.scrollTo({ top: next, behavior: "smooth" });
}

export function smoothScrollToElement(element: HTMLElement) {
  const offset = -headerOffset();
  if (lenis) {
    lenis.scrollTo(element, { offset, duration: 1.2, immediate: false });
    return;
  }
  const top = window.scrollY + element.getBoundingClientRect().top + offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
