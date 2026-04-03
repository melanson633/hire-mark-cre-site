# Teaser Variation Directions

## Purpose

This document captures the current visual-direction analysis for the live teaser page at `/`.

Treat these as intentional test variations to build and compare, not as final locked design. A future session agent should use this file as the canonical reference when prototyping teaser redesign iterations or extending the chosen direction across the broader site.

## When To Read This

Read this after:

1. `00_overview.md`
2. `10_site_strategy.md`

Read this before:

- editing `src/pages/TeaserPage.jsx`
- replacing `src/styles/teaser.css`
- introducing a new visual system intended to influence `/home` and other routes

## Build Intent

- The teaser page should feel premium, modern, and conceptually strong.
- It should not read like a generic SaaS landing page.
- It should express Mark's overlap across CRE finance, Excel systems, AI tooling, prompts, automations, and research.
- The teaser should be a launch shell with a strong point of view, not a resume dump.
- Variations should be built as discrete concepts that can be compared.

## Reference Set Reviewed

- `https://www.gnosis.io/?ref=siteinspire`
- `https://motherofalllists.com/?ref=siteinspire`
- `https://opticskypro.com/?ref=siteinspire`
- `https://maben.com.au/?ref=siteinspire`
- `https://www.awwwards.com/sites/the-empty-glass`
- `https://emptyglassproject.com/`
- `https://www.synnect.com/`
- `https://www.gru.space/`
- `https://thefutureofexperience.com/`

## Shared Patterns Across The Reference Set

- Oversized, high-confidence hero typography
- One dominant visual metaphor or focal object
- Sparse navigation chrome with deliberate spacing
- Editorial typography mixed with product-style UI
- Backgrounds treated as atmosphere, scene, or field instead of flat color
- Premium feeling created through reduction and composition, not feature density
- Card and panel systems used selectively, usually as framed artifacts rather than as generic marketing tiles

## Direction 1: Ledger Atmosphere

### Concept

A cinematic operator environment built from floating financial artifacts rather than dashboard clichés.

### Core Visual Idea

The hero is a large statement paired with suspended artifact surfaces: a spreadsheet fragment, operator memo, and AI workflow panel arranged as designed evidence inside an atmospheric field.

### Borrow From References

- `gnosis.io`: oversized statement and immersive field
- `synnect.com`: serif and sans contrast, halo background treatment
- `thefutureofexperience.com`: polished framing and restraint

### Avoid

- crypto-style neon language
- too many glassmorphism layers
- polished-but-generic startup luxury

### Teaser Page Direction

- Make the headline much larger and more declarative
- Let 2-3 preview surfaces overlap with more drama and scale contrast
- Reduce explanatory copy and rely more on artifact composition

### Broader Site Direction

- Each content lane gets a distinct surface treatment
- Templates feel precise and tabular
- Tools feel instrument-like
- Research feels editorial but still controlled

### Typography

- High-contrast serif for emphasis and major headlines
- Restrained neo-grotesk sans for UI, body, and metadata

### Color And Background

- Deep ink
- Warm stone
- Muted electric blue
- Pale brass accents
- Radial light and soft atmospheric gradients instead of flat fills

### Motion

- Slow parallax
- Gentle panel drift
- Subtle cursor response
- Section reveals that feel physical, not flashy

### Risk / Tradeoff

This is the strongest all-around fit, but it can collapse into generic premium-tech polish if the surfaces are not specific to CRE/operator work.

## Direction 2: Redline Review Room

### Concept

A deal-room aesthetic driven by marked-up reports, underwriting packets, operating memos, and annotation systems.

### Core Visual Idea

The site feels like a clean, high-stakes review environment. The visual language comes from finance and construction process artifacts instead of startup marketing.

### Borrow From References

- `maben.com.au`: confidence, whitespace, industrial clarity
- `emptyglassproject.com`: discipline around a single clear metaphor
- `motherofalllists.com`: open white field and simple organization

### Avoid

- fake notebook or legal-pad nostalgia
- heavy paper textures
- over-styled editorial minimalism detached from the work

### Teaser Page Direction

- Use a mostly light field with one strong accent rail or side strip
- Build preview surfaces as clipped report fragments and review notes
- Introduce redline marks, callouts, and numbered references

### Broader Site Direction

- The site reads like a curated operating manual
- Shared annotation language appears across templates, prompts, tools, and research
- Section framing feels ordered and review-oriented

