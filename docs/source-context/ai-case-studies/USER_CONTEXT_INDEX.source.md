# User Context Index

Routing map for `00_user_context/` folders across all AI case studies. Do **not** bulk-load these assets. Use this index to pull only what the current task requires, then stop reading.

## How to Use

1. Identify which case study the task touches (01 / 02 / 03 / 04).
2. Check the "Load When" column to decide which asset is actually needed.
3. Prefer `case_study_intake.csv` first in every folder — it is the scope contract.
4. Treat every raw asset as unsanitized unless explicitly marked redacted. Scrub PII before any outward-facing artifact.
5. Never load full XLSX / PDF / image binaries to "see what's there." Use the purpose column; open only on demand.

---

## 01 — AI Lease Abstract Pipeline
Path: `01_ai_lease_abstract_pipeline/00_user_context/`

| Asset | Size | Purpose | Load When | Sensitivity |
|---|---|---|---|---|
| `case_study_intake.csv` | 10K | Completed 32-question intake with role, live-use, reuse/adoption, cost-avoidance, tooling, outputs, controls, variants, and sensitivity boundaries. | Always first — defines scope + exclusions. | User responses only. |
| `raw_lease_docs/tenantA_executed_lease_OCR_20250502.pdf` | 25M | Real OCR'd executed lease. | Only when demonstrating source material or OCR handling. | HIGH PII — tenant, address, terms. |
| `raw_lease_docs/tenantA_commencement_memo_20250609.pdf` | 569K | Commencement memo (rent start, possession). | Lease lifecycle / amendment handling discussion. | HIGH PII. |
| `raw_lease_docs/redacted/REDACTED_*.pdf` | Not present | Sanitized lease + memo, if later added. | Public demos, shareable examples only after confirming files exist and are safe. | Low if present and verified. |
| `raw_lease_docs/redacted/REDACTION_GUIDE.md` | Not present | Redaction methodology, if later added. | Sensitivity discussion / preparing shareable assets only after confirming the file exists. | Low if present. |
| `Shortcut_LeaseAbstractionPipeline_Workflow_v3.html` | 96K | Shortcut/Tango workflow guide showing setup, AI extraction flow, validation checkpoint, and output generation mechanics. | Workflow mechanics only; do not use as final branding or content template. | Moderate — screenshots/text may reveal workflow details and synthetic/redacted example names. |
| `Shortcut_LeaseAbstractionPipeline_Workflow_v3.pdf` | 1.9M | PDF export of the Shortcut workflow guide. | Workflow mechanics or visual QA fallback when HTML is unavailable. | Moderate — screenshots/text may reveal workflow details and synthetic/redacted example names. |
| `abstract_outputs/lease_abstract.pdf` | 320K | Final abstract (structured terms/dates/obligations). | Illustrating "after" state or case study output. | Moderate — parties + terms. |
| `abstract_outputs/excel-output_2026-03-24-lease-abstract-pipeline.xlsx` | 20K | Tabular abstract workbook. | Showing structured data output. | Moderate. |
| `abstract_outputs/AI-lease-abstract.html` | 17K | HTML-rendered abstract. | Web-viewable artifact demo. | Moderate. |

---

## 02 — Labor Time Entry App + ETL Pipeline
Path: `02_labor_time_entry_app_etl_pipeline/00_user_context/`

