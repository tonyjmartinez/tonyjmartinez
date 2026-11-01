// Computes WCAG contrast ratios straight from src/styles/tokens.css.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');

function decls(selectorRe) {
  const m = css.match(new RegExp(selectorRe.source + String.raw`\s*\{([^}]*)\}`));
  assert.ok(m, `block ${selectorRe}`);
  const out = {};
  for (const [, k, v] of m[1].matchAll(/(--[\w-]+):\s*([^;]+);/g)) out[k] = v.trim();
  return out;
}

const dark = decls(/:root(?![\w:\[-])/);
const lightExplicit = decls(/:root\[data-theme='light'\]/);
const lightMedia = decls(/:root:not\(\[data-theme='dark'\]\)/);
const light = { ...dark, ...lightExplicit };

function resolve(theme, name) {
  let v = theme[name];
  const ref = v?.match(/^var\((--[\w-]+)\)$/);
  return ref ? resolve(theme, ref[1]) : v;
}
function lum(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    .map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    })
    .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0);
}
function ratio(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

const pairs = [
  ['--text', '--paper', 7],
  ['--text', '--surface', 7],
  ['--text-muted', '--paper', 4.5],
  ['--text-muted', '--surface', 4.5],
  ['--text-muted', '--surface-2', 4.5],
  ['--on-accent', '--accent', 4.5],
  ['--accent', '--paper', 4.5],
  ['--accent', '--surface', 4.5],
  ['--text', '--accent-soft', 4.5],
  ['--focus-ring', '--paper', 3],
  ['--focus', '--paper', 3],
];

for (const [name, theme] of [['dark', dark], ['light', light]]) {
  test(`${name} theme: token pairs meet WCAG AA`, () => {
    for (const [fg, bg, min] of pairs) {
      const r = ratio(resolve(theme, fg), resolve(theme, bg));
      assert.ok(r >= min, `${name} ${fg} on ${bg} is ${r.toFixed(2)}:1, needs ${min}:1`);
    }
  });
}

test('prefers-color-scheme: light block mirrors the explicit light theme', () => {
  for (const [k, v] of Object.entries(lightMedia)) {
    if (k === 'color-scheme') continue;
    assert.equal(v, lightExplicit[k], k);
  }
  for (const k of Object.keys(lightExplicit)) assert.ok(k in lightMedia, k);
});
