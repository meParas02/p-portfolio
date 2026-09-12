"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { NavSection } from "@/lib/types";

const PANEL_ID = "mobile-nav-panel";

interface MobileNavProps {
  name: string;
  sections: NavSection[];
  resumeUrl?: string;
}

export default function MobileNav({ name, sections, resumeUrl }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      // Keep focus inside the dialog while it owns the screen.
      const focusable = panel.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full"
      >
        <span className="block h-px w-5 bg-foreground" aria-hidden="true" />
        <span className="block h-px w-5 bg-foreground" aria-hidden="true" />
      </button>

      {/* Mounted on demand so the closed menu costs no DOM or layout. */}
      {isOpen && (
        <div
          ref={panelRef}
          id={PANEL_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 bg-background lg:hidden"
        >
          <div className="flex h-20 items-center justify-between px-6">
            <span className="font-mono text-xs uppercase tracking-label text-muted">{name}</span>
            <button
              data-autofocus
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="-mr-3 flex h-11 w-11 items-center justify-center rounded-full text-foreground"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <ul className="flex flex-col px-6 pt-6">
            {sections.map((section, i) => (
              <li
                key={section.id}
                className="menu-in border-b"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <a
                  href={`#${section.id}`}
                  onClick={close}
                  className="flex items-baseline gap-4 py-5"
                >
                  <span className="font-mono text-xs text-muted" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-3xl font-medium tracking-tight">{section.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {resumeUrl && (
            <div className="px-6 pt-10">
              <a
                href={resumeUrl}
                download
                onClick={close}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-base font-medium text-background"
              >
                Download résumé
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
