import { allPrompts } from "./prompts";
import { allTemplates } from "./templates";
import { researchArtifacts } from "./research/artifacts";

const templateResources = allTemplates.map((template) => ({
  id: `template-${template.slug}`,
  title: template.title,
  category: "Template",
  auditRelevance: template.category,
  preview: template.description,
  unlocked:
    "Use this as a starting point for audit conversations about where spreadsheet controls, checks, or reporting outputs are missing.",
  href: `/downloads/${template.filename}`,
  access: "email",
}));

const promptResources = allPrompts.slice(0, 5).map((prompt) => ({
  id: `prompt-${prompt.id}`,
  title: prompt.title,
  category: "Prompt",
  auditRelevance: prompt.category,
  preview: prompt.purpose,
  unlocked:
    "Unlocked prompt access is intended for evaluation and adaptation inside your own review workflow.",
  access: "email",
}));

const researchResources = researchArtifacts.slice(0, 2).map((artifact) => ({
  id: `research-${artifact.slug}`,
  title: artifact.title,
  category: "Research",
  auditRelevance: artifact.type,
  preview: artifact.summary,
  unlocked:
    "Research notes are useful for framing market context around reporting, construction, and operating decisions.",
  href: artifact.artifacts?.[0]?.href,
  access: "email",
}));

export const resourcePage = {
  eyebrow: "Library",
  title: "Soft-gated CRE AI resources.",
  intro:
    "Public previews stay open. Join with email to unlock selected templates, prompts, and research assets.",
  note:
    "This is resource access and lead capture, not secure private storage or paid membership.",
};

export const resourceCategories = ["All", "Template", "Prompt", "Research"];

export const resources = [
  {
    id: "audit-checklist",
    title: "CRE AI Audit Readiness Checklist",
    category: "Template",
    auditRelevance: "Audit intake",
    preview:
      "A short diagnostic for identifying whether a workflow is ready for AI assistance, template repair, or no automation.",
    unlocked:
      "Use the checklist to capture workflow owner, current inputs, failure rate, manual hours, review risk, and what a better output should look like.",
    access: "email",
  },
  ...templateResources,
  ...promptResources,
  ...researchResources,
];
