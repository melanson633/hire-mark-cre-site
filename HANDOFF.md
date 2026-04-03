## Status: Complete — All Phases Done

## Phase 1: DONE
Routing, layout extraction, projects page with 3 project cards. No action needed.

## Phase 2: DONE
Project detail pages, prompts library (8 prompts, 4 categories), about page, 5 total projects. No action needed.

## Phase 3: DONE
Newsletter page (placeholder), 3 Excel template downloads, DSCR calculator on /tools, 404 page, scroll-to-top, per-page meta tags, mobile polish. All completion contract items verified.

### Remaining item
- **Newsletter wiring**: `/newsletter` ships with placeholder form. User chose to defer provider wiring. When ready, update `handleSubmit` in `src/components/NewsletterForm.jsx` to POST to Beehiiv/Buttondown endpoint, and update `src/content/newsletter.js` to remove `placeholderNote` and update `successBody`.

---

## Key Decisions (carry forward)
- **Tone**: Operator-builder — lead with CRE ops, AI/Excel as force multipliers
- **150-line component limit**: split UI from logic if exceeded
- **Content drives UI**: pages read from `src/content/` modules; adding content = adding a JS file
- **No email gates**: all content fully open
- **Existing card/button/section patterns**: reuse, don't reinvent

## Sensitive paths (never read or use)
- `USB_Migration_2026-03-28/sensitive/API KEYS/`
- `USB_Migration_2026-03-28/sensitive/personal/`
