Cowork Metaprompt — Free Launch Pack
=====================================

This is a drop-in Claude skill that rewrites raw prompts into stronger
prompts for the Cowork desktop app and for Claude Code.

What's inside
-------------

  cowork-metaprompt/
    SKILL.md                                — always-loaded behavior contract
    references/
      01_core-rewrite-method.md
      02_mode-and-output-contract.md
      03_task-classification-and-execution-stance.md
      04_connector-and-workspace-gating.md
      05_quality-augmenters.md
      06_task-type-playbooks.md
      07_anti-patterns-and-non-injection.md
    evals/
      trigger_evals.json                    — 10 cases for verifying trigger accuracy
    README.txt                              — this file

How to install
--------------

Cowork:
  1. Drop the entire `cowork-metaprompt/` folder into your Cowork skills directory.
     On macOS / Linux:
       ~/.claude/skills/
     On Windows:
       %APPDATA%\Claude\skills\
  2. Restart your Cowork session. The skill loads automatically when you ask
     it to "rewrite this prompt", "improve this prompt for Cowork", or
     similar — see SKILL.md for the full trigger surface.

Claude Code:
  1. Drop the folder into your project under `.claude/skills/cowork-metaprompt/`
     (or your global skills directory at `~/.claude/skills/`).
  2. Claude Code will pick it up the next time it indexes skills.

How it works
------------

You ask Cowork (or Claude Code) to rewrite a prompt. The skill reads SKILL.md,
classifies the prompt's task type, picks an execution stance (action / discovery
/ clarify-first), and applies only the augmenters that materially help — Done-when,
verification, TodoWrite-with-verification, AskUserQuestion gating, subagent
delegation, pull-context references, MCP-first routing, and so on.

The output is a paste-ready optimized prompt plus a short note on what the
rewrite changed, and (when relevant) optional follow-up questions.

What the skill won't do
-----------------------

- It will not execute the underlying task; it only rewrites prompts.
- It will not trigger on generic asks to improve code, writing, copy, emails,
  or other non-prompt artifacts.
- It will not author other skills, plugins, or MCP servers.

These boundaries are baked into the SKILL.md description so the skill stays
focused.

Feedback
--------

Built by Mark Melanson — https://markbuilds.ai

If you find a prompt class the skill mis-handles, send the prompt + the
rewrite you got back and I'll fold it into the eval set.
