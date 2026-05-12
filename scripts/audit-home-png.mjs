import fs from 'node:fs';
import { PNG } from 'pngjs';

/**
 * Crafter UI audit helper.
 *
 * Samples median/percentile colors from regions in `ui screens and characters/home.png`
 * to help tune `src/styles/colors.ts` and typography roles to match the reference.
 *
 * Run:
 *   node scripts/audit-home-png.mjs
 */

const IMAGE_PATH = 'ui screens and characters/home.png';

// Regions are [name, x0, y0, x1, y1] in image pixel coordinates.
// Coordinates are intentionally approximate; sampling is robust because we:
// - ignore near-white background
// - take a dark-percentile (p20) in addition to the median
const REGIONS = [
  ['brand_title', 150, 60, 420, 140],
  ['folders_row_text', 160, 185, 330, 245],
  ['search_placeholder', 160, 300, 700, 380],
  ['quick_label', 80, 485, 220, 545],
  ['quick_unsaved', 220, 485, 360, 545],
  ['quick_placeholder', 90, 615, 700, 710],
  ['pinned_label', 80, 1190, 220, 1250],
  ['view_all', 690, 1190, 880, 1250],
  ['card1_title', 85, 1370, 320, 1460],
  ['card1_subtitle', 85, 1460, 320, 1510],
  ['card1_body', 85, 1510, 320, 1650],
];

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function toHex(r, g, b) {
  const hex = (n) => n.toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function percentile(sorted, p) {
  if (sorted.length === 0) return null;
  const idx = Math.max(0, Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p)));
  return sorted[idx];
}

function median(sorted) {
  return percentile(sorted, 0.5);
}

function summarize(samples) {
  const rs = samples.map((s) => s.r).sort((a, b) => a - b);
  const gs = samples.map((s) => s.g).sort((a, b) => a - b);
  const bs = samples.map((s) => s.b).sort((a, b) => a - b);

  const med = {
    r: median(rs),
    g: median(gs),
    b: median(bs),
  };

  const p20 = {
    r: percentile(rs, 0.2),
    g: percentile(gs, 0.2),
    b: percentile(bs, 0.2),
  };

  return {
    n: samples.length,
    median: toHex(med.r, med.g, med.b),
    p20: toHex(p20.r, p20.g, p20.b),
  };
}

function sampleRegion(png, x0, y0, x1, y1) {
  const samples = [];
  const w = png.width;
  const h = png.height;

  const xx0 = Math.max(0, Math.floor(x0));
  const yy0 = Math.max(0, Math.floor(y0));
  const xx1 = Math.min(w, Math.floor(x1));
  const yy1 = Math.min(h, Math.floor(y1));

  for (let y = yy0; y < yy1; y++) {
    for (let x = xx0; x < xx1; x++) {
      const i = (w * y + x) * 4;
      const r = png.data[i];
      const g = png.data[i + 1];
      const b = png.data[i + 2];
      const a = png.data[i + 3];
      if (a < 200) continue;

      const lum = luminance(r, g, b);
      // Ignore near-white background pixels.
      if (lum > 245) continue;

      samples.push({ r, g, b, lum });
    }
  }
  if (samples.length === 0) return null;
  return summarize(samples);
}

fs.createReadStream(IMAGE_PATH)
  .pipe(new PNG())
  .on('parsed', function onParsed() {
    // eslint-disable-next-line no-console
    console.log(`Image: ${IMAGE_PATH} (${this.width}x${this.height})`);
    // eslint-disable-next-line no-console
    console.log('region\tmedian\tp20\tn');
    for (const [name, x0, y0, x1, y1] of REGIONS) {
      const res = sampleRegion(this, x0, y0, x1, y1);
      if (!res) {
        // eslint-disable-next-line no-console
        console.log(`${name}\t(none)\t(none)\t0`);
        continue;
      }
      // eslint-disable-next-line no-console
      console.log(`${name}\t${res.median}\t${res.p20}\t${res.n}`);
    }
  });

