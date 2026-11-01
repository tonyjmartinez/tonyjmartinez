#!/usr/bin/env node
// Screenshot the built site (dist/) at several viewport widths and report
// horizontal overflow. Serves dist/ in-process, so no background preview server
// is needed and nothing is left running afterwards.
//
// Usage: node scripts/visual-check.mjs [--widths 320,360,375,1280] [--out /tmp/visual]
// Requires the `playwright` package to be installed in the project (it is not a
// dependency yet; adding it is a package.json change for a maintainer). The browser
// executable is taken from CHROMIUM when set, otherwise Playwright's bundled browser.
// Exit codes: 0 ok, 1 horizontal overflow, 2 Playwright or dist/ missing.
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { extname, isAbsolute, join, normalize, relative, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const root = resolve(opt('--root', fileURLToPath(new URL('../dist/', import.meta.url))));
const widths = opt('--widths', '320,360,375,1280').split(',').map(Number).filter(Boolean);
const outDir = resolve(opt('--out', '/tmp/visual-check'));

if (!existsSync(join(root, 'index.html'))) {
  console.error(`No index.html in ${root}. Run "npm run build" first (or pass --root).`);
  process.exit(2);
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright is not installed. Add it as a dev dependency (npm i -D playwright) to use this script.');
  process.exit(2);
}

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.xml': 'application/xml',
  '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  try {
    const urlPath = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
    let file = join(root, urlPath);
    const rel = relative(root, file);
    if (rel.startsWith('..') || isAbsolute(rel)) {
      res.writeHead(403, { 'content-type': 'text/plain' });
      return res.end('forbidden');
    }
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch (err) {
    const missing = err.code === 'ENOENT' || err.code === 'ENOTDIR';
    if (!missing) console.error(`visual-check server error for ${req.url}:`, err);
    res.writeHead(missing ? 404 : 500, { 'content-type': 'text/plain' });
    res.end(missing ? 'not found' : 'server error');
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
