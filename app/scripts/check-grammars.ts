import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Build guard: every `shikiLang` used by a language in src/data/ must have a
 * matching `import('@shikijs/langs/<id>')` in src/lib/highlighter.ts,
 * otherwise that language's code panel fails to highlight at runtime.
 *
 * `shikiLang` must be the canonical grammar id (e.g. 'bat', not the 'batch'
 * alias); this check matches ids exactly.
 */
const appRoot = fileURLToPath(new URL('..', import.meta.url))
const highlighterPath = join(appRoot, 'src', 'lib', 'highlighter.ts')
const dataDir = join(appRoot, 'src', 'data')

const highlighterSrc = readFileSync(highlighterPath, 'utf8')
const imported = new Set(
  [...highlighterSrc.matchAll(/@shikijs\/langs\/([\w-]+)/g)].map((m) => m[1]),
)

const usedBy = new Map<string, string[]>()
for (const file of readdirSync(dataDir).filter((f) => f.endsWith('.ts'))) {
  const src = readFileSync(join(dataDir, file), 'utf8')
  for (const match of src.matchAll(/shikiLang:\s*['"]([^'"]+)['"]/g)) {
    usedBy.set(match[1], [...(usedBy.get(match[1]) ?? []), file])
  }
}

const missing = [...usedBy].filter(([lang]) => !imported.has(lang))
if (missing.length > 0) {
  console.error('✗ Shiki grammars missing from src/lib/highlighter.ts:')
  for (const [lang, files] of missing) {
    console.error(
      `    '${lang}' (shikiLang of ${files.map((f) => `src/data/${f}`).join(', ')}): add import('@shikijs/langs/${lang}') to the langs array`,
    )
  }
  process.exit(1)
}

const unused = [...imported].filter((lang) => !usedBy.has(lang))
if (unused.length > 0) {
  console.log(`  note: grammars imported but unused by src/data: ${unused.join(', ')}`)
}
console.log(`✓ all ${usedBy.size} shikiLang grammar(s) are imported in highlighter.ts`)
