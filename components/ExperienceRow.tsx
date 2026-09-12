import type { Experience } from "@/lib/types";

/**
 * A single role as a compact card. Hover wipe stays transform-only so the
 * list never triggers layout while the pointer moves down it.
 */
export default function ExperienceRow({ item }: { item: Experience }) {
  return (
    <article className="row-wipe relative isolate overflow-hidden rounded-2xl border px-4 py-4 transition-colors duration-ui sm:px-5 sm:py-5">
      <p className="font-mono text-[0.6875rem] uppercase tracking-label text-muted">
        {item.startDate} — {item.endDate}
      </p>

      <h3 className="mt-2 text-base font-medium tracking-tight sm:text-lg">{item.role}</h3>
      <p className="mt-1.5 text-sm text-muted">
        {item.company}
        {item.companyNote && <span> · {item.companyNote}</span>}
        <span> · {item.location}</span>
      </p>

      {item.description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80">
          {item.description}
        </p>
      )}

      {item.achievements && item.achievements.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {item.achievements.map((achievement) => (
            <li
              key={achievement}
              className="flex gap-3 text-sm leading-relaxed text-foreground/80"
            >
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-highlight"
                aria-hidden="true"
              />
              {achievement}
            </li>
          ))}
        </ul>
      )}

      {item.technologies && item.technologies.length > 0 && (
        <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-label text-muted">
          {item.technologies.join(" / ")}
        </p>
      )}
    </article>
  );
}
