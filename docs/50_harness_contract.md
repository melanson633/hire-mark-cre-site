# Harness Contract

This repo is harness-ready when a fresh agent can:

1. Understand the site map and content model from repo-local docs.
2. Run a small, explicit verification loop without guessing.
3. Observe failures through browser checks, build/lint output, or runtime visibility.
4. Change content or UI without breaking route behavior, downloads, or contact paths.

## Source Of Truth

- [../AGENTS.md](../AGENTS.md)
- [00_overview.md](00_overview.md)
- [10_site_strategy.md](10_site_strategy.md)
- [20_content_pipeline.md](20_content_pipeline.md)
- [30_deployment.md](30_deployment.md)
- [40_decisions.md](40_decisions.md)
- [../README.md](../README.md)

## Current Route Surface

- `/` teaser / launch shell
- `/home` content-rich homepage
- `/home-preview` homepage alias
- `/projects`
- `/projects/:slug`
- `/prompts`
- `/about`
- `/newsletter`
- `/tools`
- `*` 404

## Harness-Ready Minimum Bar

### Code Quality

- `npm run lint` passes.
- `npm run build` passes.
- The app remains deployable from the repo root.

### Browser Coverage

Automated smoke checks should cover:

- root route loads and renders the teaser layout
- internal navigation works
- project and prompt pages render valid content
- template download links point at real files in `public/downloads`
- contact links are present and not broken
- 404 route behaves intentionally
- mobile viewport renders without obvious layout collapse

### Content Safety

- Public copy lives in `src/content`.
- No runtime dependency on the cousin workspace.
- Claims that are uncertain or unsupported are removed or weakened.
- Placeholder language is either explicit or eliminated.

### Operational Visibility

- Newsletter behavior is either real or explicitly inert.
- Failures in submission, routing, or missing assets are visible in local verification.
- Production settings in `vercel.json` match the active domain posture.

## Non-Goals For Harness Readiness

- Full product analytics
- Complex auth
- Multi-environment configuration sprawl
- Replacing the current Vite/React architecture

## Definition Of Done

The repo is harness-ready when a fresh session agent can:

1. Read this file and the repo overview.
2. Run the documented verification commands.
3. Confirm the app passes browser smoke checks.
4. Make a small content or UI change without needing extra undocumented context.

