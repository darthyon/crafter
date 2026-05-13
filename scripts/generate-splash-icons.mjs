import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const OUT_LIGHT = path.resolve('assets/images/splash-icon.png');
const OUT_DARK = path.resolve('assets/images/splash-icon-dark.png');

const FONT_PATH = path.resolve(
  'node_modules/@expo-google-fonts/cormorant-garamond/600SemiBold/CormorantGaramond_600SemiBold.ttf'
);

const SOURCE_SVG_PATH = path.resolve('ui screens and characters/crafter.svg');

const MIN_X = 76;
const MIN_Y = 75;
const VIEW_W = 249;
const VIEW_H = 270;

function readFontBase64() {
  const buf = fs.readFileSync(FONT_PATH);
  return buf.toString('base64');
}

function readPixelRects() {
  const txt = fs.readFileSync(SOURCE_SVG_PATH, 'utf8');
  const re = /<rect\s+([^>]+?)\s*\/>/g;
  const attrsRe = /([a-zA-Z:]+)="([^"]+)"/g;

  const rects = [];
  let m;
  while ((m = re.exec(txt))) {
    const attrs = {};
    let a;
    while ((a = attrsRe.exec(m[1]))) {
      attrs[a[1]] = a[2];
    }
    const x = Number(attrs.x);
    const y = Number(attrs.y);
    const w = Number(attrs.width);
    const h = Number(attrs.height);
    const fill = attrs.fill;
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(w) || !Number.isFinite(h) || !fill) continue;
    rects.push({ x: x - MIN_X, y: y - MIN_Y, w, h, fill });
  }

  return rects;
}

function buildSvg(opts) {
  const {
    primaryFill,
    secondaryFill,
    wordmarkFill,
  } = opts;

  const fontBase64 = readFontBase64();
  const rects = readPixelRects();

  const pixelRects = rects
    .map((r) => {
      const fill = r.fill === 'black' ? primaryFill : secondaryFill;
      return `<rect x=\"${r.x}\" y=\"${r.y}\" width=\"${r.w}\" height=\"${r.h}\" fill=\"${fill}\"/>`;
    })
    .join('');

  // Layout: center mascot + wordmark (transparent background).
  const canvas = 1024;
  const mascotTargetW = 520;
  const scale = mascotTargetW / VIEW_W;
  const mascotW = VIEW_W * scale;
  const mascotH = VIEW_H * scale;
  const mascotX = (canvas - mascotW) / 2;
  const mascotY = 170;
  const wordmarkY = Math.round(mascotY + mascotH + 140);

  return `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"${canvas}\" height=\"${canvas}\" viewBox=\"0 0 ${canvas} ${canvas}\" xmlns=\"http://www.w3.org/2000/svg\">\n  <defs>\n    <style>\n      @font-face {\n        font-family: 'Cormorant Garamond';\n        src: url('data:font/ttf;base64,${fontBase64}') format('truetype');\n        font-weight: 600;\n        font-style: normal;\n      }\n    </style>\n  </defs>\n  <g transform=\"translate(${mascotX} ${mascotY}) scale(${scale})\">\n    ${pixelRects}\n  </g>\n  <text x=\"512\" y=\"${wordmarkY}\" text-anchor=\"middle\" font-family=\"Cormorant Garamond\" font-weight=\"600\" font-size=\"140\" fill=\"${wordmarkFill}\">Crafter</text>\n</svg>\n`;
}

function renderToPng(svg) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1024 },
  });
  const rendered = resvg.render();
  return rendered.asPng();
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function main() {
  ensureDir(OUT_LIGHT);
  ensureDir(OUT_DARK);

  const lightSvg = buildSvg({
    primaryFill: '#111111',
    secondaryFill: '#DEDEDE',
    wordmarkFill: '#111111',
  });
  fs.writeFileSync(OUT_LIGHT, renderToPng(lightSvg));

  const darkSvg = buildSvg({
    primaryFill: '#ffffff',
    secondaryFill: '#bcbcbc',
    wordmarkFill: '#ffffff',
  });
  fs.writeFileSync(OUT_DARK, renderToPng(darkSvg));

  // eslint-disable-next-line no-console
  console.log(`Wrote ${OUT_LIGHT}`);
  // eslint-disable-next-line no-console
  console.log(`Wrote ${OUT_DARK}`);
}

main();
