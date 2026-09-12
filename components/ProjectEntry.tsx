"use client";

import type { Ref } from "react";
import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAccordionPanel } from "./motion/useAccordionPanel";

interface ProjectEntryProps {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  articleRef?: Ref<HTMLElement>;
}

export default function ProjectEntry({
  project,
  index,
  isOpen,
  onToggle,
  articleRef,
}: ProjectEntryProps) {
  const panelId = `project-panel-${index}`;
  const defaultOpen = index === 0;
  const { innerRef, panelStyle, onTransitionEnd } = useAccordionPanel(isOpen, defaultOpen);

  return (
    <article
      ref={articleRef}
      className={cn(
        "scroll-mt-[5.75rem] overflow-hidden rounded-2xl border transition-all duration-500 ease-out",
        isOpen
          ? "border-foreground/20 bg-surface ring-1 ring-inset ring-foreground/5"
          : "border-border bg-background hover:border-foreground/15 hover:bg-surface/50"
      )}
    >
      <button
        type="button"
        id={`project-trigger-${index}`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="grid w-full grid-cols-1 gap-x-6 gap-y-2 px-4 py-3 text-left sm:px-5 sm:py-3.5 lg:grid-cols-12"
      >
        <div className="flex flex-wrap items-center gap-2 lg:col-span-3 lg:flex-col lg:items-start lg:gap-1.5">
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[0.6875rem] transition-colors duration-500 ease-out",
              isOpen
                ? "border-highlight/30 bg-highlight/10 text-highlight"
                : "border-border bg-background text-highlight"
            )}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.period && (
            <span className="font-mono text-[0.6875rem] uppercase tracking-label text-muted">
              {project.period}
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-3 lg:col-span-9">
          <div className="min-w-0">
            <h3 className="text-base font-medium tracking-tight sm:text-lg">{project.name}</h3>
            {project.category && (
              <p className="mt-1 text-xs text-muted sm:text-sm">{project.category}</p>
            )}
          </div>

          <span
            className={cn(
              "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out sm:h-8 sm:w-8",
              isOpen
                ? "border-foreground/20 bg-foreground text-background"
                : "border-border bg-background text-muted"
            )}
            aria-hidden="true"
          >
            <ChevronDown
              size={14}
              className={cn("transition-transform duration-500 ease-out", isOpen && "rotate-180")}
            />
          </span>
        </div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={`project-trigger-${index}`}
        aria-hidden={!isOpen}
        style={panelStyle}
        onTransitionEnd={onTransitionEnd}
        className={cn(
          "project-accordion-panel",
          isOpen && "project-accordion-panel-open",
          !isOpen && "pointer-events-none"
        )}
      >
        <div ref={innerRef}>
          <div className="project-accordion-body border-t px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
            <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-12">
              <div className="hidden lg:block lg:col-span-3" aria-hidden="true" />

              <div className="lg:col-span-9">
                <p className="max-w-2xl text-base leading-relaxed text-foreground/85">
                  {project.description}
                </p>

                {project.highlights.length > 0 && (
                  <ul className="mt-4 flex max-w-2xl flex-col gap-2.5">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 rounded-xl border border-border/80 bg-background/60 px-3.5 py-2.5 text-sm leading-relaxed text-foreground/80"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-highlight"
                          aria-hidden="true"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs uppercase tracking-label text-foreground/75"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {(project.url || project.github) && (
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors duration-micro hover:border-foreground hover:bg-foreground hover:text-background"
                      >
                        Live site
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors duration-micro hover:border-foreground hover:bg-foreground hover:text-background"
                      >
                        <Github size={14} aria-hidden="true" />
                        Source
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
