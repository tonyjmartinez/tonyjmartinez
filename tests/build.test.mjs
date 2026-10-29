// Smoke test for build output. Run after `npm run build`: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (p) => readFileSync(new URL(`../dist/${p}`, import.meta.url), 'utf8');

test('expected files exist', () => {
  for (const f of ['index.html', '404.html', 'robots.txt', 'sitemap.xml', '_headers', 'site.webmanifest']) {
    assert.ok(existsSync(new URL(`../dist/${f}`, import.meta.url)), f);
  }
});

test('home page has lang, title, description, one h1', () => {
  const html = read('index.html');
  assert.match(html, /<html[^>]*\blang="en"/);
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
});

test('404 page is noindex', () => {
  assert.match(read('404.html'), /<meta name="robots" content="[^"]*noindex/);
});

test('robots.txt references sitemap', () => {
  assert.match(read('robots.txt'), /^Sitemap:/m);
});
