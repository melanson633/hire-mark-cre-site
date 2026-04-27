# Mode and Output Contract

## Output modes

### Prompt-only

Return only the optimized prompt in a plain text markdown code block.

### Prompt + notes

Return:

1. Optimized Prompt
2. Why This Rewrite Is Better

### Prompt + notes + questions

Return:

1. Optimized Prompt
2. Why This Rewrite Is Better
3. Optional Questions

**Default: prompt + notes + questions**

## Strength modes

### Light

- minimal rewrite
- preserve more original shape
- fix only the highest-impact weaknesses
- notes short
- questions only if highly valuable

### Standard *(default)*

- balanced but assertive rewrite
- add structure when it materially helps
- inject **TodoWrite-with-verification** when the prompt implies more than one tool call
- inject **AskUserQuestion gating** for underspecified-by-default prompts (presentation, research, summary, digest, prep)
- include terse notes
- optional questions only when useful

### Strict

- stronger scope control
- stronger acceptance criteria
- stronger verification (often delegated to a subagent for high-stakes work)
- stronger blocker handling
- stronger downstream completeness checks (computer:// links, citations, artifact updates)
- explicit subagent delegation for context-heavy side-quests
- use for high-stakes or production-sensitive prompts

### Grounded

*Replaces the legacy "repo-aware" mode. Use only when grounding is genuinely available — a connector is named or implied, a workspace folder is selected, a skill is installed, or attached files are present (see references/04).*

- adapt wording to the actual connector / workspace / skill context
- name MCPs, files, folders, skills directly when grounded
- never fake connector / file / skill specificity
- prefer pull-context references (`@file`, MCP query, subagent) over pasted content

## Notes policy

Use compact bullets. Explain only the highest-leverage improvements.

When the rewrite added **TodoWrite**, **AskUserQuestion**, **subagent delegation**, or pulled a Cowork-specific surface (`computer://`, citations, artifact, `request_cowork_directory`), the notes must say so in one line. These are usually the highest-leverage improvements; flagging them helps the user verify the rewrite is doing the right thing.

## Optional questions policy

Questions must be:

- short
- specific
- non-blocking
- directly tied to improving the next pass

Omit the section entirely when not needed.
