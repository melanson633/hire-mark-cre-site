# Content Pipeline

## Source of Inputs

Primary raw inputs may come from the cousin workspace:

`C:\Users\melan\Documents\Job_Search`

Examples:

- resume language and professional positioning
- real project examples
- research ideas and newsletter angles
- LinkedIn messaging drafts

## Workflow

1. Read the relevant source material from `Job_Search`
2. Distill only the public-safe facts and claims
3. Copy that approved version into `src/content`
4. Update the sections or pages that consume it

## Hard Rules

- No runtime imports from `Job_Search`
- No symlinks or shared build dependencies
- No sensitive or private notes copied into public site content
- If a fact is uncertain, keep it out until confirmed

## Current Canonical Content Paths

- `src/content/siteMeta.js`
- `src/content/home.js`
- `src/content/caseStudies/`
- `src/content/research/`
