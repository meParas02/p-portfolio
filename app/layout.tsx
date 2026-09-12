import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import resume from "@/data/resume.json";
import type { Resume } from "@/lib/types";
import "./globals.css";

const data = resume as Resume;

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Reserved for meta: section indices, dates, tags. The width difference is what
// signals "data" against the proportional body copy.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const siteTitle = `${data.personal.name} — ${data.personal.title}`;
const siteDescription = data.about;

// Set NEXT_PUBLIC_SITE_URL in the deployment env so Open Graph/Twitter tags
// resolve to absolute URLs. Left unset locally rather than hardcoding a guess.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: data.personal.name }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a09" },
  ],
};

const themeScript = `(function(){try{var s=localStorage.getItem("theme");if(s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.classList.add("dark")}catch(e){}})()`;

// Scroll reveals are driven by JS; without it every revealed block would stay
// at opacity 0. This is the cheapest possible fallback.
const noScriptStyles = `[data-reveal]{opacity:1!important;transform:none!important}`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: data.personal.name,
  jobTitle: data.personal.title,
  email: `mailto:${data.personal.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: data.personal.location,
  },
  sameAs: data.socials.filter((s) => s.icon !== "mail").map((s) => s.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noScriptStyles }} />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      {/*
       * `suppressHydrationWarning` covers extensions such as Grammarly, which
       * inject attributes onto <body> between the server HTML arriving and
       * React hydrating. It only silences attribute diffs on this element —
       * mismatches in the tree below are still reported.
       */}
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
