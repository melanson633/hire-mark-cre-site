# Content Layout

- `siteMeta.js`: brand, nav, contact links, SEO-style metadata
- `home.js`: homepage copy, launch messaging, positioning cards, and product-lane bullets
- `caseStudies/index.js`: assembled showcase items for the homepage
- `caseStudies/*.js`: topical case-study inputs
- `caseStudies/imported-artifacts.js`: metadata for copied public case-study HTML/PDF exports
- `research/index.js`: research themes and newsletter promise
- `research/artifacts.js`: metadata for copied public research and newsletter artifacts

Keep current published copy here unless it is purely presentational.

Use `docs/source-context/` for upstream routing context and `public/` for actual downloadable or viewable artifacts.

## Validation Rules

- Template `filename` entries in `templates/index.js` must exist in `public/downloads/`.
- Project slugs and prompt IDs must stay unique.
- Newsletter behavior is controlled by `newsletterContent.mode`:
  - `inert`: explicitly no capture and no success state
  - `real`: only use when submit flow is actually wired
