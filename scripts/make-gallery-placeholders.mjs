import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

/**
 * Generates the placeholder tiles the gallery shows in an empty album.
 *
 * `/documentation` ships with zero real photos, per prd.md §5.5 — that stays
 * true here: these are never written into `ITEMS` in src/content/gallery.ts,
 * so `ITEMS.length === 0` still holds and the real "nothing here yet" message
 * still renders. What changes is that an empty album ALSO shows a preview
 * grid built from these, so the page has the visual weight of a real gallery
 * rather than one line of grey text repeated six times.
 *
 * The moment a real photo is added to `ITEMS` for an album, the preview grid
 * for that album disappears on its own — the album page only shows one or the
 * other, never both.
 *
 * In the coral (Jalur Pribadi) line, since that is documentation's line.
 * Varied aspect ratios on purpose, so the masonry grid actually looks like a
 * photo grid rather than a row of identical cards.
 *
 *   pnpm placeholders:gallery
 */

const PLATFORM_2 = "#26313F";
const RULE = "#3A4656";
const INK = "#F3F5F7";
const INK_2 = "#A9B4C0";
const LINE_LIFE = "#FF8A5C";

const SHAPES = [
  ["a", 1200, 1500], // portrait
  ["b", 1600, 1000], // landscape
  ["c", 1400, 1400], // square
  ["d", 1600, 900], // wide
  ["e", 1100, 1400], // portrait, taller
  ["f", 1500, 1050], // landscape, wider
];

function svg(w, h, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <pattern id="hatch" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="26" stroke="${RULE}" stroke-width="5" opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="${PLATFORM_2}"/>
  <rect width="${w}" height="${h}" fill="url(#hatch)"/>
  <rect x="0" y="0" width="${w}" height="10" fill="${LINE_LIFE}"/>
  <circle cx="${w / 2}" cy="${h / 2 - 20}" r="34" fill="none" stroke="${LINE_LIFE}" stroke-width="4"/>
  <path d="M ${w / 2 - 16} ${h / 2 - 30} L ${w / 2 + 16} ${h / 2 - 4} M ${w / 2 - 16} ${h / 2 - 4} L ${w / 2 + 16} ${h / 2 - 30}" stroke="${LINE_LIFE}" stroke-width="4" stroke-linecap="round" opacity="0"/>
  <rect x="${w / 2 - 42}" y="${h / 2 - 34}" width="84" height="68" rx="4" fill="none" stroke="${LINE_LIFE}" stroke-width="4"/>
  <circle cx="${w / 2}" cy="${h / 2}" r="14" fill="none" stroke="${LINE_LIFE}" stroke-width="4"/>
  <text x="${w / 2}" y="${h / 2 + 60}" text-anchor="middle" font-family="Archivo, Arial, sans-serif" font-size="${Math.round(w / 40)}" fill="${INK}" font-weight="700" letter-spacing="1">PLACEHOLDER</text>
  <text x="${w / 2}" y="${h / 2 + 92}" text-anchor="middle" font-family="Archivo, Arial, sans-serif" font-size="${Math.round(w / 60)}" fill="${INK_2}">${label}</text>
</svg>`;
}

const root = fileURLToPath(
  new URL("../public/images/documentation/", import.meta.url),
);

const manifest = [];

for (const [id, w, h] of SHAPES) {
  const file = join(root, `placeholder-${id}.png`);
  await mkdir(dirname(file), { recursive: true });
  await sharp(Buffer.from(svg(w, h, "drop a photo in here")))
    .png({ compressionLevel: 9, palette: true })
    .toFile(file);
  manifest.push({ id, width: w, height: h });
  console.log(`  ${file} (${w}x${h})`);
}

console.log(
  "\nManifest for src/content/gallery.ts:\n" +
    JSON.stringify(manifest, null, 2),
);
