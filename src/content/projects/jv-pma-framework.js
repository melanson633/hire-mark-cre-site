export const jvPmaFramework = {
  slug: "jv-pma-framework",
  category: "AI Architecture",
  title: "JV/PMA Agreement Processing Framework",
  summary:
    "Two-stage AI pipeline that converts Joint Venture LLC agreements and Property Management Agreements into structured JSON, then generates investor-grade abstracts with compliance flagging and amendment tracking.",
  points: [
    "Dual-prompt architecture: extraction then abstraction",
    "Structured field capture with confidence scoring",
    "Amendment chronology and supersedence tracking",
    "Compliance flagging for fee outliers and unusual terms",
    "Investor-grade abstract generation with citation traceability",
  ],
  description:
    "Built for CRE acquisition and asset management teams that need to quickly parse complex JV operating agreements and property management contracts. The extraction prompt captures all critical field paths — capital contributions, distribution waterfalls, governance triggers, fee structures, and termination provisions — with per-field citations and confidence scores. The abstraction prompt transforms that structured data into a 6-page investor-ready abstract with executive fact sheet, duties matrix, compliance snapshot, and amendment log. Designed to handle multi-amendment stacks where provisions have been superseded or partially modified over time.",
  techStack: [
    "Prompt Engineering",
    "XML-structured prompts",
    "JSON schema design",
    "Contemplative Constitution framework",
  ],
  features: [
    "Core JV path extraction: waterfall hurdles, promote splits, removal triggers",
    "Core PMA path extraction: fee structures, budget cycles, termination provisions",
    "Missing data protocol with checked-page citations",
    "Executive fact sheet with key-metrics table",
    "Two-column duties matrix (Owner vs Manager)",
    "Chronological amendment log with key change summaries",
  ],
  demoType: "case-study",
  artifacts: [
    { label: "Extraction Prompt", type: "prompt" },
    { label: "Abstraction Prompt", type: "prompt" },
  ],
};
