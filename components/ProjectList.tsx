"use client";

import { useRef, useState } from "react";
import ProjectEntry from "./ProjectEntry";
import type { Project } from "@/lib/types";
import { smoothScrollToElement } from "@/lib/smooth-scroll";

const DEFAULT_OPEN_INDEX = 0;
const ACCORDION_MS = 520;

export default function ProjectList({ items }: { items: Project[] }) {
  const [openIndex, setOpenIndex] = useState(DEFAULT_OPEN_INDEX);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollTimer = useRef<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));

    const target = itemRefs.current[index];
    if (target) smoothScrollToElement(target);

    if (scrollTimer.current) window.clearTimeout(scrollTimer.current);

    // Other panels are still collapsing — retarget once heights settle.
    scrollTimer.current = window.setTimeout(() => {
      const settled = itemRefs.current[index];
      if (settled) smoothScrollToElement(settled);
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
