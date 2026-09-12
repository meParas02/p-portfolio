"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { observeReveal } from "@/lib/reveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Delay before this block animates, in milliseconds. */
  delay?: number;
  /**
   * Cascades the reveal across direct children instead of moving the block as
   * one piece. Use for lists and grids; the stagger is CSS-only.
   */
  stagger?: boolean;
  className?: string;
}

/**
 * Fades and lifts its children the first time they scroll into view.
 *
 * The visual state lives entirely in CSS (`[data-reveal]` in globals.css), so
 * this component only toggles an attribute — no re-render on intersection, and
 * reduced-motion users are opted out by the stylesheet rather than a branch
 * here. Deliberately always a `div`: a generic `as` prop would push a union of
 * every element's props through JSX for no real gain.
 */
export default function Reveal({
  children,
  delay = 0,
  stagger = false,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return observeReveal(element);
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      {...(stagger ? { "data-reveal-group": "" } : {})}
      style={delay ? { ["--reveal-delay" as string]: `${delay}ms` } : undefined}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
