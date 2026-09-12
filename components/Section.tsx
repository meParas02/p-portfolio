import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./motion/Reveal";

interface SectionProps {
  id: string;
  /** Two-digit index shown in the rail, e.g. "02". */
  index: string;
  label: string;
  children: ReactNode;
  /** Draws the hairline that separates stacked sections. */
  bordered?: boolean;
  /**
   * Lets the browser skip layout/paint while the section is offscreen. Safe
   * for anything below the fold; leave off for content visible on first paint.
   */
  deferOffscreen?: boolean;
  className?: string;
}

/**
 * Editorial two-column section: a narrow rail carrying the index and label,
 * and a wide content column.
 *
 * The rail sticks while its section scrolls, so the reader always has a
 * heading in view without the page repeating one at every scroll position.
 * Below `lg` it collapses to a single inline label above the content, since a
 * sticky rail on a phone would just eat the viewport.
 */
export default function Section({
  id,
  index,
  label,
  children,
  bordered = true,
  deferOffscreen = true,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-10 sm:py-14 lg:py-20",
        bordered && "border-b",
        deferOffscreen && "section-defer",
        className
      )}
    >
      <div className="mx-auto grid max-w-container grid-cols-1 gap-y-5 px-6 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-7">
        <Reveal className="lg:col-span-3">
          <div className="flex items-baseline gap-4 lg:sticky lg:top-24 lg:flex-col lg:items-start lg:gap-3">
            <span className="font-mono text-xs text-highlight" aria-hidden="true">
              {index}
            </span>
            <h2 className="font-mono text-xs uppercase tracking-label text-muted">{label}</h2>
            <span className="hidden h-px w-10 bg-border lg:block" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="min-w-0 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
