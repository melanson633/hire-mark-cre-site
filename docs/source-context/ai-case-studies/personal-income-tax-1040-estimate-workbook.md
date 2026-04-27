# Personal Income Tax 1040 Estimate Workbook

Concise case-study artifact for an AI-assisted TY2025 1040 estimate workbook Skill used live in Mark's solo tax prep practice.

Primary source basis:

- `00_user_context/Codex Skill File_build-1040-estimate-workbook/` — proves the reusable Skill.
- `00_user_context/Screenshot_*.png` — source workbook pages (Estimate, Summary, SchC, Rates).
- `00_user_context/case_study_intake.csv` — 33-question scope contract (completed).

Final artifact targets:

- `case_study.html`
- `case_study.pdf`

## Drafting Notes

- Scope contract: `00_user_context/case_study_intake.csv` (completed 2026-04-22).
- Visuals sanitized via `scripts/sanitize_screenshots.py`: personal names (Mark, Mariah, Charlotte) redacted; employer / third-party business names (Sun Life, J Mulkerin Realty, Swirl Corp) retained per intake Q28/Q29. Originals remain in `00_user_context/`.
- Metrics claimed: 20+ 1040 clients, ~10 minutes per workbook run, TY2025 season, first step of every engagement once locked in (intake Q20/Q23).
- Rendered to PDF via Playwright/Chromium `page.pdf()` at Letter, 0.5in margins, `prefer_css_page_size=True`.
- Audit PNGs in `audit_pngs/` rasterized via pypdfium2 at scale=2.0.
- Final length: 5 pages — within the 5-6 page guidance.
