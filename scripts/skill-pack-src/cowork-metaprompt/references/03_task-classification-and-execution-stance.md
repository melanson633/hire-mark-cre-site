# Task Classification and Execution Stance

## Cowork primary task types

Classify into the most action-driving type — not every plausible class.

- **document creation** — `.docx`, `.md`, or `.pdf` deliverable
- **presentation creation** — `.pptx` deliverable
- **spreadsheet / data work** — `.xlsx`, `.csv`, `.tsv` deliverable
- **research / summary / report** — chat answer, `.md` file, or `.docx` deliverable
- **file organization / cleanup** — workspace-folder operations
- **connector-driven action** — send email, schedule, post to Slack, query Notion, etc.
- **connector-driven readout** — digest, status check, "what's on my plate"
- **computer-use task** — native desktop app (Maps, Notes, System Settings, third-party native apps, cross-app workflows)
- **artifact build** — recurring view that calls connectors on open
- **scheduled task creation** — cadence-driven runs
- **prompt diagnosis or rewrite** — the meta case (this skill itself)
- **skill / plugin authoring** — explicit only; rare

## Execution stances

Pick one.

### Action-biased

Use when the user clearly wants the deliverable produced — words like "make", "create", "send", "save", "build", "draft", "post", "schedule", "fix".

Optimize the rewrite for:

- identify the right tool / skill / MCP at the top
- read the relevant skill's `SKILL.md` first when applicable (pptx / docx / xlsx / pdf / theme-factory)
- produce the deliverable
- verify it (re-read, screenshot, fact-check)
- link or cite it succinctly (`computer://` for files, permalinks for connector data)

### Discovery-first

Use when scope, surface, or grounding is unclear — root cause unknown, target file unknown, connector landscape unknown, or the user asked to "look", "explore", "audit", "find", "see what's there".

Optimize the rewrite for:

- inspect first — list the workspace folder / list connected MCPs / probe the connector with one small call
- delegate the inspection to a subagent if it would flood the parent context with file dumps, search results, or large logs
- bound the discovery (a fixed set of locations / a fixed time budget / a fixed acceptance criterion)
- *then* act — only if the original prompt called for action

### Clarify-first

Use when the prompt is materially underspecified in a way the rewrite alone cannot fix — e.g., presentation / research / summary / digest / prep requests where audience, scope, depth, or "what counts" are unstated.

This is **the most common Cowork-specific stance** — the Cowork system prompt explicitly instructs the agent to use `AskUserQuestion` before non-trivial work. The rewriter must reach for clarify-first confidently.

Optimize the rewrite for:

- instruct the agent to call `AskUserQuestion` first
- specify the exact multiple-choice questions to ask (audience, length, scope, time range, what "interesting" means, etc.)
- *then* proceed to action / discovery as appropriate

The optimized prompt should never just *contain* clarifying questions in prose — it should explicitly route them through `AskUserQuestion` so they render as the Cowork UI widget.

## Tie-break rules

- Prefer **action-biased** when the user clearly wants the deliverable produced.
- Prefer **discovery-first** when the surface or grounding is unknown.
- Prefer **clarify-first** when the deliverable is underspecified-by-default — even if the user used action verbs ("make me a presentation about Q4" is still clarify-first).
- Prefer one stance; avoid hybrid prompts unless the task truly needs it.
- The clarify-first stance composes with the others: clarify first, then action, or clarify first, then discover.
