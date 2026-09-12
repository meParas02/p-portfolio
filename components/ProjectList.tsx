"use client";

import { useState } from "react";
import ProjectEntry from "./ProjectEntry";
import type { Project } from "@/lib/types";

export default function ProjectList({ items }: { items: Project[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {items.map((project, index) => (
        <ProjectEntry
          key={project.name}
          project={project}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
        />
      ))}
    </div>
  );
}
