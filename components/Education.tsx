import Section from "./Section";
import Reveal from "./motion/Reveal";
import type { Education as EducationItem } from "@/lib/types";

interface EducationProps {
  items: EducationItem[];
  certifications?: string[];
  achievements?: string[];
}

export default function Education({
  items,
  certifications = [],
  achievements = [],
}: EducationProps) {
  if (items.length === 0 && certifications.length === 0 && achievements.length === 0) return null;

  const lists = [
    { title: "Certifications", entries: certifications },
    { title: "Achievements", entries: achievements },
  ].filter((list) => list.entries.length > 0);

  return (
    <Section id="education" index="04" label="Education">
      {items.length > 0 && (
        <Reveal stagger className="border-t">
          {items.map((item) => (
            <div
              key={item.institution}
              className="grid grid-cols-1 gap-y-2 border-b py-5 sm:grid-cols-12 sm:gap-x-8"
            >
              <p className="font-mono text-xs uppercase tracking-label text-muted sm:col-span-4">
                {item.startDate} — {item.endDate}
              </p>

              <div className="sm:col-span-8">
                <h3 className="text-lg font-medium tracking-tight">{item.institution}</h3>
                <p className="mt-1.5 text-base text-foreground/80">
                  {item.degree}
                  {item.field && `, ${item.field}`}
                </p>
                <p className="mt-1.5 text-sm text-muted">
                  {[item.detail, item.location].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      )}

      {lists.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {lists.map((list) => (
            <div key={list.title}>
              <p className="font-mono text-xs uppercase tracking-label text-muted">{list.title}</p>
              <Reveal stagger className="mt-4 flex flex-col gap-2.5">
                {list.entries.map((entry) => (
                  <p key={entry} className="text-base leading-relaxed text-foreground/85">
                    {entry}
                  </p>
                ))}
              </Reveal>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
