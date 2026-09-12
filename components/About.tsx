import Section from "./Section";
import Reveal from "./motion/Reveal";

/** Numbered strengths — the specific things worth being hired for. */
export default function About({ coreStrengths }: { coreStrengths?: string[] }) {
  if (!coreStrengths || coreStrengths.length === 0) return null;

  return (
    <Section id="about" index="05" label="Strengths">
      <Reveal stagger className="border-t">
        {coreStrengths.map((strength, i) => (
          <div key={strength} className="flex items-baseline gap-5 border-b py-5 sm:gap-8">
            <span className="font-mono text-xs text-highlight" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
              {strength}
            </span>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
