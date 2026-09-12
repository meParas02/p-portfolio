import Section from "./Section";
import Reveal from "./motion/Reveal";
import ExperienceRow from "./ExperienceRow";
import type { Experience as ExperienceItem } from "@/lib/types";

interface ExperienceProps {
  items: ExperienceItem[];
  strengths?: string[];
}

export default function Experience({ items, strengths = [] }: ExperienceProps) {
  if (items.length === 0 && strengths.length === 0) return null;

  return (
    <Section id="experience" index="01" label="Experience">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {items.length > 0 && (
          <Reveal stagger className="flex flex-col gap-3 lg:col-span-7">
            {items.map((item) => (
              <ExperienceRow key={`${item.company}-${item.startDate}`} item={item} />
            ))}
          </Reveal>
        )}

        {strengths.length > 0 && (
          <Reveal className={items.length > 0 ? "lg:col-span-5" : "lg:col-span-12"}>
            <aside className="rounded-2xl border bg-surface p-5 sm:p-6 lg:sticky lg:top-24">
              <p className="font-mono text-[0.6875rem] uppercase tracking-label text-muted">
                Strengths
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {strengths.map((strength, i) => (
                  <li
                    key={strength}
                    className="flex gap-3 rounded-xl border border-border/80 bg-background px-3.5 py-3"
                  >
                    <span
                      className="mt-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-highlight/30 bg-highlight/10 font-mono text-[0.625rem] text-highlight"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/85">{strength}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
