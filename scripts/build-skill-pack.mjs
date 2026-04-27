#!/usr/bin/env node
/**
 * build-skill-pack.mjs
 *
 * Zips the source under scripts/skill-pack-src/cowork-metaprompt/ into
 * public/downloads/cowork-metaprompt.zip so the landing page's "Get the
 * free pack" CTA can serve it.
 *
 * Runs automatically as a `prebuild` step (so Vercel deploys pick up
 * fresh source on each build). Run manually after editing source via:
 *
 *   npm run build:skill-pack
 *
 * The zip is treated as a build artifact (gitignored). The canonical
 * source of truth is scripts/skill-pack-src/cowork-metaprompt/.
 */

import AdmZip from "adm-zip";
import { mkdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");

const sourceDir = resolve(repoRoot, "scripts/skill-pack-src/cowork-metaprompt");
const outDir = resolve(repoRoot, "public/downloads");
const outFile = resolve(outDir, "cowork-metaprompt.zip");

function ensureSourceExists() {
  try {
    const s = statSync(sourceDir);
    if (!s.isDirectory()) {
      throw new Error(`${sourceDir} is not a directory`);
    }
  } catch (err) {
    console.error(
      `[build-skill-pack] Source directory missing: ${sourceDir}\n` +
        `Restore it from git or re-vendor from offerings/cowork-metaprompt.`,
    );
    throw err;
  }
}

function buildZip() {
  ensureSourceExists();
  mkdirSync(outDir, { recursive: true });

  const zip = new AdmZip();
  // Place the bundle inside a top-level cowork-metaprompt/ folder so
  // unzipping produces a clean drop-in skill folder.
  zip.addLocalFolder(sourceDir, "cowork-metaprompt");
  zip.writeZip(outFile);

  const finalSize = statSync(outFile).size;
  const kb = (finalSize / 1024).toFixed(1);
  console.log(`[build-skill-pack] Wrote ${outFile} (${kb} KB)`);
}

buildZip();
