import type { ThemedToken } from 'shiki'
import { cacheUnlessRejected, importChunk } from './chunk'
import { fnv1a } from './code-hash'

/**
 * Build-time highlighting (see scripts/gen-tokens.ts): one JSON per grammar holding the dark
 * theme's tokens for every example, keyed by a hash of the example's code. A cold visit reads
 * its example from here instead of downloading Shiki and tokenizing on the main thread.
 *
 * The directory is generated and gitignored; when it is empty (a fresh checkout in dev,
 * tests) the glob is empty and every caller falls back to live Shiki.
 */
type TokenFile = { colors: string[]; examples: Record<string, [string, number][][]> }

const FILES = import.meta.glob<TokenFile>('../data/tokens.generated/*.json', { import: 'default' })

const loaded = new Map<string, Promise<TokenFile | null>>()
/** The files that have finished loading, readable without awaiting (see peekPrebuiltTokens). */
const settled = new Map<string, TokenFile | null>()

function loadFile(lang: string): Promise<TokenFile | null> {
  const load = FILES[`../data/tokens.generated/${lang}.json`]
  if (!load) return Promise.resolve(null)
  return cacheUnlessRejected(loaded, lang, () =>
    importChunk(load).then((file) => {
      settled.set(lang, file)
      return file
    }),
  )
}

/** Start fetching a grammar's prebuilt tokens without waiting (failures surface later). */
export function warmPrebuiltTokens(lang: string): void {
  void loadFile(lang).catch(() => {})
}

/** Fetch a grammar's prebuilt tokens and wait for them; a failure only means live highlighting. */
export async function loadPrebuiltTokens(lang: string): Promise<void> {
  await loadFile(lang).catch(() => {})
}

/**
 * The dark-theme tokens for `code`, or null when this exact code was not prebuilt (the caller
 * then highlights it live). The joined token text is checked against the code, so a stale
 * file can never show the wrong example.
 */
export async function prebuiltTokens(lang: string, code: string): Promise<ThemedToken[][] | null> {
  let file: TokenFile | null
  try {
    file = await loadFile(lang)
  } catch {
    return null
  }
  return tokensFor(file, code)
}

/**
 * prebuiltTokens without the wait: null unless the grammar's file has already loaded. The code
 * panel's first render uses this, so a prerendered page and the render that hydrates it both show
 * the highlighted code on their first pass instead of an empty panel that fills a frame later.
 */
export function peekPrebuiltTokens(lang: string, code: string): ThemedToken[][] | null {
  return tokensFor(settled.get(lang) ?? null, code)
}

function tokensFor(file: TokenFile | null, code: string): ThemedToken[][] | null {
  const lines = file?.examples[fnv1a(code)]
  if (!file || !lines) return null
  let offset = 0
  const tokens = lines.map((line) => {
    const row = line.map(([content, color]) => {
      const token = { content, offset, color: file.colors[color] || undefined }
      offset += content.length
      return token
    })
    offset += 1 // the newline
    return row
  })
  if (lines.map((line) => line.map(([content]) => content).join('')).join('\n') !== code) {
    return null
  }
  return tokens
}
