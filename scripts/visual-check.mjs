#!/usr/bin/env node
// Screenshot the built site (dist/) at several viewport widths and report
// horizontal overflow. Serves dist/ in-process, so no background preview server
// is needed and nothing is left running afterwards.
//
// Usage: node scripts/visual-check.mjs [--widths 375,1280] [--out /tmp/visual]
// Playwright is resolved from PLAYWRIGHT_MODULE (absolute path to the package's
// index.mjs), else the pi-durable-browser cache. The browser is taken from
// CHROMIUM (falls back to Playwright's bundled browser when unset).
// Bare `import 'playwright'` does not honour NODE_PATH for ESM, so we import by path.
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const widths = opt('--widths', '375,1280').split(',').map(Number).filter(Boolean);
const outDir = resolve(opt('--out', '/tmp/visual-check'));

const playwrightPath =
  process.env.PLAYWRIGHT_MODULE ||
  '/home/tonyjmartinez/.cache/pi-durable-browser/node_modules/playwright/index.mjs';
if (!existsSync(playwrightPath)) {
  console.error(`Playwright not found at ${playwrightPath}. Set PLAYWRIGHT_MODULE.`);
  process.exit(2);
}
const { chromium } = await import(pathToFileURL(playwrightPath).href);

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.xml': 'application/xml',
  '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  try {
    let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
    let file = join(root, p);
    if (!file.startsWith(root)) throw new Error('outside root');
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
  }
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const base = `http://127.0.0.1:${server.address().port}/`;

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
let failed = false;
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(base, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    const file = join(outDir, `index-${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`${width}px  overflowPx=${overflow}  screenshot=${file}`);
    if (overflow > 0) failed = true;
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
if (failed) {
  console.error('Horizontal overflow detected.');
  process.exit(1);
}
