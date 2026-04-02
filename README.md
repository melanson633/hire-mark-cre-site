# Hire Mark CRE Site

Public website for Mark Melanson's CRE finance, Excel, AI tooling, and research platform.

## First Read

- `AGENTS.md`
- `docs/00_overview.md`
- `docs/10_site_strategy.md`

## Commands

```powershell
npm install
npm run dev
npm run build
npm run preview
```

## Structure

```text
docs/           repo strategy, decisions, deployment notes, archive
public/         static public assets
scripts/        helper scripts if needed later
src/content/    structured publishable content
src/pages/      page-level assembly
src/sections/   homepage sections
src/components/ shared UI components
src/styles/     global styling
```

## Content Model

- `src/content/siteMeta.js` holds site-wide metadata and contact links.
- `src/content/home.js` holds homepage copy and list content.
- `src/content/caseStudies/` holds case-study data by topic.
- `src/content/research/` holds research and newsletter-facing content.

## Cousin Workspace

Source material may come from the cousin workspace at `C:\Users\melan\Documents\Job_Search`.

That workspace is for raw professional materials. This repo holds only the distilled, public-safe version.
