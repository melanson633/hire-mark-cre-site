# Repo Overview

## Purpose

This repo is the standalone codebase for the public-facing `hire-mark.net` website.

It is designed to market and eventually commercialize:

- Excel and underwriting templates
- AI-enabled CRE workflow tools
- Operator-focused research and newsletter content

## Current State

- Stack: Vite + React
- Current route graph:
  - `/` teaser / launch shell
  - `/home` content-rich homepage
  - `/home-preview` homepage alias
  - `/projects`
  - `/projects/:slug`
  - `/prompts`
  - `/about`
  - `/newsletter` (explicitly inert until provider wiring)
  - `/tools`
  - `*` 404
- Deployment target: Vercel
- Primary domain: `hire-mark.net`
- Redirect domains: `www.hire-mark.net`, `hire-mark-cre.com`, `www.hire-mark-cre.com`

## Canonical Read Order

1. `../AGENTS.md`
2. `AGENTS.md`
3. `10_site_strategy.md`
4. `11_teaser_variation_directions.md` when working on `/` teaser redesigns or visual-system test builds
5. `50_harness_contract.md`
6. `60_harness_execution_plan.md`
7. `../src/content/README.md`
8. Only then the specific content, section, or deployment files needed

## Source Context

The cousin workspace at `C:\Users\melan\Documents\Job_Search` may contain source facts, project examples, and draft language.

That workspace is not a dependency. Distill and copy approved public-safe content into this repo.
