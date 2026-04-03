export const advanceRequest = {
  slug: "advance-request",
  category: "AI Architecture",
  title: "CRE Advance Request Automation",
  summary:
    "Technical architecture and implementation roadmap for automating commercial real estate funding request processing using AI-powered PDF segmentation, Excel normalization, and intelligent invoice matching.",
  points: [
    "Gemini 2.5 Pro integration for schema mapping and PDF segmentation",
    "Six-phase build order from utilities to full pipeline",
    "Yardi Excel normalization with auto-header detection",
    "Multi-invoice PDF splitting with per-page metadata extraction",
  ],
  description:
    "A detailed technical specification for automating CRE draw request packages — the monthly process where property managers submit invoices, lien waivers, and supporting documents to lenders for construction funding. The system uses Google Gemini 2.5 Pro for intelligent schema mapping and PDF segmentation, normalizes Yardi exports into standardized formats, matches invoices to supporting documents, and packages everything into lender-ready deliverables. Designed as a six-phase build with parallel tracks for Excel and PDF processing.",
  techStack: ["Python", "pandas", "Google Gemini API", "PyMuPDF", "YAML"],
  features: [
    "AI-powered column mapping for inconsistent Excel exports",
    "Multi-invoice PDF segmentation with page-range detection",
    "Lender-specific configuration via YAML profiles",
    "Error-rate threshold enforcement in pipeline orchestration",
    "Invoice-to-document matching with confidence scoring",
  ],
  demoType: "case-study",
  artifacts: [
    { label: "Implementation Roadmap", type: "document" },
    { label: "Function Signatures", type: "document" },
  ],
};
