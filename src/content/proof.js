import { allProjects } from "./projects";
import { importedCaseStudyArtifacts } from "./caseStudies";

export const proofPage = {
  eyebrow: "Proof",
  title: "A curated proof library for CRE audit credibility.",
  intro:
    "The work is grouped by the kind of operating problem it helps diagnose: document chaos, finance models, reporting handoffs, and reusable workflow assets.",
};

export const proofGroups = [
  {
    label: "Document AI and extraction",
    summary: "Lease, loan, legal, and funding-package workflows where citations and review states matter.",
    items: allProjects.filter((project) => project.category === "AI Architecture"),
  },
  {
    label: "CRE operating workflows",
    summary: "Systems that remove manual handoffs from construction, property management, and recurring reporting.",
    items: allProjects.filter((project) => project.category !== "AI Architecture"),
  },
  {
    label: "Public case-study artifacts",
    summary: "Polished public exports that show the expected evidence standard for implementation work.",
    items: importedCaseStudyArtifacts,
  },
];
