---
name: cowork-metaprompt
description: Rewrites prompts for Cowork or Claude Code agents using Claude-best-practice patterns — pull-context-over-push, AskUserQuestion gating for underspecified deliverables, TodoWrite-with-verification, skill-first and MCP-first routing, workspace-folder deliverables with computer:// links, and subagent delegation for context-heavy side-quests. Use when the user pastes a prompt and asks to rewrite, optimize, or improve the prompt; when they ask how to phrase a Cowork or Claude Code request so the agent handles it well; when they describe metaprompting or prompt engineering for Cowork or Claude Code; or when they want a Codex, ChatGPT, or OpenAI prompt ported to Cowork or Claude Code. Do NOT trigger on generic requests to improve code, writing, copy, emails, commit messages, or other artifacts that are not themselves prompts. Do NOT use this skill to execute the underlying task — it only rewrites prompts. Do NOT use to author other skills, plugins, or MCP servers.
---

# Cowork Metaprompt — Rewriter for the Claude Agent Loop

A reusable prompt-optimizer for Cowork (and Claude Code) usage. Rewrites a user's raw prompt into a stronger Cowork-ready prompt without executing the underlying task.

## Mission

Produce Cowork-ready prompt rewrites that improve clarity, scope control, actionability, AskUserQuestion gating, TodoWrite-with-verification discipline, skill / MCP / tool routing, deliverable specification, attention-budget hygiene, and loop resistance — without widening scope.

## Always-on preservation law

Preserve all of the following unless the user explicitly changes them:

- actual objective
- explicit constraints
- requested deliverable + delivery surface (chat / file / artifact / connector action)
- explicit mode
- explicit non-goals
- named MCPs / connectors, named skills, named workspace files or folders, named artifacts, named output formats

Preserve semantics first. Preserve wording only when it is load-bearing.

Do not widen scope. Do not invent connectors, skills, or files that are not present. Do not convert a concrete task into a broader initiative. Do not auto-promote a chat answer into a file or artifact unless the user clearly asked for that surface.

## Default output

Unless the user requests otherwise, return:

1. Optimized Prompt (in a plain text markdown code block, ready to paste into Cowork)
2. Why This Rewrite Is Better
3. Optional Questions

Keep notes terse and high-signal. Include optional questions only when the answers would materially improve the next pass.

## Supported modes

Output modes:

- prompt-only
- prompt + notes
- prompt + notes + questions  *(default)*

Strength modes:

- light
- standard *(default)*
- strict
- grounded *(replaces "repo-aware" — see references/04)*

## Routing workflow

For each request, do this in order:

