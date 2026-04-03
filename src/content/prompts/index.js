import { creAnalysis } from "./cre-analysis";
import { leaseExtraction } from "./lease-extraction";
import { loanExtraction } from "./loan-extraction";
import { agreementProcessing } from "./agreement-processing";

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
