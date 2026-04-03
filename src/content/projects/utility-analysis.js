export const utilityAnalysis = {
  slug: "utility-analysis",
  category: "CRE Operations",
  title: "Commercial Property Utility Billing Analysis",
  summary:
    "Documented the end-to-end electric billing workflow at a multi-tenant commercial property — from master Eversource bill through Veolia submetering to Yardi tenant charge posting — to give property management clear visibility into a previously opaque process.",
  points: [
    "Master bill reconciliation across supply and delivery charges",
    "Third-party submeter billing workflow documentation",
    "Yardi charge posting verification",
    "Demand charge and peak/off-peak rate analysis",
  ],
  description:
    "Prompted by an internal request from the SVP of Property Management to understand the utility billing process at 15 Guest Street, Brighton MA. The analysis traced the full flow: Eversource bills the property a consolidated electric bill (supply via Constellation NewEnergy + delivery), Veolia reads tenant submeters and calculates each tenant's share, and accounting posts charges through Yardi. Deliverables included a process map, bill component breakdown, and recommendations for billing verification. The work revealed that accounting had no role in calculating tenant charges — Veolia handles it end-to-end — which clarified team responsibilities and eliminated redundant review steps.",
  techStack: ["Excel", "Yardi", "PDF Analysis"],
  features: [
    "Eversource master bill decomposition (supply vs. delivery)",
    "Veolia submeter invoice reconciliation",
    "Yardi utility billing charge register mapping",
    "Process workflow documentation for property management",
  ],
  demoType: "case-study",
  artifacts: [
    { label: "Billing Process Map", type: "document" },
  ],
};
