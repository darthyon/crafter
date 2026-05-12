/**
 * Token contrast check helper.
 *
 * Run:
 *   node scripts/contrast-check.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

function loadColors() {
  const colorsPath = path.join(process.cwd(), 'src/styles/themes.ts');
  const src = fs.readFileSync(colorsPath, 'utf8');

  const pick = (key) => {
    const re = new RegExp(`${key}:\\s*'(#(?:[0-9a-fA-F]{6}))'`);
    const m = src.match(re);
    return m?.[1] ?? null;
  };

  const required = ['background', 'text', 'textSecondary', 'textTertiary', 'textPlaceholder'];
  const out = {};
  for (const k of required) {
    const v = pick(k);
    if (!v) throw new Error(`Could not find lightTheme.colors.${k} in src/styles/themes.ts`);
    out[k] = v;
  }
  return out;
}

function hexToRgb(hex) {
  const s = hex.replace('#', '');
  const n = parseInt(s, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function srgbToLin(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function luminance({ r, g, b }) {
  const rr = srgbToLin(r);
  const gg = srgbToLin(g);
  const bb = srgbToLin(b);
  return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
}

function contrastRatio(a, b) {
  const L1 = luminance(hexToRgb(a));
  const L2 = luminance(hexToRgb(b));
  const hi = Math.max(L1, L2);
  const lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

const colors = loadColors();
const bg = colors.background;

const targets = [
  ['text', colors.text],
  ['textSecondary', colors.textSecondary],
  ['textTertiary', colors.textTertiary],
  ['textPlaceholder', colors.textPlaceholder],
];

// eslint-disable-next-line no-console
console.log(`Background: ${bg}`);
for (const [name, value] of targets) {
  const ratio = contrastRatio(value, bg);
  // eslint-disable-next-line no-console
  console.log(`${name}\t${value}\t${ratio.toFixed(2)}:1`);
}
