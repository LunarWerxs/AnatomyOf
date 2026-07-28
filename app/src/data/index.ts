import type { LanguageDef, LanguageMeta } from '../lib/types'
import { catalog, loaders } from './catalog.generated'

// The sidebar + router only need lightweight metadata for EVERY language; each
// language's heavy annotations/examples load on demand via loadLanguage() below,
// so they stay out of the entry bundle. `catalog`/`loaders` are generated from the
// per-language data files by scripts/gen-catalog.ts (the single source of truth).

// Ranked ascending by popularity; unranked entries (concepts) fall to the end via
// the stable sort. Catalog order is not display order, see gen-catalog.ts.
export const languages: LanguageMeta[] = [...catalog].sort(
  (a, b) => (a.popularity ?? Number.POSITIVE_INFINITY) - (b.popularity ?? Number.POSITIVE_INFINITY),
)

export const defaultLanguage: LanguageMeta =
  catalog.find((lang) => lang.id === 'python') ?? catalog[0]

/**
 * Lazily load a language's FULL definition (annotations + examples), one dynamic
 * import() per language, so its content stays out of the entry bundle until the
 * language is selected. Falls back to the default language for an unknown id.
 */
export function loadLanguage(id: string): Promise<LanguageDef> {
  const load = loaders[id] ?? loaders[defaultLanguage.id]
  return load()
}
