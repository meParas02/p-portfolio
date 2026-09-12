import { ArrowUp } from "lucide-react";
import type { Personal } from "@/lib/types";

export default function Footer({ personal }: { personal: Personal }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6">
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 px-6 font-mono text-xs uppercase tracking-label text-muted sm:flex-row sm:justify-between sm:px-8">
        <p>
          © {year} {personal.name}
        </p>
        <a
          href="#top"
          className="group -my-3 inline-flex items-center gap-2 py-3 transition-colors duration-micro hover:text-foreground"
        >
          Back to top
          <ArrowUp
            size={13}
            aria-hidden="true"
            className="transition-transform duration-ui group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
}
