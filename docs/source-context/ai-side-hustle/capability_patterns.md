# Capability Patterns — Extracted from Case Studies 01–04

Source: `../ai_case_studies/01_ai_lease_abstract_pipeline`, `02_labor_time_entry_app_etl_pipeline`, `03_personal_income_tax_1040_estimate_workbook`, `04_yardi_argus_integrated_cash_flow`.

These are *transferable capabilities*, not project descriptions. The CRE/tax surface is incidental; the pattern is the asset.

| ID | Pattern | Demonstrated In | Generalization |
|---|---|---|---|
| P1 | Document chaos → schema → branded artifact | 01, 03 | Heterogeneous client uploads (PDF/JPG/Word) → LLM extraction → schema validation → polished HTML/PDF deliverable. Owns the render pipeline (Playwright, audit rasters). |
| P2 | Cross-system ETL with canonical merged dataset | 02, 04 | Two+ source systems with mismatched schemas → canonical join → decision layer. Power Query, Python, scheduled refresh. |
| P3 | Field-workforce digitization with non-technical adoption | 02 | Mobile app shipped to 20+ field workers + 3 PMs who actually used it. Paper/clipboard → digital capture → ETL → reporting. Hidden moat: most AI freelancers can't get blue-collar adoption. |
| P4 | Productized AI Skills (not one-off scripts) | 03 | Reusable Codex/Claude Skill run on every engagement. Productized agent capability, parameterized, discoverable. |
| P5 | Scope contracts + audit trail discipline | 01, 02, 03, 04 | 33-question intake CSVs, MANIFEST sensitivity routing, redaction logic, page audit PNGs. Consulting-grade methodology that buyers pay premium for. |
| P6 | Quantified $ and time outcomes | 02, 04 | $800K capital-call decision; $103K overhead savings; 80–90 min → 2–3 min; 2.5 hr → 10–15 min; 12k+ entries; 70+ entities. Before/after instrumentation, not vibes. |
| P7 | Full-stack vertical delivery | All four combined | Schema design → ETL → UI/app (when needed) → branded output → SOPs. One-person agency stack — no hand-offs required. |

## Combined Read

Patterns P1–P7 together = a one-person AI services firm. Gap is positioning and an offer ladder, not capability.

The non-obvious edges (where most competing freelancers fail):
- **P3** — shipping UIs that non-technical field crews adopt
- **P5** — disciplined scoping + sensitivity-aware delivery
- **P6** — attributing dollars to the build
- **P7** — covering all layers without subcontracting
