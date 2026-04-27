# Teaser landing-page walkthrough - 2026-04-26

## Build + download verification

- npm install: pass. Output reported `added 1 package`; notable warning: `2 vulnerabilities (1 moderate, 1 high)` and npm suggested `npm audit fix`.
- npm run build: pass. The `prebuild` hook ran `npm run build:skill-pack`, wrote `public/downloads/cowork-metaprompt.zip (21.3 KB)`, then Vite built `dist/` successfully.
- Zip integrity: pass. `public/downloads/cowork-metaprompt.zip` exists and expands to 10 files: `cowork-metaprompt/SKILL.md`, `cowork-metaprompt/README.txt`, seven files under `cowork-metaprompt/references/`, and `cowork-metaprompt/evals/trigger_evals.json`.
- Preview server: pass. `npm run preview -- --host 127.0.0.1 --port 4173` served the production build at `http://127.0.0.1:4173/`. The teaser route is `/`, confirmed in `src/App.jsx`.
- Email submit -> download reveal: pass. Submitting `test+codex@example.com` in preview mode reveals the message `Preview mode: the email provider is not connected yet, but your skill pack is ready below.` and the download button.
- Zip download click: pass. `Download the Cowork-Metaprompt skill pack` returned HTTP 200 and delivered `cowork-metaprompt.zip` at 21,823 bytes.

## First impression (pre-scroll, <=30s)

- Perceived product: AI/process automation consulting for SMB operating workflows, especially work trapped in inboxes, spreadsheets, PDFs, field notes, routing, and reports.
- Perceived audience: owner-led SMBs and operations/finance/back-office teams. This is directionally clear, but a first-time LinkedIn visitor may not know whether this is for business owners, ops managers, technical founders, or Claude/Cowork power users.
- Perceived value prop: get practical automation help and a free Cowork-Metaprompt skill pack. The workflow automation value prop is clear; the downloadable asset is more niche and assumes the visitor already understands Cowork, Claude Code, and skills.
- Obvious next action? Yes. The sticky header button says `Get the free pack`, the hero form is visible, and the email input is easy to find. The one point of friction is that the page alternates between `free pack`, `launch pack`, and `Cowork-Metaprompt skill`, so the exact thing being requested is not immediately consistent.

## Section-by-section notes

### Hero

- Headline: `Automate the SMB work stuck in inboxes, spreadsheets, and PDFs.` This is the strongest headline on the page. It names the pain and the work surface clearly.
- Body copy: `Forward-deployed AI and process automation consulting...` is understandable to AI builders, but `forward-deployed AI` is jargon for many SMB owners. Consider a plainer variant such as `Hands-on AI automation help for SMB teams...`.
- Proof points: the three pack chips are concrete, especially `Cowork-Metaprompt skill: rewrites raw prompts into Claude-best-practice form`. The issue is audience fit: a non-technical SMB visitor may ask, `What is Cowork, and why do I need a prompt rewriter?`
- Visual: the blueprint image fits the page well. It supports operational workflow mapping without looking like generic AI art.
- CTA: visible and usable. The copy below the form is honest about the download, but the page should probably choose one label for the offer: `Cowork-Metaprompt skill pack` or `launch pack`, not both.

### Service Model Cards

- Headline: `Not strategy theater. Practical builds in the actual operating layer.` It has personality and distinguishes the offer from advisory fluff, but `operating layer` is still consultant-speak.
- Body copy: mostly clear. `intake, cleanup, review, routing, reporting, and exception handling` is concrete and good.
- Proof points: `Best when the work already happens every week`, `Prompt packs, scripts, checklists, and review queues`, and `Built for handoff, not dependency` are directionally useful but still not evidence. A first-time visitor may want one example like `invoice intake`, `weekly job-cost report`, or `PDF lease abstract review`.

### Work Patterns

- Headline: `Useful AI work usually starts with the same business problems.` This is true but generic. It does not add as much as the hero headline.
- Body copy: `The public case-study artifacts are grounding material...` is confusing because there are no visible links to those case-study artifacts in this section. A first-time visitor may wonder where the artifacts are.
- Proof points: the three pattern cards are clear categories: `Documents become structured work`, `Field data reaches the back office cleanly`, and `Spreadsheet logic gets guardrails`. They explain the types of workflow well, but they are still claims rather than demonstrations.
- CTA: `Send me the launch pack` focuses the hero email input correctly.

### Audience / Final CTA

- Headline/body: `Built for` plus the audience bullets are useful. `Owner-led SMBs`, `Finance, operations, construction, field service`, and `Leaders who need leverage...` help qualify the audience.
- Final CTA: `Join the list before the full site rolls out.` is clear, but `Coming soon, no public date` reduces urgency and trust unless paired with something concrete already available.
- Proof/trust: this section is the right place to add a small sample output, one sentence about Mark's background, or a note like `No spam. One practical workflow note per week.` Right now it asks for email without adding much new reassurance.

