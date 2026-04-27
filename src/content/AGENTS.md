# Content Guidance

## Purpose

Keep publishable site copy and structured content separate from page layout code.

## Canonical Files

- `README.md` for content layout
- `siteMeta.js` for site-wide metadata and contact links
- `home.js` for homepage copy and list content
- `caseStudies/` for showcase items
- `research/` for newsletter and research-facing content
- `caseStudies/imported-artifacts.js` for copied public case-study artifact metadata
- `research/artifacts.js` for copied public research/newsletter artifact metadata

## Working Rules

- Prefer structured objects over long hardcoded JSX copy.
- Keep one topical file per case-study lane when possible.
- Distill content from the cousin `Job_Search` workspace into public-safe language.
- If a claim cannot be supported cleanly, weaken or remove it.
- Use `docs/source-context/` as routing context only; do not import from docs or the cousin workspace.
