/**
 * One IntersectionObserver shared by every reveal on the page.
 *
 * A portfolio has ~40 revealed blocks. Giving each its own observer means 40
 * separate callback registrations for identical options; a single instance
 * batches all of them into one callback per frame. Targets are unobserved once
 * they have played, so the observer's set shrinks as the reader scrolls.
 */

const REVEAL_OPTIONS: IntersectionObserverInit = {
  // Fire slightly before the block reaches the bottom edge, so the motion
  // reads as "already arriving" rather than starting under the reader's eye.
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.08,
};

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;

  observer ??= new IntersectionObserver((entries, self) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.setAttribute("data-reveal", "in");
      self.unobserve(entry.target);
    }
  }, REVEAL_OPTIONS);

  return observer;
}

/** Observes `element` and returns its cleanup function. */
export function observeReveal(element: Element): () => void {
  const instance = getObserver();

  // No observer support: show the content immediately rather than never.
  if (!instance) {
    element.setAttribute("data-reveal", "in");
    return () => {};
  }

  instance.observe(element);
  return () => instance.unobserve(element);
}
