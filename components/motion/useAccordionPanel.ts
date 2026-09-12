"use client";

import { useLayoutEffect, useRef, useState, type TransitionEvent } from "react";

/**
 * Height-driven accordion animation. Measures content so open/close eases
 * reliably across browsers (grid-template-rows transitions are inconsistent).
 */
export function useAccordionPanel(isOpen: boolean, defaultOpen = false) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(defaultOpen ? "auto" : 0);
  const skipNextAnimation = useRef(defaultOpen);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    if (skipNextAnimation.current) {
      skipNextAnimation.current = false;
      setHeight(isOpen ? "auto" : 0);
      return;
    }

    if (isOpen) {
      setHeight(0);
      requestAnimationFrame(() => {
        setHeight(el.scrollHeight);
      });
      return;
    }

    setHeight(el.scrollHeight);
    requestAnimationFrame(() => {
      setHeight(0);
    });
  }, [isOpen]);

  const onTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "height" || !isOpen) return;
    setHeight("auto");
  };

  const panelStyle = { height: height === "auto" ? "auto" : `${height}px` };

  return { innerRef, panelStyle, onTransitionEnd };
}
