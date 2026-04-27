# Core Rewrite Method

## Objective

Transform raw prompts into stronger Cowork-ready prompts without changing the user's actual goal.

## Preservation contract

Do not change:

- actual objective
- explicit constraints
- explicit deliverable + delivery surface (chat / file / artifact / connector action)
- explicit non-goals
- explicit named MCPs / connectors / skills / files / folders / artifacts

unless the user asks.

Preserve semantics first. Rephrase freely only when confidence is high that intent is preserved.

## Rewrite posture

Be aggressive when confidence is high:

- extract the real objective and move it near the top of the rewrite
- surface the right tool / skill / MCP at the top, not buried in context
- compress weak or irrelevant context
- replace pre-stuffed context with **pull-context references** (`@file`, `Read`, MCP-first lookups, subagent delegation)
- tighten vague asks
- convert soft wishes into executable instructions
- specify the delivery surface (chat / workspace file with `computer://` link / artifact / connector action)
- add missing success criteria when needed

Be conservative when confidence is lower:

- preserve more original structure
- keep assumptions visible
- defer uncertainty to optional questions after the rewrite

Use the smallest rewrite that materially improves Claude's performance. Respect the attention-budget — every token has a cost; pre-stuffed context degrades performance.

## Prompt construction

For non-trivial prompts, use only the sections that materially help:

- Objective
- Context (named files / connectors / skills the agent should pull, not pasted content)
- Constraints
- Tool & skill routing (which skill to read first, which MCP to prefer, when to delegate to a subagent)
- Execution instructions
- Done when (acceptance criteria)
- Verification (structural — re-read saved file, view screenshot, fact-check, delegate to subagent for high-stakes work)
- Delivery surface (chat / file path / artifact / connector action)
- Final output format

Do not force a full template into every rewrite.

## Rewrite operators

Apply only when relevant:

1. **Surface the true objective** — move it near the top.
2. **Surface the right tool / skill / MCP** — name it explicitly; place it before the task body. Tools are the primary actions Claude considers; the right one belongs at the top.
3. **Bound unclear scope** with a single-line acceptance criterion.
4. **Add observability via `Done when`** so completion is bounded.
5. **Add task-appropriate verification** — proportionate to risk; structural (re-read / screenshot / fact-check), not ceremonial.
6. **Replace pre-stuffed context with pull-context references** — `@file`, `Read`, MCP query, subagent delegation. Trust Claude to fetch what it needs.
7. **Compress front-loaded context** — every token costs attention budget.
8. **Make execution stance explicit** — action / discovery / clarify (see references/03).
9. **Make the delivery surface explicit** — chat / workspace file + `computer://` / artifact / connector action.
10. **Tighten the output contract** — define what "done" looks like in the agent's reply.
11. **Remove open-ended wandering language** — replace with blocker / max-effort guidance.
12. **Prefer subagent delegation** when the task would flood the parent context with logs, file dumps, or search results.

## Clarification rule

Rewrite first by default.

Use optional questions only when answers would materially improve the next pass.

Ask pre-rewrite questions only when ambiguity blocks a coherent rewrite.

For prompts that are *underspecified-by-default* (presentation, research, summary, digest, prep), don't ask the user yourself — instead, **inject AskUserQuestion gating into the rewrite** so the Cowork agent asks the user multiple-choice questions before doing real work.

## Tone

Direct, compact, high-signal, ready for the Cowork agent loop. Do not lecture the agent on tone or formatting — the Cowork system prompt already enforces those.
