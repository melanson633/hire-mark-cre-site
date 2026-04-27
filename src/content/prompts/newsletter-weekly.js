import promptText from "./newsletter-weekly.xml?raw";

export const newsletterWeekly = [
  {
    id: "newsletter-weekly-cre-v1",
    title: "Weekly CRE Newsletter — Greater Boston & New England",
    category: "Newsletter Generation",
    purpose:
      "Generates a single-file, print-ready HTML weekly newsletter covering commercial real estate news for Greater Boston and broader New England. Resolves a rolling 7-day date window at runtime, enforces geographic and source rules, and outputs a dated archive file.",
    promptText,
    inputFormat:
      "Run against an AI agent with live web search. No manual input required; the agent resolves END_DATE from the current local date.",
    outputFormat:
      "Standalone HTML file saved to public/newsletters/weekly-cre-YYYY-MM-DD.html with embedded CSS, 8-12 items, inline citations, and a print-friendly layout.",
    tags: [
      "newsletter",
      "CRE",
      "Boston",
      "New England",
      "weekly",
      "HTML",
      "design-taste-frontend",
    ],
  },
];
