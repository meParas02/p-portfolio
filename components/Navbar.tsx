"use client";

import type { NavSection } from "@/lib/types";
import { cn } from "@/lib/utils";
import NavLinks from "./nav/NavLinks";
import MobileNav from "./nav/MobileNav";
import ThemeToggle from "./nav/ThemeToggle";
import ScrollProgress from "./nav/ScrollProgress";
import { useScrolled } from "./nav/useScrolled";

interface NavbarProps {
  name: string;
  sections: NavSection[];
  resumeUrl?: string;
}

/**
 * The header rides on the page unstyled until the reader scrolls, then fades
 * in a fill and hairline. Blur is gated to md and up: `backdrop-filter`
 * re-composites the region behind a fixed element on every scroll frame, which
 * is the single most expensive thing on the page for a mid-range phone.
 */
export default function Navbar({ name, sections, resumeUrl }: NavbarProps) {
  const scrolled = useScrolled();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-ui",
        scrolled
          ? "border-b bg-background/90 md:bg-background/70 md:backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-container items-center justify-between px-6 sm:px-8"
      >
        <a href="#top" className="group -my-2 flex items-center gap-2.5 py-2">
          <span
            className="h-1.5 w-1.5 rounded-full bg-highlight transition-transform duration-ui group-hover:scale-150"
            aria-hidden="true"
          />
          <span className="text-sm font-medium tracking-tight">{name}</span>
        </a>

        <NavLinks sections={sections} />

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {resumeUrl && (
            <a
              href={resumeUrl}
              download
              className="rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-label transition-colors duration-micro hover:border-foreground hover:bg-foreground hover:text-background"
            >
              Resume
            </a>
          )}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <MobileNav name={name} sections={sections} resumeUrl={resumeUrl} />
        </div>
      </nav>

      <ScrollProgress />
    </header>
  );
}
