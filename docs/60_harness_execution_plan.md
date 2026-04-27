# Harness Execution Plan

This is the implementation plan for moving the repo to harness-ready state.

## Start Here

1. Read [50_harness_contract.md](50_harness_contract.md).
2. Read [00_overview.md](00_overview.md) and [30_deployment.md](30_deployment.md).
3. Run:
   - `npm run lint`
   - `npm run build`
4. Treat any doc/code mismatch you find as a harness gap to fix.

## Phase 1: Verification Spine

### Goal

Create one canonical verification path that a fresh agent can run locally and in CI.

### Tasks

- Add `npm run verify` as the main local entrypoint.
- Add browser smoke coverage for the current route surface.
- Add CI so the same checks run on pull requests.
- Fail on missing assets, broken routes, or obvious responsive regressions.

### Suggested Files

- `package.json`
- `.github/workflows/*`
- `scripts/*`

### Exit Criteria

- One command covers lint, build, and smoke checks.
- CI runs the same gate.

## Phase 2: Newsletter Truthfulness

### Goal

Make `/newsletter` honest and testable.

### Tasks

- Decide whether the form is real or intentionally inert.
- If real, wire the provider and test the submit flow.
- If inert, remove the fake success path and label it clearly.
- Update content copy so it matches behavior.

### Suggested Files

- `src/components/NewsletterForm.jsx`
- `src/content/newsletter.js`
- `src/pages/NewsletterPage.jsx`

### Exit Criteria

- No false success state remains.
- The user-facing copy matches actual behavior.

## Phase 3: Docs Refresh

### Goal

Make repository knowledge match the actual app.

### Tasks

- Update the repo overview to describe the current route graph.
- Add any missing content contract or route map details.
- Ensure the docs point to canonical files only.

### Suggested Files

- `docs/00_overview.md`
- `README.md`
- `src/content/README.md`

### Exit Criteria

- A new agent can orient without reading source files first.

## Phase 4: Observability And Failure Visibility

### Goal

Make breakage legible.

### Tasks

- Add or verify a production error boundary.
- Surface broken-link or asset failures during smoke checks.
- Make redirect behavior easy to validate after domain changes.

### Suggested Files

- `src/components/*`
- `src/pages/*`
- `docs/30_deployment.md`
- `vercel.json`

### Exit Criteria

- A broken route, missing asset, or failed interaction is visible immediately.

## Phase 5: Content Validation And Cleanup

### Goal

Keep the repo from drifting back into ambiguity.

### Tasks

- Validate structured content modules.
- Verify every download file exists.
- Remove stale placeholder language when it is no longer needed.
- Delete dead code or dead routes instead of keeping them around.

### Suggested Files

- `src/content/*`
- `public/downloads/*`
- `src/App.jsx`

### Exit Criteria

- Content edits fail fast when they are malformed or point at missing files.

## Final Verification

After the work is complete:

1. Run `npm run verify`.
2. Run `npm run build`.
3. Open the app in a browser and confirm the primary routes render.
4. Confirm `markbuilds.ai` and the `www` redirect behave as documented.

## Working Rule

Do not mark the repo harness-ready until all of the following are true:

- docs match the code
- verification is automated
- the newsletter state is honest
- route and asset coverage is explicit
- the repo can be understood from repo-local files alone

