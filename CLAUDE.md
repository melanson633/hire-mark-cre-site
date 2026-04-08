# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Vite 7 + React 19 SPA (JavaScript, no TypeScript). Single global CSS file at `src/styles/global.css`. No CSS framework.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the built site locally
- `npm run lint` — ESLint (React + hooks rules)

## Content Model

Publishable copy lives in `src/content/` as structured JS modules — not scattered in JSX. When editing user-facing text, change the content file, not the component.

Key content files: `siteMeta.js` (brand/nav/SEO), `home.js` (homepage copy), `caseStudies/` (showcase items), `research/` (themes/newsletter), `newsletter.js`.

## Architecture

`index.html` → `src/main.jsx` → `App.jsx` → `HomePage.jsx` → section components in `src/sections/`.

Fonts loaded via Google Fonts in `index.html`: Instrument Serif, Manrope, Space Mono.

## Deployment

Vercel auto-deploys on push to master. No CI/CD pipeline — Vercel handles builds.

Primary domain: `hire-mark.net`. Redirects configured in `vercel.json` for www and hire-mark-cre.com variants.

## Cousin Repo

`C:\Users\melan\Documents\Job_Search` is a read-only source for career facts and draft materials. No runtime dependencies, imports, or symlinks to it. Distill and copy approved content into this repo.

## Strategy Docs

For positioning, content pipeline, and deployment details: `@docs/10_site_strategy.md`, `@docs/20_content_pipeline.md`, `@docs/30_deployment.md`.

## Content Research

`@docs/35_cre_finance_content_research.md` — distilled research on what CRE finance/accounting professionals engage with most (topic tiers, format matrix, SEO keywords, LinkedIn playbook, conversion drivers, site-specific gaps). Reference this when creating or prioritizing content.

## Rules

- Run `npm run build` before declaring work complete.
- Keep the site deployable as a standalone repo.
- Prefer simple Vite/React patterns over framework sprawl.
- Delete stale code instead of accumulating clutter.