1. Determine whether the user wants prompt rewriting, prompt diagnosis, or execution of the underlying task.
2. Detect requested output mode and strength mode.
3. Classify the prompt's primary Cowork task type (see references/03).
4. Choose execution stance: **action-biased**, **discovery-first**, or **clarify-first**.
5. Run the connector-and-workspace preflight gate (see references/04). Pick branch A (grounded), B (partial), or C (unavailable).
6. Add only the augmenters that materially help (see references/05). Reach especially for:
   - `Done when` / acceptance criteria
   - Verification (structural — re-read saved file, view screenshot, fact-check, delegate to subagent for high-stakes work)
   - Blocker / max-effort / loop prevention
   - Downstream completeness (computer:// links, citations, artifact updates)
   - **TodoWrite-with-verification injection** (Cowork-specific)
   - **AskUserQuestion gating** for underspecified deliverables (Cowork-specific)
   - **Subagent delegation** for context-heavy side-quests (Cowork-specific)
   - **Pull-context references** — instruct the agent to fetch via `@file`, MCP, subagent, or `Read` rather than recap (Cowork-specific)
7. Strip Cowork-antagonistic patterns (see references/07).
8. Format the response per the requested or default output mode.

## Reference file routing

Use the files in `references/` as conditional playbooks:

- `01_core-rewrite-method.md` — baseline rewrite method, preservation contract, rewrite operators.
- `02_mode-and-output-contract.md` — output shaping, mode overlays, strength modes.
- `03_task-classification-and-execution-stance.md` — Cowork task taxonomy and stance selection (action / discovery / clarify).
- `04_connector-and-workspace-gating.md` — when to do grounded rewriting against connectors / workspace folders / installed skills, and how to fall back without faking specificity.
- `05_quality-augmenters.md` — Done-when, verification, blocker logic, downstream completeness, **TodoWrite-with-verification**, **AskUserQuestion gating**, **subagent delegation**, **pull-context references**, compatibility / workspace hygiene.
- `06_task-type-playbooks.md` — task-specific Elevate / Suppress patterns for Cowork task types.
- `07_anti-patterns-and-non-injection.md` — bad patterns to remove, behaviors not to inject by default.

Treat the files as reference playbooks. Mandatory behavioral law stays in this `SKILL.md`.

## Grounded-rewrite truthfulness rule

Only produce a grounded rewrite when grounding is genuinely available — a connector is named or implied, a workspace folder is selected, a skill is installed, an attached file is present.

If grounding is partial, produce the best grounded rewrite you can and note the limitation in one line in the notes.

If grounding is missing, do not stall and do not fake specificity. Fall back to the strongest non-grounded rewrite, **and explicitly instruct the agent to call `search_mcp_registry` / `suggest_connectors` (or use Cowork's request_cowork_directory) before falling through to computer use.** Preserve placeholders the user can fill in later.

## Clarification policy

Default behavior is rewrite first, then ask optional follow-up questions.

Ask pre-rewrite questions only when:

- the objective is materially ambiguous
- the requested mode is materially ambiguous
- the prompt contains a contradiction that blocks coherent rewriting
- the user explicitly asks for diagnosis before rewriting

Keep questions few, specific, and high-leverage.

## Style for optimized prompts

Optimized prompts should be direct, compact, practical, and structured only as needed. The Cowork agent loop already enforces tone and formatting (prose-first, minimal lists, terse delivery) — do not lecture the agent on these.

Avoid: fluff, repetition, motivational filler, chain-of-thought requests, progress chatter, fake specificity (about connectors / files / skills), pre-stuffed context the agent could pull, manual compaction instructions, speculative tool loading, and verbose reporting requirements.

Prefer: pull-context references (`@file`, MCP-first routing, subagent delegation), the smallest acceptance criterion that bounds completion, structural verification, named delivery surface.

## Final quality check

Before responding, ensure that you:

- preserved the real objective, explicit constraints, and named MCPs / skills / files / folders / artifacts
- improved Cowork actionability
- did not widen scope
- specified a deliverable + delivery surface (chat / file / artifact / connector action)
- added TodoWrite-with-verification when the prompt implies more than one tool call
- added AskUserQuestion gating when the prompt is underspecified-by-default (presentation, research, summary, digest, prep)
- added subagent delegation guidance when the work would flood the parent context
- avoided fake connector / workspace / skill assumptions
- matched the requested or default mode

## Worked examples

### Example A — underspecified deliverable (presentation request)

**Before:**
```
make me a presentation about Q4
```

**After (standard mode, grounded branch C — no folder selected):**
```
Build a Q4 presentation as a .pptx file.

Before starting, use AskUserQuestion to ask the user (multiple choice):
- audience (executives / team / customers / investors)
- length (5–8 / 10–15 / 20+ slides)
- tone (data-heavy / narrative / formal / casual)
- the 1–3 key messages

Then:
1. Use TodoWrite to plan the work, including a verification step at the end.
2. Read the pptx skill's SKILL.md before generating the deck.
3. If no workspace folder is selected, call request_cowork_directory.
4. Save the .pptx to the selected folder and share with a single computer:// link.
5. Verify by re-reading the saved file (or rendering to image) and confirming the slide count, titles, and key messages match the user's answers.

Stop when the user has the file linked. Do not narrate skill loading.
```

### Example B — underspecified connector query

**Before:**
```
find interesting things in Slack
```

**After (standard mode, grounded branch B — Slack MCP implied):**
```
Summarize "interesting" Slack activity.

Before starting, use AskUserQuestion to ask:
- time range (last 24h / 7d / 30d / custom)
- channels (specific list / all I'm in / DMs included?)
- what counts as "interesting" (mentions of me / decisions / questions left open / high-engagement / a topic keyword)

Then:
1. Use TodoWrite with a verification step.
2. If a Slack MCP is connected, route there. If not, call search_mcp_registry / suggest_connectors before any computer-use fallback.
3. Delegate the message-trawling to a subagent so raw thread content stays out of the parent context. The subagent returns only a short structured digest with permalinks.
4. Produce a cited summary in chat (each bullet links to its source message).
5. Offer at the end: "Turn this into a live artifact you can re-open daily?"

Verify: every bullet has a working permalink. If any is missing, mark it as such instead of fabricating one.
```

These two cover the two most common Cowork prompt failure modes — underspecified deliverables and underspecified connector queries.
