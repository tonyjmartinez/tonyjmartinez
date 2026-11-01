// Captures each live project at 1280x800 and writes optimised WebP to src/assets/work/<slug>.webp.
// Usage: CHROMIUM=<browser-path> node scripts/capture-screenshots.mjs [slug ...]
// Sites that do not answer 200 are skipped (existing image is kept). Uses playwright + sharp (sharp ships with Astro).
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const projects = {
  'tonezone-survivor': 'https://tonezone-survivor.ajosephmartinez.workers.dev/',
  'agent-vs-agent': 'https://agent-vs-agent.ajosephmartinez.workers.dev/',
  'succulents-info': 'https://succulents-info.ajosephmartinez.workers.dev/',
  'phaser-game': 'https://phaser-game.ajosephmartinez.workers.dev/',
};

const outDir = fileURLToPath(new URL('../src/assets/work/', import.meta.url));
const only = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
await mkdir(outDir, { recursive: true });
let failed = 0;
for (const [slug, url] of Object.entries(projects)) {
  if (only.length && !only.includes(slug)) continue;
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, colorScheme: 'dark', reducedMotion: 'reduce' });
  try {
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    if (!res || res.status() !== 200) throw new Error(`HTTP ${res?.status()}`);
    await page.waitForTimeout(1500);
    const png = await page.screenshot({ type: 'png' });
    const webp = await sharp(png).webp({ quality: 72, effort: 6 }).toBuffer();
    await writeFile(`${outDir}${slug}.webp`, webp);
    console.log(`${slug}: ${(webp.length / 1024).toFixed(0)}KB`);
  } catch (e) {
    failed++;
    console.error(`${slug}: skipped (${e.message})`);
  } finally {
    await page.close();
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
