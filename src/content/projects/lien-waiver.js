export const lienWaiver = {
  slug: "lien-waiver",
  category: "AI Automation",
  title: "Construction Lien Waiver Automation",
  summary:
    "End-to-end Python system that parses AP aging reports, invoice registers, and subcontractor detail files, then generates personalized mechanic's lien waiver documents for each subcontractor on a construction project.",
  points: [
    "Fuzzy vendor name matching across three data sources",
    "State-machine PDF and Excel parsing",
    "Automated Word document generation with dynamic tables",
    "Audit trail with timestamped run manifests",
    "Configurable fuzzy match threshold and output formatting",
  ],
  description:
    "Built to replace a manual, error-prone process on a live construction project at 121 Technology Drive. The system ingests AP aging PDFs, invoice register PDFs, and subcontractor detail spreadsheets, consolidates them using fuzzy name matching (85% threshold), calculates unconditional and conditional waiver amounts per subcontractor, and generates personalized Word documents from a legal template. Supports three input modes: raw source files, consolidated JSON, and CSV. Every run produces a manifest, summary report, and detailed log for compliance and auditability.",
  techStack: ["Python", "pandas", "pdfplumber", "python-docx", "thefuzz"],
  features: [
    "Multi-source data consolidation with fuzzy vendor matching",
    "State-machine regex parsing for PDF financial reports",
    "Decimal-precision currency handling with parenthetical negative support",
    "Split-run-aware Word template population with dynamic tables",
    "Timestamped audit trail with manifest.json per batch",
    "Negative paid amount detection and skip reporting",
  ],
  demoType: "case-study",
  artifacts: [
    { label: "Source Code", type: "github" },
    { label: "Skill Mining Analysis", type: "document" },
  ],
};
