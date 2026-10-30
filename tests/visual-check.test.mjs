import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../scripts/visual-check.mjs', import.meta.url));
const run = (args, env = {}) =>
  spawnSync(process.execPath, [script, ...args], { encoding: 'utf8', env: { ...process.env, ...env }, timeout: 120000 });

test('exits 2 with a clear message when dist/ has no index.html', () => {
  const r = run(['--root', join(tmpdir(), 'no-such-dist-' + Date.now())]);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /npm run build/);
});

// Overflow detection needs a real browser. Run only when Playwright and a browser are configured.
async function playwrightAvailable() {
  try {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch();
    await browser.close();
    return true;
  } catch {
    return false;
  }
}
const canBrowse = await playwrightAvailable();
test('exits 1 when a page overflows horizontally', { skip: !canBrowse && 'no launchable Playwright browser (run npx playwright install chromium)' }, () => {
  const root = mkdtempSync(join(tmpdir(), 'vc-fixture-'));
  mkdirSync(root, { recursive: true });
  writeFileSync(join(root, 'index.html'), '<!doctype html><title>x</title><div style="width:2000px">wide</div>');
  const r = run(['--root', root, '--widths', '375', '--out', join(root, 'shots')]);
  assert.equal(r.status, 1, r.stderr);
  assert.match(r.stdout, /overflowPx=[1-9]/);
});
