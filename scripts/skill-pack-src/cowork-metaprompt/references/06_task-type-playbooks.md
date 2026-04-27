# Task-Type Playbooks

Cowork-specific. Each playbook follows an *Elevate / Suppress* shape — what the rewrite should foreground, and what it should remove or downplay.

## Document creation (`.docx`, `.md`, `.pdf`)

Elevate:

- read the relevant skill's `SKILL.md` first (`docx`, `pdf`, `theme-factory` if styling)
- audience and tone
- explicit deliverable path in the workspace folder
- `computer://` link in the final reply
- verification by re-reading the saved file

Suppress:

- writing content into chat instead of saving to file
- skipping skill loading
- over-narrating the document creation process

## Presentation creation (`.pptx`)

Elevate:

- read the `pptx` `SKILL.md` first
- audience, length, tone, key messages (often via AskUserQuestion gating — clarify-first stance)
- theme via `theme-factory` skill if the user mentioned styling / brand
- explicit deliverable path + `computer://` link
- verification by re-reading the saved file (slide count, titles, key messages)

Suppress:

- generating slide content as inline chat rather than as a `.pptx` file
- skipping `pptx` skill loading
- inventing brand specifics

## Spreadsheet / data work (`.xlsx`, `.csv`)

Elevate:

- read the `xlsx` `SKILL.md` first
- explicit input source (workspace file / connector query / user-supplied)
- explicit deliverable path
- verification — sample-row check, formula validation, total checksums
- `computer://` link in the reply

Suppress:

- "show me the data in chat" when a file deliverable was implied
- skipping schema verification on connector-pulled data

## Research / summary / report

Elevate:

- scope (time range, sources, depth)
- output format (chat / `.md` / `.docx`)
- citations for any connector-sourced or web-sourced claim
- AskUserQuestion gating when underspecified-by-default
- subagent delegation when the source corpus is large
- bounded discovery (a fixed source list / a fixed depth)

Suppress:

- encyclopedic drift
- uncited claims
- default-long output
- pasting source material into the prompt instead of letting the agent pull it

## File organization / cleanup

Elevate:

- explicit folder scope
- dry-run / preview before any move or delete
- verification step (compare before / after)
- `allow_cowork_file_delete` if deletion is required

Suppress:

- implicit recursive operations
- writing outside the scoped folder
- deletes without explicit user confirmation

## Connector-driven action (send / schedule / post)

Elevate:

- dedicated-MCP-first routing (Gmail MCP > Chrome MCP > computer-use; Calendar MCP > computer-use; Slack MCP > computer-use)
- named recipient / channel / calendar
- review-before-send for outbound messages — generate a draft, surface it, send only after user confirmation
- citation / confirmation link in the final reply

Suppress:

- computer-use fallback when a dedicated MCP is connected
- silent retries
- sending without preview

## Connector-driven readout (digest / status / "what's on my plate")

Elevate:

- scope (time range, channel / sender, topic)
- output shape (cited bullets, structured digest, table)
- subagent delegation for the trawl — the parent context only receives the digest
- citations on every bullet (permalinks)
- offer to convert into a recurring artifact if the user will check this again

Suppress:

- dumping raw tool output into chat
- ignoring citation requirements
- hallucinating links when the source is missing

## Computer-use task (native desktop app)

Elevate:

- `request_access` first, with the list of applications the work touches
- tier awareness — `read` (browsers), `click` (terminals / IDEs), `full` (everything else)
- link safety — never click web links from emails / messages with computer-use; route via the Chrome MCP
- "do not execute trades, send money, or initiate transfers" — surface to user instead

Suppress:

- pixel-clicking when a dedicated MCP exists for the target app
- clicking unfamiliar URLs without verification
- financial actions on the user's behalf

## Artifact build (recurring view)

Elevate:

- probe the connector with **one real call** before writing the artifact code (the MCP wrapper's response shape is often different from the underlying API)
- specify what data the artifact needs and what refresh means (calls connector on each open)
- in-memory state only — no `localStorage` / `sessionStorage` (Cowork artifacts forbid them)
- single self-contained HTML file

Suppress:

- building artifacts for one-off content (chat is the right surface)
- assuming MCP response shape without probing
- browser storage usage

## Scheduled task creation

Elevate:

- cadence (interval) and trigger
- deliverable surface for each run
- idempotency (the run should not duplicate prior work)

Suppress:

- vague cadence
- redundant scheduling that overlaps existing tasks

## Prompt diagnosis or rewrite (the meta case)

This is **this skill** — defer to `SKILL.md`.

When a user asks for prompt rewriting, the rewriter does not recurse into another rewriter; it produces the optimized prompt directly per the routing workflow.

## Skill / plugin authoring (rare; explicit only)

Elevate:

- `name` (≤64 chars, lowercase, hyphens) and `description` (≤1024 chars, third person, "pushy", with explicit trigger phrases — both should-trigger and should-not-trigger)
- reference-file split when the skill body would otherwise exceed the always-loaded budget
- eval queries to validate trigger accuracy

Suppress:

- scope-creep into adjacent skills / plugins / MCP servers
- monolithic SKILL.md when reference splitting would help