| Asset | Size | Purpose | Load When | Sensitivity |
|---|---|---|---|---|
| `case_study_intake.csv` | 11K | 33-question completed intake with role, tooling, AI-vs-automation framing, evidence boundaries, sanitization, metrics, and impact responses. | Always first — scope contract and narrative source. | Template / user responses only. |
| `raw_data.csv` | 163K | Time-entry source: employee, email, date, hours, property, work type, job code, billable, PTO/holiday (17 cols). | Explaining ETL input schema / transformation rules. Read header + few rows only. | HIGH — names, emails, hours, properties. |
| `0226 MAINT Billings.xlsx` | 599K | Original billing export (5 sheets: IMPORT, Consolidated, pivot, tables, invoice). | Internal-only billing consolidation logic / output structure. Prefer redacted workbook for outward artifacts. | HIGH — amounts, hours, intercompany allocation. |
| `redacted_0226 MAINT Billings.xlsx` | 605K | Redacted billing workbook derived from the original billing export. | Public-safe or recruiter-facing workbook evidence; verify redactions before embedding or quoting. | Lower, but still inspect before sharing. |
| `OverHead Savings Calculation.xlsx` | 12K | Savings / overhead calculation workbook supporting impact math. | Validating supported savings, time/cost assumptions, and impact claims. | Moderate — may contain business assumptions. |
| `Overhead Savings Calculator.png` | 35K | Visual snapshot of savings calculation. | Optional appendix visual for impact calculation; verify redaction/readability first. | Moderate — may show assumptions or amounts. |
| `Screenshot_HomePage_Desktop.png` | 45K | Desktop app home screen. | Workflow entry-point description. | Low — verify before embedding. |
| `Screenshot_mobile_TimeEntry1.PNG` | 456K | Mobile time-entry flow screenshot 1. | UX walkthrough / screen-by-screen demo. | Medium — may show names/hours/codes. |
| `Screenshot_mobile_TimeEntry2.PNG` | 280K | Mobile time-entry flow screenshot 2. | UX walkthrough / screen-by-screen demo. | Medium — may show names/hours/codes. |
| `Screenshot_mobile_TimeEntry3.PNG` | 242K | Mobile time-entry flow screenshot 3. | UX walkthrough / screen-by-screen demo. | Medium — may show names/hours/codes. |
| `Screenshot_Billing_csvImport.png` | 36K | Billing workbook import tab / CSV import evidence. | Showing input-to-billing pipeline mechanics. | Medium — verify redaction before embedding. |
| `Screenshot_Billing_SummaryTable.png` | 37K | Billing summary table screenshot. | Showing summarized billing output / review surface. | Medium — verify redaction before embedding. |
| `Screenshot_Billing_wb_PivotTable.png` | 35K | Billing workbook pivot table screenshot. | Showing review, aggregation, or analysis output. | Medium — verify redaction before embedding. |

---

## 03 — Personal Income Tax 1040 Estimate Workbook
Path: `03_personal_income_tax_1040_estimate_workbook/00_user_context/`

### Top-level
| Asset | Size | Purpose | Load When | Sensitivity |
|---|---|---|---|---|
| `case_study_intake.csv` | 5K | 34-question intake template (blank responses; includes role, tooling, reusable-vs-private evidence, tax limits, sanitization). | Always first. | Template only. |
| `Screenshot_EstimatePage1.png` | 43K | Estimate sheet — income inputs (W-2, int, div, cap gains, SE). | Workflow visual / template validation. | PII — taxpayer name, filing status. |
| `Screenshot_EstimatePage2_followups.png` | 51K | Estimate — adjustments, deductions, credits, withholding, safe-harbor. | Calc walkthrough / controls demo. | PII — amounts. |
| `Screenshot_RatesPage1.png` | 35K | TY2025 rate table page 1. | Explaining rate logic. | Constants only. |
| `Screenshot_RatesPage2.png` | 48K | TY2025 rate table page 2. | Explaining rate logic. | Constants only. |
| `Screenshot_RatesPage3.png` | 43K | TY2025 rate table page 3. | Explaining rate logic. | Constants only. |
| `Screenshot_SchC_page.png` | 51K | Schedule C sheet (revenue, COGS, deductions, net profit). | SE-income modeling demo. | PII — gross receipts, net profit. |
| `Screenshot_summary-page .png` | 52K | Summary — AGI, tax, credits, payments, balance. | Final-output demonstration. | PII — tax totals, balance due. |

### `Codex Skill File_build-1040-estimate-workbook/`
Reproducibility artifact — the Codex skill that builds the workbook. Most reference docs are non-sensitive procedural content; the three completed example workbooks contain real PII.