## Interaction findings

- Header CTA -> focuses input? Pass. Clicking `Get the free pack` focuses the hero email input.
- Mid-page CTA -> focuses input? Pass. Clicking `Send me the launch pack` focuses the hero email input.
- Empty submit: native browser validation blocks submission and shows the validation message `Please fill out this field.` The custom React error message `Enter an email address to request the launch pack.` does not appear in a normal click path because the `required` attribute prevents `onSubmit`.
- Malformed email: native browser validation blocks submission and shows `Please include an '@' in the email address. 'not-an-email' is missing an '@'.` The form remains usable, but no inline site-styled error appears.
- Successful submit + download flow: pass. Submitting `test+codex@example.com` in preview mode reveals the preview-mode message and the `Download the Cowork-Metaprompt skill pack` button.
- Final CTA form: pass. Submitting `test+codex@example.com` in the bottom form also reveals the same preview-mode message and download button.

## Link audit

| Link/button text | Target | Status |
|---|---|---|
| `Get the free pack` | Focuses hero email input | Pass |
| `Send me the pack` (hero form) | Submits hero email form | Pass; preview mode reveals download after valid email |
| `Download the Cowork-Metaprompt skill pack` | `/downloads/cowork-metaprompt.zip` | Pass; HTTP 200, 21,823 bytes |
| `Send me the launch pack` | Focuses hero email input | Pass |
| `Send me the pack` (final form) | Submits final email form | Pass; preview mode reveals download after valid email |

## Responsive issues

- 380px: no horizontal overflow. The hero text is readable, but the hero image is pushed far below the CTA panel, so first-time mobile visitors do not see the visual concept before deciding whether to submit. The sticky nav fits, but `Get the free pack` takes most of the right side.
- 768px: no horizontal overflow. The image appears below the hero copy and form; layout is stable. The page feels long before the visitor reaches service detail.
- 1280px: no horizontal overflow. Desktop layout is the strongest version: headline, CTA, image, and supporting thumbnails are all visible in the first viewport.

## Confusing / non-intuitive things

- Highest impact: the offer label is inconsistent. The page uses `free pack`, `free launch pack`, `launch pack`, `Cowork-Metaprompt skill`, `prompt library`, and `weekly operator notes`. Pick a primary offer name and make the rest supporting detail.
- `Forward-deployed AI` may be too insider for SMB operators. The page becomes clearer when it says concrete things like `intake`, `cleanup`, `review`, `routing`, and `reporting`.
- `Cowork-Metaprompt` is introduced before explaining what Cowork is or who the skill is for. Non-technical SMB visitors may not know whether this is useful to them.
- `The public case-study artifacts are grounding material` references artifacts the visitor cannot click or inspect on the teaser page.
- `Full site coming soon. There is no official target date for the full rollout.` is honest, but it may create a stalled-project feeling unless balanced by the concrete downloadable asset.

## Broken / hard-to-navigate

- No page-level 404s or broken download links found.
- Native browser validation prevents the site-styled empty-email error from appearing. Functionally fine, but visually inconsistent with the rest of the page.
- The in-app browser MCP session had a tooling issue during testing (`Root CDP client not initialized`), so detailed interaction checks were run with Playwright against the same production preview URL. The preview page itself served and behaved correctly.

## Trust + credibility gaps

- No short bio or credibility line explains why Mark is qualified to build these systems.
- No sample output is visible before asking for email. A thumbnail or excerpt from the Cowork-Metaprompt skill would make the download feel more tangible.
- No privacy expectation is stated near the form. Add a simple line such as `No spam; one practical workflow note at a time.`
- No before/after example shows what a messy workflow looks like before and after automation.
- No client type, industry example, or concrete workflow example is named in the hero.

## Top 5 fixes I would make

- Rename the CTA consistently around the actual immediate deliverable: `Get the Cowork-Metaprompt skill pack`. Then mention prompt library and weekly notes as follow-on benefits.
- Replace `Forward-deployed AI and process automation consulting` with a plainer line: `Hands-on AI automation help for SMB teams buried in inboxes, spreadsheets, PDFs, field notes, and recurring reports.`
- Add a small `What's inside` block next to the form: `SKILL.md`, `7 reference playbooks`, `10 trigger evals`, and `install instructions`.
- Add one concrete workflow example in the service cards, such as `turn invoice PDFs into a review queue` or `convert field notes into a clean back-office approval path`.
- Add a trust line near the final CTA: Mark's role/background, a sample artifact link, and a simple privacy promise.
