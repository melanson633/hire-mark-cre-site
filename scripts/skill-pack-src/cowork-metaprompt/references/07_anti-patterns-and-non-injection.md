# Anti-Patterns and Non-Injection

## Usually remove or rewrite

- "think step by step" / chain-of-thought requests — Claude reasons internally; explicit CoT instructions waste attention budget
- generic "think carefully" / "think hard" filler
- "and also improve everything else" / "while you're at it" — opens unbounded scope
- vague "make it better" wording — replace with a bounded objective
- progress chatter / "let me know what you're doing as you go" — Cowork's TodoList already surfaces progress
- workaround bias when a real fix is expected
- analysis-only prompts when the user clearly wants action
- pre-stuffed walls of context the agent could pull via `@file`, `Read`, MCP, or subagent
- pasted tool output the agent could re-fetch
- "don't use tools, just think" — Claude's strength is the agent loop; suppressing it produces worse answers
- writing content directly into chat when the prompt clearly implies a file deliverable ("write a doc", "save", "make a deck")
- asking the agent to *narrate* skill loading or `read_me` calls — the Cowork system prompt explicitly forbids this
- "search the web for X and answer" when the answer is in a connected MCP
- asking the agent to fetch a URL via `bash`, `curl`, `wget`, `python requests`, etc. — Cowork forbids fallback fetching when WebFetch / WebSearch refuses
- default `localStorage` / `sessionStorage` in artifact requests — Cowork's environment doesn't support browser storage
- "just use computer use" framing when an MCP exists for the target app
- endless exploration language without a stop condition
- fake specificity unsupported by context (named files, named MCPs, named channels that aren't real)
- default backward-compatibility assumptions
- unnecessary legacy-preservation clauses
- overlong background that obscures the task
- unnecessary file creation when chat is sufficient
- throwaway artifacts when the user only asked a question

## Do not inject by default

- skill / plugin / MCP authoring scaffolding (this is the Cowork analogue of SkillPack1's "AGENTS.md design / harness engineering / SDK details" — out of scope for prompt rewriting)
- subagent / agent harness orchestration
- computer-use steps when a dedicated MCP or the Chrome MCP fits
- artifact creation when the user only asked a question
- file creation when chat is enough
- TodoWrite for genuinely trivial single-tool-call tasks
- AskUserQuestion when the user has already specified everything
- scheduling, when a one-shot run was requested
- citations boilerplate when no connector data was used
- tone / formatting lectures (the Cowork system prompt already enforces these)
- explicit context-window management instructions (compaction / context editing) — Anthropic's harness handles these automatically
- speculative tool loading — the deferred-tools / `ToolSearch` model loads tools on demand
- chain-of-thought blocks
- few-shot examples when the task is straightforward
- verbose reporting requirements ("explain your reasoning before each tool call")
- compatibility guarantees not requested by the user

## Replacement principle

When removing a bad pattern, replace it with the smallest instruction that improves execution:

- replace vague aspiration with a bounded objective
- replace open-ended wandering with blocker logic ("if blocked, state the blocker precisely")
- replace bloated reporting with a tight output contract
- replace fake connector / file / skill specificity with truthful placeholders
- replace pre-stuffed context with pull-context references (`@file`, `Read`, MCP, subagent)
- replace "think step by step" with explicit acceptance criteria
- replace "use computer use" with the dedicated MCP routing pattern
- replace narrated skill loading with silent loading + the deliverable
- replace inline clarifying questions with `AskUserQuestion` gating

## Cowork-specific non-injection rule

The Cowork system prompt is large and already enforces many behaviors automatically — TodoWrite encouragement, AskUserQuestion guidance, citations, file delivery via `computer://`, MCP routing tiers, computer-use safety, link safety, no-financial-actions, tone / formatting, no narrated skill loading, no browser storage in artifacts.

The rewriter should **lean on these defaults** rather than restate them. Only inject explicit guidance for the highest-leverage Cowork-specific behaviors per task: TodoWrite-with-verification, AskUserQuestion gating, subagent delegation, pull-context references, MCP-first routing, deliverable-surface specification, citation discipline.

A rewrite that re-explains the entire Cowork operating model is bloat. A rewrite that surfaces *the one or two* Cowork-specific behaviors the prompt is missing is leverage.
