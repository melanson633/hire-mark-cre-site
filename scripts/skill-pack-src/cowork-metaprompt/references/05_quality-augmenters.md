# Quality Augmenters

Apply only the augmenters that materially help. Do not inject all of them by default.

## 1. Done when

Add when success is not observable.

Use compact acceptance criteria that make completion bounded. Examples:

- "Done when the .pptx is saved at `<workspace>/<filename>` and shared via a single computer:// link."
- "Done when the digest is in chat, every bullet has a permalink to its source message, and any missing-permalink bullets are flagged as such."
- "Done when the artifact opens, calls the named MCP on load, and renders the data without errors."

## 2. Verification

Add when correctness matters — file deliverables, connector actions, computer-use changes, factual claims, multi-step outcomes.

Verification is **structural**, not ceremonial. Concrete forms:

- re-read the saved file (or render it) to confirm the deliverable matches the spec
- view a screenshot to confirm a UI state
- fact-check named claims against the source
- double-check connector counts match the user's filter
- run tests if code changed
- delegate verification to a separate subagent for high-stakes work — a fresh context often catches errors the parent missed

Keep verification proportionate to risk. Avoid bloated test plans for small tasks.

## 3. Blocker / max-effort / loop prevention

Add when the raw prompt risks endless or inefficient churn.

Use language such as:

- "investigate until the root cause or minimum viable path is clear; then act"
- "make the best bounded change within scope"
- "stop when acceptance criteria are met"
- "if blocked, state the blocker precisely instead of continuing to churn"
- "do not retry silently — surface failures"

Especially valuable for: connector-driven tasks (silent retries), debugging unknown failure, computer-use loops, "keep improving" prompts.

## 4. Downstream completeness

Add when the deliverable likely needs follow-through:

- link the saved file with `computer://` (one link per file, no narration)
- present multiple files via `present_files` when relevant
- add citations for connector-sourced content (every claim links to its source message / doc / record)
- update the live artifact if one already exists for this view
- mention the file's location once and don't over-narrate

Compact wording: "Save to `<workspace>/<filename>`, share with a single computer:// link, and cite each connector-sourced claim with its permalink. Do not narrate skill loading."

## 5. Workspace hygiene *(replaces the legacy "compatibility" augmenter)*

Add when the task touches existing files / artifacts.

- do not overwrite an existing file unless explicitly asked
- do not move files outside the selected workspace folder
- do not break existing artifacts (update via `update_artifact`, don't recreate)
- if a deletion is required, the rewrite must instruct the agent to use `allow_cowork_file_delete`

## 6. TodoWrite-with-verification injection *(Cowork-specific)*

Add **by default** in `standard` mode and stronger when the rewritten prompt implies more than one tool call.

Anthropic's context-engineering guidance names structured note-taking (Claude Code's to-do list, NOTES.md) as a recurring agentic pattern — TodoWrite is the productized form. It is not bureaucracy; it survives the agent loop and prevents drift.

Wording in the rewrite:

- "Use TodoWrite to plan the work."
- "Include a verification step at the end of the TodoList."
- For high-stakes work: "Delegate the verification step to a subagent."

## 7. AskUserQuestion gating *(Cowork-specific)*

Add when the prompt is in the underspecified-by-default class — presentation, research, summary, digest, prep, "find interesting things in X", "help me with Y".

Wording in the rewrite:

- "Before starting, use AskUserQuestion to ask (multiple choice): <q1>, <q2>, <q3>."
- specify the literal questions and the option sets

The optimized prompt should never just *contain* clarifying questions in prose — it should explicitly route them through `AskUserQuestion` so they render as the Cowork UI widget.

## 8. Subagent delegation *(Cowork-specific)*

Add when the work would otherwise flood the parent context — long file reads, large search-result trawls, web-page parsing, log analysis, batch fetches.

Wording in the rewrite:

- "Delegate <the heavy step> to a subagent (Task tool) so raw output stays out of the parent context. The subagent returns only <a structured summary / a 5-line digest / the matching paths and line numbers>."

Subagent triggering is by description in the Cowork system prompt; "MUST BE USED" / "use PROACTIVELY" markers matter literally if the rewrite is targeting a custom subagent.

## 9. Pull-context references *(Cowork-specific)*

When the user pasted a wall of context the agent could just fetch, replace it with a pull-context reference:

- "Read `<file>` to get <thing>" instead of pasting the file
- "Query `<MCP>` for <thing>" instead of pasting tool output
- "Delegate to a subagent to read all files matching `<glob>`" instead of pasting many files

Anthropic's design principle: agents perform best when they pull just-in-time context via tools, not when they receive pre-stuffed context that consumes the attention budget.

## 10. Compatibility / API stability — when relevant

Do not inject backward-compatibility requirements by default.

Add only when:

- explicitly requested
- the workspace context strongly implies it (existing public interface, existing artifact someone else is using)
- migration-sensitive surfaces are in play
