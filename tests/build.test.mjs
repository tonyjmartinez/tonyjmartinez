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

test('canonical, og:url, sitemap and robots use tonyjmartinez.com', () => {
  const html = read('index.html');
  assert.match(html, /<link rel="canonical" href="https:\/\/tonyjmartinez\.com\//);
  assert.match(html, /<meta property="og:url" content="https:\/\/tonyjmartinez\.com\//);
  assert.match(read('sitemap.xml'), /https:\/\/tonyjmartinez\.com\//);
  assert.match(read('robots.txt'), /^Sitemap: https:\/\/tonyjmartinez\.com\//m);
});

test('no stale .dev domain in built output', () => {
  for (const f of ['index.html', '404.html', 'sitemap.xml', 'robots.txt']) {
    assert.doesNotMatch(read(f), /tonyjmartinez\.dev/, f);
  }
});

test('JSON-LD on home page is valid JSON', () => {
  const m = read('index.html').match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(m, 'JSON-LD block present');
  assert.equal(JSON.parse(m[1])['@type'], 'Person');
});

test('in-page #fragment links point at existing ids', () => {
  for (const f of ['index.html', '404.html']) {
    const html = read(f);
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
      assert.match(html, new RegExp(`id="${id}"`), `${f}: #${id}`);
    }
  }
});

test('every link has an accessible name', () => {
  const html = read('index.html');
  for (const [, attrs, inner] of html.matchAll(/<a\s([^>]*)>([\s\S]*?)<\/a>/g)) {
    const text = inner.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '').trim();
    assert.ok(text || /aria-label="[^"]+"/.test(attrs), `unnamed link: ${attrs}`);
  }
});

test('external target=_blank links use rel noopener', () => {
  const html = read('index.html');
  for (const [tag] of html.matchAll(/<a\s[^>]*target="_blank"[^>]*>/g)) {
    assert.match(tag, /rel="[^"]*noopener/, tag);
  }
});

test('Selected work section links to public workers.dev deployments only', () => {
  const html = read('index.html');
  assert.match(html, /<section id="work"[^>]*aria-labelledby="work-title"/);
  for (const u of ['succulents-info', 'tonezone-survivor', 'phaser-game']) {
    assert.match(html, new RegExp(`href="https://${u}\\.ajosephmartinez\\.workers\\.dev/"`));
  }
  assert.doesNotMatch(html, /github\.com\/tonyjmartinez\/phaser-game/);
  assert.match(html, /href="https:\/\/github\.com\/tonyjmartinez\/tonezone-survivor"[^>]*>Source code on GitHub/);
  assert.doesNotMatch(html, /agent-vs-agent/);
});
