# Harness Readiness Assessment (April 4, 2026)

This assessment benchmarks the repo against the harness engineering model described in OpenAI's February 11, 2026 article, *Harness engineering: leveraging Codex in an agent-first world*.

## Overall Assessment

**Current state:** partially harness-ready (strong foundation, incomplete execution reliability).

The repository already has several high-value harness primitives in place:

- repository-local guidance and scoped agent instructions
- a canonical `npm run verify` flow
- CI wiring for the same verification path
- smoke checks across core routes, downloads, and responsive behavior
- explicit docs for the harness contract and execution plan

The biggest blocker to confidently calling the repo harness-ready is that the verification loop is not robust across constrained environments because browser installation can fail due network restrictions.

## Scorecard Against Harness Engineering Principles

### 1) Repository knowledge as system of record — **Strong**

Evidence:

- Root and path-scoped `AGENTS.md` files
- Canonical docs for repo overview, strategy, content pipeline, harness contract, and execution plan
- Clear route graph and content model docs

### 2) Agent legibility and progressive disclosure — **Strong**

Evidence:

- Explicit read order in root docs
- Minimal, scoped, path-local instructions
- Canonical file list and entrypoints

### 3) Mechanical enforcement of invariants — **Moderate**

Evidence:

- lint/build/content validation + smoke in `verify`
- checks for route coverage, download integrity, inert newsletter behavior, and mobile overflow

Gap:

- no architectural boundary linting (layer/domain dependency constraints)
- no codified style/taste invariants beyond ESLint and smoke assertions

### 4) End-to-end validation loop reliability — **Moderate/weak**

Evidence:

- single local+CI verification command exists

Gap:

- verification can fail when Playwright browser binaries are blocked by proxy/network policy
- no explicit fallback strategy (system browser path, mirrored artifact host, or degraded smoke mode)

### 5) Throughput and autonomous iteration support — **Moderate**

Evidence:

- PR verification workflow exists
- documentation includes execution plans

Gap:

- no recurring repo-maintenance loop (doc gardening, dead-code detection, stale-content sweeps)
- no explicit metrics around harness performance (flake rate, time-to-green, false failures)

### 6) Entropy control (continuous garbage collection) — **Moderate**

Evidence:

- docs emphasize deleting stale artifacts

Gap:

- no automated recurring cleanup jobs for docs, links, content drift, or structural anti-patterns

## Prioritized Task List To Reach Confident Harness-Ready Status

## P0 — Must fix first (blocking)

1. **Harden browser verification installation path in local and CI workflows.**
   - Add a resilient Playwright setup strategy: primary CDN + documented mirror/fallback and/or preinstalled browser path.
   - Add explicit detection and actionable failure message when browser binary install is blocked.
   - Outcome: `npm run verify` becomes dependable in constrained enterprise/proxy networks.

2. **Split verification into strict and fallback modes without losing signal.**
   - Keep `verify` strict for CI.
   - Add `verify:degraded` (or similar) for environments where browser binaries cannot be fetched, still running lint/build/content checks and route/static link assertions that do not require browser launch.
   - Outcome: agents always have a meaningful gate, even when full browser automation is unavailable.

3. **Document verification failure playbook in repo-local docs.**
   - Add a short troubleshooting section covering proxy/domain blocks, browser cache paths, and approved remediation sequence.
   - Outcome: fresh agents can self-recover quickly instead of stalling.

## P1 — High leverage (next)

4. **Encode architectural boundaries as mechanical checks.**
   - Define allowed import boundaries (e.g., content ↔ UI ↔ utilities) and enforce with lint rules or custom script.
   - Outcome: prevents gradual architecture drift under high agent throughput.

5. **Add doc consistency checks in CI.**
   - Validate that documented route graph matches router source.
   - Validate canonical docs referenced in read-order actually exist and are current.
   - Outcome: keeps “repo knowledge as system of record” true over time.

6. **Add smoke assertions for key business flows not yet explicitly validated.**
   - Verify contact actions and external links are present and intentionally handled.
   - Verify route aliases and redirects expected by deployment docs.
   - Outcome: better coverage of user-critical paths.

## P2 — Scale and autonomy multipliers

7. **Create recurring “harness gardening” automation.**
   - Scheduled CI task to run content/link checks and open fix issues/PRs for stale docs, dead references, or broken downloads.
   - Outcome: continuous entropy control.

8. **Track harness health metrics.**
   - Record verify pass rate, smoke flake rate, and median time to green.
   - Outcome: objective signal for harness quality and regressions.

9. **Add lightweight plan templates for non-trivial changes.**
   - Standardize execution-plan markdown for medium/large work, with acceptance criteria and verification notes.
   - Outcome: improves agent reliability on complex tasks and makes decisions auditable.

## P3 — Nice-to-have hardening

10. **Expand observability hooks for runtime errors.**
    - Ensure error boundary behavior is intentionally tested.
    - Add optional client-side error beaconing for production debugging.

11. **Add stronger content schema validation.**
    - Formalize schema contracts (field types/required fields) for content modules.

12. **Add golden examples for preferred patterns.**
    - Curate a small set of “do this” reference implementations for common tasks (new page, new content module, new route).

## Exit Criteria For “Confidently Harness-Ready”

The repo should be considered confidently harness-ready when all of the following are true:

- verification is reliable in both normal and constrained environments
- full CI gate and local gate are aligned and reproducible
- architecture boundaries are mechanically enforced
- docs remain accurate through automated drift checks
- recurring cleanup automation keeps entropy from compounding
