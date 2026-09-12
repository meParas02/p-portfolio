"use client";

import { useRef, useState } from "react";
import ProjectEntry from "./ProjectEntry";
import type { Project } from "@/lib/types";

const DEFAULT_OPEN_INDEX = 0;
const ACCORDION_MS = 520;

function pinUnderHeader(element: HTMLElement) {
  const header = document.querySelector("header");
  const offset = (header?.getBoundingClientRect().height ?? 80) + 12;
  const top = window.scrollY + element.getBoundingClientRect().top - offset;
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

  window.scrollTo({ top: Math.max(0, top), behavior });
}

export default function ProjectList({ items }: { items: Project[] }) {
  const [openIndex, setOpenIndex] = useState(DEFAULT_OPEN_INDEX);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollTimer = useRef<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));

    const target = itemRefs.current[index];
    if (target) pinUnderHeader(target);

    if (scrollTimer.current) window.clearTimeout(scrollTimer.current);

    // Layout shifts as other panels collapse — pin again once heights settle.
    scrollTimer.current = window.setTimeout(() => {
      const settled = itemRefs.current[index];
      if (settled) pinUnderHeader(settled);
    }, ACCORDION_MS);
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {items.map((project, index) => (
        <ProjectEntry
          key={project.name}
          project={project}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          articleRef={(node) => {
            itemRefs.current[index] = node;
          }}
        />
      ))}
    </div>
  );
}
