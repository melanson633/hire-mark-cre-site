# Hire Mark CRE Site

## Purpose

Build and maintain the public-facing website for Mark Melanson's CRE finance, AI tools, templates, and research platform.

This repo is for website code and publishable site content only.

## Canonical Files

- `README.md` for setup, commands, and repo layout
- `docs/00_overview.md` for first-read repo context
- `docs/10_site_strategy.md` for positioning and page intent
- `docs/20_content_pipeline.md` for how source material is pulled in from the cousin workspace
- `src/content` for current publishable copy and structured site content
- `docs/source-context` for minimal copied upstream context and routing notes
- `public` for web-addressable artifact exports and static assets

## Cousin Repo Context

A related workspace exists at `C:\Users\melan\Documents\Job_Search`.

Treat that workspace as a read-only source for career facts, examples, positioning inputs, and draft materials.

Do not create runtime dependencies, imports, symlinks, or build steps that require the cousin repo to exist.

If content from `Job_Search` is needed, distill and copy the approved public version into this repo.

Do not modify `Job_Search` from this repo unless explicitly asked.

Copied source context belongs in `docs/source-context/`. Publishable HTML, PDF, image, and workbook exports belong in `public/`. Raw evidence folders such as `00_user_context/` should not be copied wholesale.

## Read Order

When possible, read in this order:

1. Root `AGENTS.md`
2. Nearest local `AGENTS.md`
3. Nearest summary file such as `README.md` or `00_overview.md`
4. Only then the specific source files needed for the task

## Working Style

- Keep the site deployable as a standalone repo.
- Prefer simple Vite/React patterns over framework sprawl.
- Keep publishable content in `src/content` instead of scattering copy throughout JSX.
- Keep docs short and path-scoped so agents can load only what they need.
- Delete stale placeholder sections and dead code instead of accumulating clutter.

## Cross-OS Dev

Shared `node_modules` on OneDrive across Windows (Codex) and WSL2 (Claude Code). If Vite errors with `Cannot find module @rollup/rollup-<platform>` or `@esbuild/<platform>`, install the matching binary with `--no-save` and retry — do not delete or reinstall `node_modules`:
- WSL2: `npm install --no-save @rollup/rollup-linux-x64-gnu @esbuild/linux-x64`
- Windows: `npm install --no-save @rollup/rollup-win32-x64-msvc @esbuild/win32-x64`

## Validation

- Run `npm run build` before declaring work complete.
- If integrations, forms, or deploy configuration change, verify the live behavior explicitly.
- Call out anything that still requires manual verification.

## What Does Not Belong Here

- Raw job-search documents
- Resume masters or company application folders
- Sensitive notes not meant for publication
- Build-time dependencies on sibling repositories