### Typography

- Assertive grotesk sans
- Narrow uppercase labels
- Optional serif only for selective pull quotes or note titles

### Color And Background

- Warm off-white
- Graphite
- Signal red-orange
- Muted olive or slate accents
- Mostly solid fields and crisp divider rules

### Motion

- Underline draws
- Panel snaps
- Controlled reveal sequencing
- Minimal playful motion

### Risk / Tradeoff

This is highly credible and differentiated for CRE, but it delivers less immediate spectacle than the more atmospheric directions.

## Direction 3: Curated Evidence Gallery

### Concept

An exhibition-style site where tools, prompts, research, and templates are presented as a curated body of work rather than as feature inventory.

### Core Visual Idea

The teaser page feels like an invitation into a private collection of operator-grade systems and research.

### Borrow From References

- `thefutureofexperience.com`: chapter framing and luxury editorial tone
- `motherofalllists.com`: clear taxonomy and category framing
- `emptyglassproject.com`: simple narrative object and focused explanation

### Avoid

- museum-like pretension
- decorative serif overload
- too many equal-weight cards

### Teaser Page Direction

- Introduce three prominent exhibit cards for templates, automations, and research
- Let the hero behave more like a curated introduction than a sales pitch
- Emphasize chapter-like entry points and controlled previews

### Broader Site Direction

- Organize the broader site into collections or chapters
- Make projects, prompts, and tools feel intentionally curated
- Use consistent framing devices, labels, and preview conventions

### Typography

- Elegant display serif for major titles
- Clean sans for metadata, labels, and interface text

### Color And Background

- Chalk white
- Smoke
- Black
- Deep navy
- One accent color per lane or collection

### Motion

- Horizontal card movement
- Framed-image zooms
- Drawer or case-like reveal behavior

### Risk / Tradeoff

This is premium and memorable, but it can drift too far into editorial culture-site territory unless the operator substance stays visible.

## Direction 4: Signal Chamber

### Concept

A more experimental system-oriented concept centered on one interactive instrument rather than a conventional hero block.

### Core Visual Idea

The page behaves like a live command chamber where spreadsheets, prompts, automations, and research are all treated as connected signals inside one system.

### Borrow From References

- `synnect.com`: interactive central object
- `gru.space`: cinematic commitment
- `gnosis.io`: confidence around a single dominant idea

### Avoid

- hacker-terminal cliché
- sci-fi gimmicks
- green-on-black visual shorthand

### Teaser Page Direction

- Replace the standard hero composition with one central instrument or orbital interface
- Let the three main lanes activate different system states
- Tighten the copy and make the page more declarative

### Broader Site Direction

- The site behaves like one operating system with multiple modes
- Navigation can feel like switching instruments, views, or channels
- Data visuals and diagrams become more central to the identity

### Typography

- Sharp modern sans
- Selective italic serif contrast
- Mono only for metadata or machine-like notation

### Color And Background

- Charcoal
- Mineral gray
- Dim ivory
- Oxidized copper or electric cyan accents
- Faint field texture or scanline-like depth

### Motion

- Orbital transitions
- Signal traces
- Responsive diagrams
- Ambient, always-on movement

### Risk / Tradeoff

This is the most ownable and the most experimental. It is also the easiest to overdesign and the hardest to keep grounded for a finance-first audience.

## Recommendation

### Strongest Default Direction

`Ledger Atmosphere` is the strongest direction for this project.

It carries the premium, modern, concept-driven energy found in the reference set while still mapping cleanly to CRE finance, Excel systems, AI tools, prompts, automations, and research. It also gives the teaser page a strong immediate point of view without breaking future expansion into `/home`, `/projects`, `/prompts`, `/tools`, and `/about`.

### Best Secondary Direction

`Redline Review Room` is the best backup if the goal shifts toward a more sober, operator-heavy, process-first identity.

## Guidance For Future Build Sessions

- Build variations as separate, named concepts rather than as small incremental tweaks.
- Preserve the content model in `src/content/teaserHome.js` unless there is a clear content reason to change it.
- Prioritize hero composition, typography, panel treatment, and background system before polishing secondary sections.
- Use teaser-specific styling to establish a broader visual system only if it can scale across the rest of the site.
- Avoid falling back to a default SaaS hero with a screenshot and feature grid.
- If multiple concepts are implemented, label them clearly in docs or branch notes as teaser variation tests.
