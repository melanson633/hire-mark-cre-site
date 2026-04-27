# Labor Time Entry App + ETL Pipeline

Concise case-study artifact for the custom mobile labor time-entry application and downstream ETL pipeline used for intercompany labor billing.

Primary source basis:

- `../../tech-ai-proof-points.md`
- `../../../02_resume_cv/fpa_finance/Mark_Melanson_Resume_FPA.html`

Final artifact targets:

- `case_study.html`
- `case_study.pdf`

Optional interim draft:

- `case_study.md`

## Drafting Notes

- Scope contract: `00_user_context/case_study_intake.csv` (33 questions, completed).
- Visuals are sanitized / synthetic per intake Q21/Q28/Q29; confirmed against source images before embedding.
- Metrics traced: users (20+ field, 3 PM, 3 construction PM), 70+ property entities, 50+ projects, 12k+ entries, ~$103K overhead savings (source `OverHead Savings Calculation.xlsx`).
- Employer name treated as generic ("operator entity") in the narrative; the hero screenshot retains RJK branding from the dev environment as provided by the user — acceptable as an employer-level, not client-level, detail.
- `case_study.pdf` rendered from `case_study.html` via Playwright/Chromium `page.pdf()` at Letter with 0.5in margins.
- Assets under `assets/` are sanitized copies of the source screenshots; originals remain in `00_user_context/`.
