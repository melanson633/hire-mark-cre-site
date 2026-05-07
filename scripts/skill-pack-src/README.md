# skill-pack-src

Vendored source for the archived cowork-metaprompt skill package.

## Layout

```
skill-pack-src/
  cowork-metaprompt/      <- vendored copy of the cowork-metaprompt skill
    SKILL.md
    references/01..07_*.md
    evals/trigger_evals.json
    README.txt             <- end-user instructions (ships inside the zip)
```

## Legacy build flow

`scripts/build-skill-pack.mjs` zips this folder into
`public/downloads/cowork-metaprompt.zip`. The zip is a build artifact and is
gitignored.

The current teaser signup no longer uses this ZIP, and normal local/Vercel
builds do not regenerate it.

To regenerate the legacy ZIP manually:

```
node .\scripts\build-skill-pack.mjs
```

## Upstream

The canonical authoring source lives in the cousin repo at
`Job_Search/01_master_profile/ai_side_hustle/offerings/cowork-metaprompt/`.
That folder is the place to **edit** the skill (run trigger evals there,
keep the conversion plan alongside).

When the upstream version changes, re-vendor by copying the updated
`SKILL.md`, `references/`, and `evals/trigger_evals.json` files into this
folder and committing. Per the site's CLAUDE.md, the cousin repo is a
read-only source — no runtime imports or symlinks. Distill, copy, commit.

## Why vendor at all

The site repo must stay deployable as a standalone repo. Vercel does not
have access to the cousin repo at build time. Vendoring keeps the source
visible, diffable in PRs, and reproducible across machines.
