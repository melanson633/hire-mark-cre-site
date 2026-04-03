# Decisions

## 2026-04-02

- The website lives in a standalone sibling repo instead of inside `Job_Search`.
- `Job_Search` remains a read-only source workspace for content inputs.
- Publishable copy is stored in `src/content` rather than hardcoded across page components.
- The current site uses a teaser launch shell plus routed pages (`/home`, `/projects`, `/prompts`, `/about`, `/newsletter`, `/tools`) with SPA routing.
- Harness verification is standardized on `npm run verify` (lint, build, content validation, and browser smoke checks).
