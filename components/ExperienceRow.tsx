import type { Experience } from "@/lib/types";

/**
 * A single role, laid out as a full-width row rather than a card. The hover
 * wipe (`row-wipe`) animates a transform-only background panel, so running the
 * pointer down the list never triggers layout.
 */
export default function ExperienceRow({ item }: { item: Experience }) {
  return (
    <article className="row-wipe relative isolate border-b px-4 py-6 -mx-4 transition-colors duration-ui sm:py-7">
      <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-12 sm:gap-x-8">
        <p className="font-mono text-xs uppercase tracking-label text-muted sm:col-span-4">
          {item.startDate} — {item.endDate}
        </p>

        <div className="sm:col-span-8">
          <h3 className="text-row font-medium tracking-tight">{item.role}</h3>
          <p className="mt-2 text-sm text-muted">
            {item.company}
            {item.companyNote && <span> · {item.companyNote}</span>}
            <span> · {item.location}</span>
          </p>

          {item.description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
              {item.description}
            </p>
          )}

          {item.achievements && item.achievements.length > 0 && (
            <ul className="mt-4 flex flex-col gap-2">
              {item.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="flex gap-3 text-base leading-relaxed text-foreground/80"
                >
                  <span
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-highlight"
                    aria-hidden="true"
                  />
                  {achievement}
                </li>
              ))}
            </ul>
          )}

          {item.technologies && item.technologies.length > 0 && (
            <p className="mt-4 font-mono text-xs uppercase tracking-label text-muted">
              {item.technologies.join(" / ")}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
