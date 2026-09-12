# Paras Mehta — Portfolio

Personal portfolio site built with Next.js App Router, React, TypeScript, and Tailwind CSS. All content is sourced from [`data/resume.json`](./data/resume.json), extracted from the resume PDF — no fabricated experience, projects, or stats.

## Stack

- Next.js 16 (App Router, Server Components by default)
- React 19 + TypeScript (strict)
- Tailwind CSS with a CSS-variable design-token system (`app/globals.css`)
- `next/font` (Manrope for body, JetBrains Mono for meta) — self-hosted, no runtime font requests
- `lucide-react` for icons
- Light/dark mode via a `class` strategy with a pre-hydration inline script to avoid flash-of-wrong-theme

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Project structure

```
app/                  # App Router: layout, page, global styles
components/           # Presentational components, consume data/resume.json
data/resume.json      # Single source of truth for all resume content
lib/                  # Shared types + utils
public/resume/        # Downloadable resume PDF
```

## Content

Update `data/resume.json` to change any content on the site — personal info, socials, skills, experience, projects, education, certifications, achievements. Sections with empty arrays are automatically omitted from the UI (e.g. certifications/achievements are currently empty because the source resume doesn't list any).

## Notes

- No profile photo, personal website, or certifications were present in the source resume, so those UI slots are conditionally omitted rather than filled with placeholders.
- Company-level bullet achievements weren't itemized per employer in the source resume (they were grouped under "Key Projects" instead), so the Experience section shows role/company/dates and the Projects section carries the detailed bullets and tech stacks.
