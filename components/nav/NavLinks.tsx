"use client";

import type { NavSection } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./useActiveSection";

/**
 * Centred link row with the active section marked by a filled pill.
 *
 * Isolated as a client island so the scroll-driven active state re-renders
 * only the link list, not the whole header.
 */
export default function NavLinks({ sections }: { sections: NavSection[] }) {
  const activeId = useActiveSection(sections);

  return (
    <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border bg-surface/50 p-1 lg:flex">
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "block rounded-full px-3.5 py-2 font-mono text-xs uppercase tracking-label transition-colors duration-ui",
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground"
              )}
            >
              {section.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
