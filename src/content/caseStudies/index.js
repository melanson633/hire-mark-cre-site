import { excelModelStudies } from "./excel-models";
import { aiToolStudies } from "./ai-tools";
import { operationsStudies } from "./cre-research";
export { importedCaseStudyArtifacts } from "./imported-artifacts";

export const workSection = {
  eyebrow: "Selected Work",
  title: "Examples of the kinds of systems worth showcasing.",
  intro:
    "These are framed as proof-of-capability cards for now. Later, each can become a case study, demo, or product page.",
  items: [...excelModelStudies, ...aiToolStudies, ...operationsStudies],
};
