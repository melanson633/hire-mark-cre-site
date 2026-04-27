import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function fail(message) {
  throw new Error(message);
}

function assertUnique(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (!value) fail(`${label} contains an empty value.`);
    if (seen.has(value)) fail(`${label} contains a duplicate value: ${value}`);
    seen.add(value);
  }
}

function validateDownloads(allTemplates) {
  for (const template of allTemplates) {
    const fullPath = path.join(repoRoot, "public", "downloads", template.filename);
    if (!fs.existsSync(fullPath)) {
      fail(`Missing download file: public/downloads/${template.filename}`);
    }
  }
}

function validateNewsletterContract(newsletterContent) {
  if (newsletterContent.mode !== "real" && newsletterContent.mode !== "inert") {
    fail("newsletterContent.mode must be 'real' or 'inert'.");
  }
  if (newsletterContent.mode === "inert") {
    if (!newsletterContent.inertTitle || !newsletterContent.inertBody) {
      fail("Inert newsletter mode requires inertTitle and inertBody.");
    }
  }
}

function validateContactLinks(siteMeta) {
  if (!siteMeta.contact?.email) fail("siteMeta.contact.email is required.");
  if (!siteMeta.contact?.linkedin?.startsWith("https://")) {
    fail("siteMeta.contact.linkedin must be an https URL.");
  }
}

const vite = await createServer({
  appType: "custom",
  logLevel: "error",
  optimizeDeps: {
    entries: [],
    noDiscovery: true,
  },
  server: { middlewareMode: true },
});

try {
  const [
    { allProjects },
    { allPrompts },
    { allTemplates },
    { newsletterContent },
    { siteMeta },
  ] = await Promise.all([
    vite.ssrLoadModule("/src/content/projects/index.js"),
    vite.ssrLoadModule("/src/content/prompts/index.js"),
    vite.ssrLoadModule("/src/content/templates/index.js"),
    vite.ssrLoadModule("/src/content/newsletter.js"),
    vite.ssrLoadModule("/src/content/siteMeta.js"),
  ]);

  assertUnique(allProjects.map((project) => project.slug), "Project slugs");
  assertUnique(allPrompts.map((prompt) => prompt.id), "Prompt IDs");
  assertUnique(allTemplates.map((template) => template.slug), "Template slugs");
  assertUnique(allTemplates.map((template) => template.filename), "Template filenames");
  validateDownloads(allTemplates);
  validateNewsletterContract(newsletterContent);
  validateContactLinks(siteMeta);

  console.log(
    `Content validation passed: ${allProjects.length} projects, ${allPrompts.length} prompts, ${allTemplates.length} templates.`,
  );
} finally {
  await vite.close();
}
