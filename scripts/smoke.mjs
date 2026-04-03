import { chromium } from "playwright";
import { allProjects } from "../src/content/projects/index.js";

const BASE_URL = process.env.SMOKE_BASE_URL || "http://127.0.0.1:4173";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function installPageObservers(page, errors) {
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(`Console error: ${msg.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    errors.push(`Page error: ${error.message}`);
  });
  page.on("response", (response) => {
    const status = response.status();
    const url = response.url();
    if (url.startsWith(BASE_URL) && status >= 400) {
      errors.push(`HTTP ${status}: ${url}`);
    }
  });
}

async function runSmokeChecks() {
  const browser = await chromium.launch();
  const errors = [];
  const context = await browser.newContext();
  const page = await context.newPage();
  installPageObservers(page, errors);

  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await page.waitForSelector(".teaser-page");
  const teaserHeading = await page.locator(".teaser-hero h1").first().textContent();
  assert(Boolean(teaserHeading?.trim()), "Teaser route did not render a heading.");

  await page.goto(`${BASE_URL}/home`, { waitUntil: "networkidle" });
  await page.waitForSelector("#contact");

  await page.click('a[href="/projects"]');
  await page.waitForURL(`${BASE_URL}/projects`);
  await page.waitForSelector(".projects-grid .work-card");
  const projectCards = await page.locator(".projects-grid .work-card").count();
  assert(projectCards > 0, "Projects page rendered zero project cards.");

  const downloadLinks = await page.locator('a[href^="/downloads/"]').all();
  assert(downloadLinks.length > 0, "Templates section rendered no download links.");
  for (const link of downloadLinks) {
    const href = await link.getAttribute("href");
    assert(Boolean(href), "Template download link is missing href.");
    const response = await page.request.get(`${BASE_URL}${href}`);
    assert(response.ok(), `Download link failed: ${href}`);
  }

  await page.goto(`${BASE_URL}/projects/${allProjects[0].slug}`, { waitUntil: "networkidle" });
  const detailHeading = await page.locator("main h2").first().textContent();
  assert(Boolean(detailHeading?.trim()), "Project detail route did not render.");

  await page.goto(`${BASE_URL}/prompts`, { waitUntil: "networkidle" });
  const promptCards = await page.locator(".prompt-card").count();
  assert(promptCards > 0, "Prompts page rendered zero prompts.");

  await page.goto(`${BASE_URL}/about`, { waitUntil: "networkidle" });
  await page.waitForSelector('a[href^="mailto:"]');
  await page.waitForSelector('a[href^="https://www.linkedin.com/"]');

  await page.goto(`${BASE_URL}/newsletter`, { waitUntil: "networkidle" });
  const inertText = await page.locator(".signup-inert").textContent();
  assert(
    inertText?.toLowerCase().includes("not live yet"),
    "Newsletter page does not clearly communicate inert status.",
  );

  await page.goto(`${BASE_URL}/tools`, { waitUntil: "networkidle" });
  await page.waitForSelector(".dscr-calculator");

  await page.goto(`${BASE_URL}/route-that-does-not-exist`, { waitUntil: "networkidle" });
  await page.waitForSelector("#not-found");

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobile.newPage();
  installPageObservers(mobilePage, errors);
  await mobilePage.goto(`${BASE_URL}/home`, { waitUntil: "networkidle" });
  await mobilePage.waitForSelector(".hero");
  const overflow = await mobilePage.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  assert(overflow <= 1, `Mobile layout overflow detected: ${overflow}px.`);
  await mobile.close();

  await context.close();
  await browser.close();

  if (errors.length > 0) {
    throw new Error(`Smoke checks found runtime failures:\n- ${errors.join("\n- ")}`);
  }

  console.log("Smoke checks passed for routes, downloads, links, 404, and mobile viewport.");
}

await runSmokeChecks();
