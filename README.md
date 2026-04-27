# Hire Mark CRE Site

Public website for Mark Melanson's CRE finance, Excel, AI tooling, and research platform.

## First Read

- `AGENTS.md`
- `docs/00_overview.md`
- `docs/10_site_strategy.md`
- `docs/11_teaser_variation_directions.md` for active teaser redesign concepts and test variations
- `docs/50_harness_contract.md`
- `docs/60_harness_execution_plan.md`

## Commands

```powershell
npm install
npm run dev
npm run verify
npm run build
npm run preview
```

`npm run verify` is the canonical harness gate. It runs lint, production build, content validation, and browser smoke checks.

## Route Graph

- `/` teaser / launch shell
- `/home` content-rich homepage
- `/home-preview` homepage alias
- `/projects`
- `/projects/:slug`
- `/prompts`
- `/about`
- `/newsletter` (explicitly inert until a real provider is wired)
- `/tools`
- `*` 404

## Structure

```text
docs/           repo strategy, decisions, deployment notes, archive
public/         static public assets
public/case-studies/ public-safe case-study HTML/PDF exports
public/research/ published research packages and LinkedIn document assets
scripts/        verification scripts (content validation + smoke)
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

Copied routing context from that workspace lives under `docs/source-context/`; web-addressable copied artifacts live under `public/`.
