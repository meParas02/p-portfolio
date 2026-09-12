import { ArrowUpRight } from "lucide-react";
import type { Personal, Social } from "@/lib/types";
import Reveal from "./motion/Reveal";

interface ContactProps {
  personal: Personal;
  socials: Social[];
}

/**
 * The closing section breaks the sticky-rail rhythm on purpose: after five
 * sections of the same two-column grid, a full-width statement reads as an
 * ending rather than one more entry in the list.
 */
export default function Contact({ personal, socials }: ContactProps) {
  // Email and phone are dialable/mailable on a phone; location is not, so it
  // stays plain text rather than being wrapped in a link that goes nowhere.
  const details: Array<{ value: string; href?: string }> = [
    { value: personal.email, href: `mailto:${personal.email}` },
    ...(personal.phone
      ? [{ value: personal.phone, href: `tel:${personal.phone.replace(/\s+/g, "")}` }]
      : []),
    { value: personal.location },
  ];

  return (
    <section id="contact" className="section-defer border-b py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-container px-6 sm:px-8">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-highlight" aria-hidden="true">
            06
          </span>
          <p className="font-mono text-xs uppercase tracking-label text-muted">Contact</p>
        </div>

        <Reveal>
          <h2 className="mt-6 max-w-4xl text-statement font-medium tracking-tight text-balance sm:mt-8">
            Let&apos;s build something worth shipping.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <a
            href={`mailto:${personal.email}`}
            className="group mt-8 inline-flex max-w-full items-center gap-3 py-1 sm:mt-10 sm:gap-5"
          >
            <span className="link-underline min-w-0 break-all text-xl font-medium tracking-tight sm:text-3xl">
              {personal.email}
            </span>
            <ArrowUpRight
              className="shrink-0 text-highlight transition-transform duration-ui group-hover:translate-x-1 group-hover:-translate-y-1"
              size={28}
              aria-hidden="true"
            />
          </a>
        </Reveal>

        <Reveal
          delay={140}
          className="mt-10 flex flex-col gap-2 border-t pt-5 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-6"
        >
          <ul className="flex flex-col gap-y-1 font-mono text-xs uppercase tracking-label text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
            {details.map((detail) => (
              <li key={detail.value}>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="link-underline -my-2 inline-block py-2 transition-colors duration-micro hover:text-foreground"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span className="inline-block py-2 sm:py-0">{detail.value}</span>
                )}
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-x-6">
            {socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.url}
                  target={social.icon === "mail" ? undefined : "_blank"}
                  rel={social.icon === "mail" ? undefined : "noreferrer noopener"}
                  className="link-underline -my-2 inline-block py-2 font-mono text-xs uppercase tracking-label transition-colors duration-micro hover:text-highlight"
                >
                  {social.platform}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
