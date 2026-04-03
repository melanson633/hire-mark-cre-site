export const debtExtraction = {
  slug: "debt-extraction",
  category: "AI Architecture",
  title: "Commercial Debt Document Extraction Pipeline",
  summary:
    "Five-phase AI workflow that segments, extracts, and reconciles commercial loan document packages into schema-compliant JSON with full citation chains and amendment modification tracking.",
  points: [
    "Five-phase workflow: meta-plan, segmentation, extraction, reconciliation, output",
    "Per-field citation and confidence scoring",
    "Amendment modification tracking with old/new value logging",
    "Automatic reconciliation checks for loan amount totals",
    "Schema gap detection for unmapped document clauses",
  ],
  description:
    "Designed for capital markets, special servicer, and legal teams processing complex multi-tranche loan packages. The system handles the full lifecycle: confirming document completeness, segmenting by property/closing, extracting all required fields with citations, tracking how amendments modify base terms, and reconciling calculated totals against stated values. Includes a two-phase variant (Loan-Extractor-Abstractor v1.0) that produces both JSON extraction and a polished 7-page markdown abstract in a single pass.",
  techStack: [
    "Prompt Engineering",
    "JSON schema design",
    "Citation architecture",
    "Multi-phase workflow orchestration",
  ],
  features: [
    "Package segmentation by property address and closing date",
    "Clause mapping regardless of document section headers",
    "Modification objects tracking field-level changes across amendments",
    "Reconciliation: loan_amount_total == sum(tranches[*].principal_limit)",
    "Prepayment premium schedule alignment verification",
    "Schema gap suggestions for unmapped clauses",
  ],
  demoType: "case-study",
  artifacts: [
    { label: "Extraction Prompt", type: "prompt" },
    { label: "Unified Extract + Abstract Prompt", type: "prompt" },
  ],
};
