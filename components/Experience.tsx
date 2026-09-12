import Section from "./Section";
import Reveal from "./motion/Reveal";
import ExperienceRow from "./ExperienceRow";
import type { Experience as ExperienceItem } from "@/lib/types";

export default function Experience({ items }: { items: ExperienceItem[] }) {
  if (items.length === 0) return null;

  return (
    <Section id="experience" index="01" label="Experience">
      <Reveal stagger className="border-t">
        {items.map((item) => (
          <ExperienceRow key={`${item.company}-${item.startDate}`} item={item} />
        ))}
      </Reveal>
    </Section>
  );
}
