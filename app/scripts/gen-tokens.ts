/**
 * Codegen. Highlights every code example at BUILD time, so a first visit does not have to.
 *
 * ── Why this exists ──────────────────────────────────────────────────────
 * Measured 2026-09-22 (phone on slow 4G, 4x CPU): on a cold visit the code panel waited for
 * Shiki's core, its JavaScript regex engine, the language's grammar and the theme (about
 * 270 kB of script, 60-70 kB gzipped), and then tokenizing the example cost two main-thread
 * tasks of 120-175 ms. The examples are static data, so the result is the same every time.
 *
 * This runs the exact same Shiki (same core, same JS regex engine, same grammar and theme
 * packages the browser would load) over every minimal and verbose example and writes one
 * small JSON per grammar to src/data/tokens.generated/ (gitignored, rebuilt by `bun run
 * build`). src/lib/prebuilt-tokens.ts loads it. Anything not found there (a new example in
 * `bun run dev` before a rebuild, the light-theme easter egg, the dialog's code chips)
 * still goes through live Shiki exactly as before.
 *
 * Format: { colors: string[], examples: { [fnv1a(code)]: [[text, colorIndex], ...][] } }
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import { buildAnatomy } from '../src/lib/anatomy'
import { fnv1a } from '../src/lib/code-hash'
import { CODE_THEME } from '../src/lib/highlighter'
import type { ExampleVariant, LanguageDef } from '../src/lib/types'

const DATA_DIR = join(import.meta.dir, '..', 'src', 'data')
const OUT = join(DATA_DIR, 'tokens.generated')
const SKIP = new Set(['index.ts', 'comingSoon.ts', 'catalog.generated.ts'])
// Grammar ids whose @shikijs/langs module name differs from the id.
const LANG_MODULE: Record<string, string> = {}

const defs: LanguageDef[] = []
for (const file of readdirSync(DATA_DIR).filter((f) => f.endsWith('.ts') && !SKIP.has(f))) {
  const mod = (await import(pathToFileURL(join(DATA_DIR, file)).href)) as Record<string, unknown>
  for (const v of Object.values(mod)) {
    if (v && typeof v === 'object' && 'id' in v && 'annotations' in v) defs.push(v as LanguageDef)
  }
}

const highlighter = await createHighlighterCore({
  themes: [import(`@shikijs/themes/${CODE_THEME}`)],
  langs: [],
  engine: createJavaScriptRegexEngine(),
})

type Out = { colors: string[]; examples: Record<string, [string, number][][]> }
const byLang = new Map<string, Out>()

for (const def of defs.sort((a, b) => a.id.localeCompare(b.id))) {
  if (def.category === 'concept' || !def.examples) continue
  const lang = def.shikiLang
  if (!highlighter.getLoadedLanguages().includes(lang)) {
    const mod = await import(`@shikijs/langs/${LANG_MODULE[lang] ?? lang}`)
    await highlighter.loadLanguage(mod.default)
  }
  const out = byLang.get(lang) ?? { colors: [], examples: {} }
  byLang.set(lang, out)
  for (const variant of Object.keys(def.examples) as ExampleVariant[]) {
    const { code } = buildAnatomy(def, variant)
    const { tokens } = highlighter.codeToTokens(code, { lang, theme: CODE_THEME })
    out.examples[fnv1a(code)] = tokens.map((line) =>
      line.map((t) => {
        const color = t.color ?? ''
        let i = out.colors.indexOf(color)
        if (i < 0) i = out.colors.push(color) - 1
        return [t.content, i] as [string, number]
      }),
    )
  }
}

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
let bytes = 0
for (const [lang, out] of byLang) {
  const json = JSON.stringify(out)
  bytes += json.length
  writeFileSync(join(OUT, `${lang}.json`), json)
}
console.log(
  `gen-tokens: ${byLang.size} grammars, ${[...byLang.values()].reduce((n, o) => n + Object.keys(o.examples).length, 0)} examples, ${Math.round(bytes / 1024)} kB`,
)
