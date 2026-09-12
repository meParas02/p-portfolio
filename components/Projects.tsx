import Section from "./Section";
import Reveal from "./motion/Reveal";
import ProjectList from "./ProjectList";
import type { Project } from "@/lib/types";

export default function Projects({ items }: { items: Project[] }) {
  if (items.length === 0) return null;

  return (
    <Section id="projects" index="02" label="Selected work">
      <Reveal stagger>
        <ProjectList items={items} />
      </Reveal>
    </Section>
  );
}
