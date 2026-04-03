import { creAnalysis } from "./cre-analysis.js";
import { leaseExtraction } from "./lease-extraction.js";
import { loanExtraction } from "./loan-extraction.js";
import { agreementProcessing } from "./agreement-processing.js";

export const allPrompts = [
  ...creAnalysis,
  ...leaseExtraction,
  ...loanExtraction,
  ...agreementProcessing,
];

export const promptCategories = [
  ...new Set(allPrompts.map((p) => p.category)),
];

export const promptTags = [
  ...new Set(allPrompts.flatMap((p) => p.tags)),
].sort();
