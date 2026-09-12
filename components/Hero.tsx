import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Personal } from "@/lib/types";

interface HeroProps {
  personal: Personal;
}

export default function Hero({ personal }: HeroProps) {
  const meta = [personal.title, personal.tagline, personal.location].filter(Boolean).join(" — ");

  return (
    <section
      id="top"
      className="scroll-mt-24 border-b px-6 pt-24 pb-10 sm:px-8 sm:pt-28 sm:pb-12"
    >
      <div className="mx-auto w-full max-w-container">
        <p className="font-mono text-xs uppercase tracking-label text-muted">{meta}</p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <h1 className="display text-display uppercase">{personal.name}</h1>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-micro hover:opacity-85"
            >
              Selected work
              <ArrowDown
                size={15}
                aria-hidden="true"
                className="transition-transform duration-ui group-hover:translate-y-0.5"
              />
            </a>
            {personal.resumeUrl && (
              <a
                href={personal.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-micro hover:border-foreground"
              >
                Résumé
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
