import Section from "./Section";
import Reveal from "./motion/Reveal";
import type { SkillGroup } from "@/lib/types";

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <Section id="skills" index="03" label="Stack">
      <Reveal stagger className="border-t">
        {groups.map((group) => (
          <div
            key={group.category}
            className="grid grid-cols-1 gap-x-10 gap-y-3 border-b py-5 lg:grid-cols-12"
          >
            <p className="font-mono text-xs uppercase tracking-label text-muted lg:col-span-3">
              {group.category}
            </p>

            <ul className="flex flex-wrap gap-2 lg:col-span-9">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border px-3 py-1 text-sm text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