| Asset | Size | Purpose | Load When | Sensitivity |
|---|---|---|---|---|
| `SKILL.md` | 8K | Skill manifest: scope, 3-phase build path, cell map, W-2 sidebar logic. | Reproducibility / implementation pattern. | Non-sensitive. |
| `agents/openai.yaml` | <1K | Agent config stub. | Only if agent routing discussed. | Non-sensitive. |
| `reference/1040_Estimate_Template.xlsx` | 25K | 6-sheet wired template (no client data). | Template maintenance / structure validation. | Constants only. |
| `reference/formula-patterns.md` | 5K | AGI roll-up, tax calc, credits formula patterns. | Phase 2 population details. | Non-sensitive. |
| `reference/ty2025-constants.md` | 3K | TY2025 thresholds, rates, filing-status constants. | Rate-logic validation. | Non-sensitive. |
| `reference/schedules.md` | 4K | SchC/D/E population guidance. | Schedule-specific logic. | Non-sensitive. |
| `reference/workbook-builder.md` | 8K | Step-by-step build logic + validation checklist. | Implementation walkthrough. | Non-sensitive. |
| `reference/api-client.md` | 4K | Shortcut.ai integration guide. | When discussing Shortcut-assisted extraction. | Non-sensitive. |
| `reference/execution-paths.md` | 5K | Manual vs. Shortcut.ai decision tree. | Automation-tradeoff discussion. | Non-sensitive. |
| `reference/prompt-engineering.md` | 7K | Prompt patterns for extraction & validation. | AI interaction patterns discussion. | Non-sensitive. |
| `reference/Mandle_Rachel_Stefan_TY2025_Federal_Tax_Estimate.xlsx` | 30K | Completed real-client workbook. | Template comparison only. Do not share. | HIGH PII. |
| `reference/Tomanek_Luke_TY2025_Federal_Tax_Estimate.xlsx` | 31K | Completed real-client workbook. | Template comparison only. Do not share. | HIGH PII. |
| `reference/DGio25_Est_Reference.xlsx` | 34K | Completed real-client workbook. | Template comparison only. Do not share. | HIGH PII. |
| `scripts/shortcut_client.py` | 10K | Python client for Shortcut.ai API. | API integration discussion. | Non-sensitive. |

---

## 04 — Yardi + Argus Integrated Cash Flow
Path: `04_yardi_argus_integrated_cash_flow/00_user_context/`

