/**
 * Regenerate the branded assets from the logo mark. Run from `app/`:
 *   bun run scripts/gen-brand.ts
 *
 * Source of truth is `public/logo.svg` (the { brace + ribcage mark). This emits:
 *   - src/components/BrandMark.vue  inline, currentColor (theme-adaptive) in-app mark
 *   - public/favicon.svg            dark rounded tile + light logo
 *   - public/og-image.svg           social card with the logo swapped into the tile
 *
 * After running, rebuild the raster share card + apple-touch icon with ImageMagick:
 *   magick -density 96 public/og-image.svg public/og-image.png
 *   magick public/favicon.svg -background '#0f172a' -flatten -resize 180x180 -strip -depth 8 \
 *     -dither none -colors 64 PNG8:public/apple-touch-icon.png
 *
 * The icon flags are not optional. Left off, ImageMagick writes 16-bit RGBA and
 * the flat two-color mark lands at ~85 kB instead of ~7 kB.
 */
import { readFileSync, writeFileSync } from 'node:fs'

// Logo intrinsic viewBox.
const VB_W = 1098.5
const VB_H = 1084.6

const logo = readFileSync('public/logo.svg', 'utf8')
const paths = [...logo.matchAll(/<path\s+d="([^"]+)"/g)].map((m) => m[1])
if (paths.length !== 2) throw new Error(`expected 2 paths in logo.svg, got ${paths.length}`)

/** Fit the (slightly wider-than-tall) logo into a square box, centered vertically. */
function fit(box: number, pad: number) {
  const inner = box - pad * 2
  const scale = inner / VB_W // width-limited
  const drawH = VB_H * scale
  return { scale: +scale.toFixed(6), x: pad, y: +(pad + (inner - drawH) / 2).toFixed(2) }
}

// --- BrandMark.vue: fills with currentColor so callers theme it via text-* ---
const mark = paths.map((d) => `    <path d="${d}" />`).join('\n')
writeFileSync(
  'src/components/BrandMark.vue',
  `<script setup lang="ts">
// The AnatomyOf logo mark ({ brace + ribcage). Monochrome: fills with
// currentColor, so callers set the color via a text-* class and it adapts to
// light/dark. Source of truth: public/logo.svg (regenerate via scripts/gen-brand).
</script>

<template>
  <svg
    viewBox="0 0 ${VB_W} ${VB_H}"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
${mark}
  </svg>
</template>
`,
)

// --- favicon.svg: dark rounded tile + light logo ---
const f = fit(64, 12)
writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="AnatomyOf">
  <rect width="64" height="64" rx="14" fill="#0f172a" />
  <g fill="#f8fafc" transform="translate(${f.x} ${f.y}) scale(${f.scale})">
${paths.map((d) => `    <path d="${d}" />`).join('\n')}
  </g>
</svg>
`,
)

// --- og-image.svg: swap the logo mark into the existing card's tile ---
const t = fit(120, 20)
const og = readFileSync('public/og-image.svg', 'utf8').replace(
  / {2}<!-- logo mark -->\n {2}<g transform="translate\(96 104\)">[\s\S]*?\n {2}<\/g>/,
  `  <!-- logo mark -->
  <g transform="translate(96 104)">
    <rect width="120" height="120" rx="26" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <g fill="#f8fafc" transform="translate(${t.x} ${t.y}) scale(${t.scale})">
${paths.map((d) => `      <path d="${d}" />`).join('\n')}
    </g>
  </g>`,
)
writeFileSync('public/og-image.svg', og)

console.log('Regenerated BrandMark.vue, favicon.svg, og-image.svg from public/logo.svg')
console.log('Now rebuild rasters: og-image.png + apple-touch-icon.png (see header comment).')
