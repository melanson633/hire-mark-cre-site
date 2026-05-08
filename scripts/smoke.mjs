import { chromium } from "playwright";
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
  await page.route("**/api/launch-pack-request", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });
  installPageObservers(page, errors);

  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await page.waitForSelector(".teaser-page");
  const teaserHeading = await page.locator(".teaser-hero h1").first().textContent();
  assert(Boolean(teaserHeading?.trim()), "Teaser route did not render a heading.");
  await page.waitForSelector('#launch-pack input[type="email"]');
  const launchPackMailtoLinks = await page
    .locator('a[href^="mailto:"][href*="launch%20pack"], a[href^="mailto:"][href*="launch pack"]')
    .count();
  assert(launchPackMailtoLinks === 0, "Teaser launch pack still renders a mailto fallback.");

  await page.goto(`${BASE_URL}/home`, { waitUntil: "networkidle" });
  await page.waitForSelector(".audit-hero");
  const auditCta = await page.locator('a[href^="mailto:"][href*="CRE%20AI%20Audit"]').count();
  assert(auditCta > 0, "Audit page does not render a mailto audit CTA.");

  await page.goto(`${BASE_URL}/proof`, { waitUntil: "networkidle" });
  await page.waitForSelector(".proof-stack .proof-card");
  const proofCards = await page.locator(".proof-card").count();
  assert(proofCards > 0, "Proof page rendered zero proof cards.");

  await page.goto(`${BASE_URL}/library`, { waitUntil: "networkidle" });
  await page.waitForSelector(".resource-card");
  await page.fill('.resource-card input[type="email"]', "test@example.com");
  await page.click(".resource-card button");
  await page.waitForSelector(".resource-unlocked");
  const unlocked = await page.locator(".resource-unlocked").count();
  assert(unlocked > 0, "Library email capture did not unlock resources in local preview.");

  await page.goto(`${BASE_URL}/about`, { waitUntil: "networkidle" });
  await page.waitForSelector('a[href^="mailto:"]');
  await page.waitForSelector('a[href^="https://www.linkedin.com/"]');

  await page.goto(`${BASE_URL}/tools`, { waitUntil: "networkidle" });
  await page.waitForSelector(".dscr-calculator");
  await page.waitForSelector(".tool-workspace");

  for (const deprecatedRoute of ["/projects", "/projects/example", "/prompts", "/newsletter"]) {
    await page.goto(`${BASE_URL}${deprecatedRoute}`, { waitUntil: "networkidle" });
    const path = new URL(page.url()).pathname;
    assert(
      ["/proof", "/library"].includes(path),
      `Deprecated route did not redirect: ${deprecatedRoute} -> ${path}`,
    );
  }

  await page.goto(`${BASE_URL}/route-that-does-not-exist`, { waitUntil: "networkidle" });
  await page.waitForSelector("#not-found");

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobile.newPage();
  installPageObservers(mobilePage, errors);
  await mobilePage.goto(`${BASE_URL}/home`, { waitUntil: "networkidle" });
  await mobilePage.waitForSelector(".audit-hero");
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

  console.log("Smoke checks passed for teaser root, audit routes, soft gate, redirects, 404, and mobile viewport.");
}

await runSmokeChecks();
