# Connector and Workspace Gating

Replaces the legacy "repo-aware gating" pattern. Generalizes to all Cowork grounding surfaces: connectors / MCPs, the user's selected workspace folder, installed skills, and attached files.

## Use grounded mode only when warranted

Grounded handling is appropriate only when:

- a connector / MCP is named or clearly implied (Gmail, Calendar, Slack, GDrive, Notion, etc.), or
- the user's selected workspace folder is referenced or attached files are present, or
- a specific skill is named or clearly applicable (`pptx`, `docx`, `xlsx`, `pdf`, `theme-factory`, etc.), or
- the session genuinely provides enough Cowork-specific grounding to adapt the rewrite responsibly

## Preflight gate

Check, in order:

1. Is there a named or implied **connector / MCP** the rewrite should route to?
2. Is there a named or implied **workspace folder / file** the rewrite should reference?
3. Is there a named or implied **skill** the rewrite should invoke (`pptx`, `docx`, `xlsx`, `pdf`, `theme-factory`, etc.)?
4. Is there enough grounding for the rewrite to be specific without faking it?

## Branches

### A. Grounded

Use when grounding is real and sufficient.

Rewrite should:

- name the connector / file / folder / skill directly
- instruct the agent to read the relevant `SKILL.md` first when a skill applies
- prefer **dedicated MCP > Chrome MCP > computer-use** routing, naming the dedicated MCP at the top
- specify the delivery surface (chat / `computer://` link to file / artifact / connector action)
- add grounded verification language (re-read the saved file at the named path; verify the connector returned the expected count; screenshot the resulting state)

### B. Partial

Use when a surface is implied but not concretely named.

Rewrite should:

- stay useful and actionable
- avoid invented connector / file / skill specificity
- preserve placeholders (`<your selected folder>`, `<the connected calendar>`, `<the slack channel of your choice>`)
- note the limitation in one line in the notes
- still instruct the agent on the *correct routing pattern* (e.g., "if a Slack MCP is connected, route there; otherwise…")

### C. Unavailable

Use when nothing concrete is grounded.

Do not stall and do not fake specificity.

Rewrite should:

- produce the strongest non-grounded version possible
- **explicitly instruct the agent to call `search_mcp_registry` / `suggest_connectors`** if no matching tool is connected, before falling through to computer-use
- **instruct the agent to call `request_cowork_directory`** if a workspace folder is needed and none is selected
- preserve hooks the user can fill in later (named placeholders for tools / files / channels)
- state briefly in the notes that grounding was unavailable

## Truthfulness rule

Never pretend:

- a connector is connected
- a folder is selected or its contents are known
- a skill is installed
- a file exists at a path

unless that grounding is actually present in the conversation. When in doubt, drop to branch B or C.

This rule mirrors the Cowork system prompt's own "look before you assert" discipline — the rewriter must instruct the agent to look (list connectors, list granted apps, list workspace contents) rather than assume.