| Asset | Size | Purpose | Load When | Sensitivity |
|---|---|---|---|---|
| `MANIFEST.md` | 13K | Routing inventory for the expanded 04 user-context folder, including claim support and public visual recommendations. | Read first for 04 before loading any raw asset. | Routing summary only, but references sensitive assets. |
| `case_study_intake.csv` | 17K | Completed 34-row intake for the Yardi-Argus model bridge, audience, public-use boundaries, impact claims, metrics, controls, limitations, and visual/redaction decisions. | Read after manifest; scope contract for all public claims. | User responses only; includes sensitivity instructions. |
| `0825 - TIP 1.0 Supplemental - 101625.xlsx` | 3.0M | Supplemental cash-flow/model update workbook with actuals, forecast, model, balance sheet, debt, mapping, query, and capex sheets. | Internal validation of workbook structure, formulas, update process, and model outputs. | HIGH: property financial data, model logic, forecast assumptions, and employer-sensitive details. |
| `2025 Pro Forma_BG Model 02232026vv10_mem.xlsx` | 5.6M | Larger pro forma / asset-management model with waterfall, checks, model driver, budgets, forecasts, debt/refi, revenue, OPEX, and property-level tabs. | Internal validation of pro forma architecture, summary outputs, checks, and forecasting workflow. | HIGH: property financial data, debt/refi assumptions, budgets, and model IP. |
| `Update_model_p1.md` | 8K | Workflow note for downloading Yardi GL data. | Explaining source-export process or building sanitized workflow diagrams. | HIGH: may expose Yardi URLs, property selectors, screenshots, and employer process details. |
| `Update_model_p2.md` | 11K | Workflow note for saving GL reports, placing files in model paths, copying prior supplementals, refreshing Power Query/data tables, and checking new months. | Explaining refresh/update procedure and controls. | HIGH: may expose paths, workbook names, screenshots, and operating controls. |
| `Update_model_p3.md` | 3K | Workflow note for checking Yardi cash and comparing total cash to the Excel model period balance. | Explaining cash tie-out controls. | HIGH: may expose Yardi URLs, property selection, cash balances, and screenshots. |
| `model_troubleshoot.md` | 17K | Troubleshooting log for cash/deposit variance investigation. | Internal evidence for exception handling, reconciliation controls, and diagnostic workflow. | HIGH: dollar amounts, property/system references, variance investigation, and operational detail. |
| `workbook_context.md` | 8K | Workbook architecture note covering Power Query flow, sheets, mapping, sign conventions, refresh sequence, and known issues. | Read before deeper workbook analysis or technical explanation. | HIGH: property context, network paths, formulas, balances, model internals, and operational issues. |
| `M_Code_GL.png` | 121K | Screenshot of Power Query M code for GL Data transformation. | Internal evidence for folder ingestion, cleanup, and debit/credit logic; recreate for public use. | HIGH until redacted: code, paths, account/property columns, and model IP. |
| `M_Code_Merge.png` | 183K | Screenshot of Power Query M code for MERGE transformation. | Internal evidence for Yardi/Argus/debt append and mapping bridge; recreate for public use. | HIGH until redacted: code, mapping logic, query names, fields, and model IP. |
| `Screenshot_yardi_actuals_only.png` | 67K | Yardi actuals-only view or extracted actuals section. | Potential internal visual for source-data or actuals input. | HIGH until reviewed: report data and property financial values. |
| `Screenshot_yardi_actuals_month1.png` | 50K | First-month Yardi actuals or monthly actuals view. | Potential internal visual for update-period logic. | HIGH until reviewed: report data and property financial values. |
| `Screenshot_noi_drill_down.png` | 139K | NOI drill-down screenshot inside the model/reporting workflow. | Internal evidence for drill-down capability; recreate or redact for public use. | HIGH until reviewed: property-level revenue/expense/NOI values. |
| `Screenshot_capex_drill_down.png` | 62K | Capex drill-down screenshot inside the model/reporting workflow. | Internal evidence for capex detail / variance analysis; recreate or redact for public use. | HIGH until reviewed: capex values, projects, or property details. |
| `Screenshot_acquisition_entry_drill_down.png` | 122K | Acquisition-entry drill-down or transaction/detail screenshot. | Internal evidence for source-to-model traceability. | HIGH until reviewed: transaction details, accounting entries, or property data. |
| `Screenshot_forecast_noi_drill_down.png` | 66K | Forecast NOI drill-down table screenshot. | Internal evidence for Argus forecast rows after transformation. | HIGH until reviewed: account descriptions, forecast periods, source flags, and amounts. |
| `model_merged.png` | 62K | Integrated model output screenshot with historical/forecast periods and model rows. | Internal evidence for actual-to-forecast model view; recreate for public use. | HIGH until reviewed: identifiers, period values, cash, NOI, capex, financing, and model structure. |
| `model_bs_change_net_working_capital.png` | 86K | Balance-sheet / NWC treatment screenshot with schedules and checks. | Internal evidence for NWC logic and tie-out controls; recreate for public use. | HIGH until reviewed: account names, period balances, assumptions, and checks. |
| `dynamic_cash_distro_formula.png` | 59K | Dynamic owner-distribution logic screenshot with formula bar and cash-control rows. | Internal evidence for distribution sizing and formula-driven decision support; recreate for public use. | HIGH until reviewed: formulas, cash balances, distributions, periods, and model structure. |
| `Argus_raw_revenue.png` | 42K | Raw Argus revenue data screenshot. | Explaining Argus forecast input structure if needed. | HIGH until reviewed: revenue assumptions and property/model data. |
| `Argus_raw_expenses.png` | 56K | Raw Argus expense data screenshot. | Explaining Argus forecast input structure if needed. | HIGH until reviewed: expense assumptions and property/model data. |
| `Argus_model_input.png` | 65K | Processed Argus model input or imported forecast table screenshot. | Internal evidence for how Argus forecast data enters the model. | HIGH until reviewed: forecast assumptions and model mapping. |
| `Argus_model_input_capex.png` | 49K | Argus capex model input or imported capex table screenshot. | Internal evidence for capex forecast integration. | HIGH until reviewed: capex assumptions and model mapping. |

---

## Global Load Rules

- **Intake CSV first, always.** It is the scope contract for what claims the case study can make.
- **Sanitization before outward artifacts.** Every case study has HIGH-PII raw inputs. Redacted copies may exist only for case study 01; verify file presence before use.
- **Do not inline raw content into `case_study.md`.** Reference sanitized or synthesized derivatives.
- **When generating visuals:** load `docs/visual_guidelines.md` per `AGENTS.md`.
- **Gap handling:** If intake CSV is blank for a required field, flag the gap — do not invent.
