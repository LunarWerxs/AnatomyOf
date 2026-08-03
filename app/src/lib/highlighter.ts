import type { HighlighterCore, LanguageRegistration, ThemeRegistrationAny } from 'shiki/core'
import { cacheUnlessRejected, importChunk } from './chunk'

/** Code-window themes. Dark is the default; light is the traffic-light easter egg. */
export const CODE_THEMES = { dark: 'one-dark-pro', light: 'one-light' } as const
export type CodeThemeKey = keyof typeof CODE_THEMES
export const CODE_THEME = CODE_THEMES.dark

/** Panel background, default text and gutter colors per theme (match the Shiki theme). */
export const CODE_THEME_CHROME: Record<CodeThemeKey, { bg: string; fg: string; gutter: string }> = {
  dark: { bg: '#282c34', fg: '#abb2bf', gutter: 'text-zinc-600' },
  light: { bg: '#fafafa', fg: '#383a42', gutter: 'text-zinc-400' },
}

type LangModule = { default: LanguageRegistration[] }
type ThemeModule = { default: ThemeRegistrationAny }

/**
 * One lazy loader per grammar, fetched only when a page actually renders that
 * language. Each @shikijs/langs module already carries its own embedded-language
 * dependencies (html pulls javascript + css, php pulls html + sql, and so on),
 * so asking for one grammar is enough.
 *
 * When adding a new language under src/data/, its `shikiLang` grammar must be
 * added here (enforced by scripts/check-grammars.ts).
 */
const LANG_LOADERS: Record<string, () => Promise<LangModule>> = {
  ada: () => import('@shikijs/langs/ada'),
  asm: () => import('@shikijs/langs/asm'),
  awk: () => import('@shikijs/langs/awk'),
  bash: () => import('@shikijs/langs/bash'),
  bat: () => import('@shikijs/langs/bat'),
  c: () => import('@shikijs/langs/c'),
  clojure: () => import('@shikijs/langs/clojure'),
  cobol: () => import('@shikijs/langs/cobol'),
  'common-lisp': () => import('@shikijs/langs/common-lisp'),
  cpp: () => import('@shikijs/langs/cpp'),
  csharp: () => import('@shikijs/langs/csharp'),
  css: () => import('@shikijs/langs/css'),
  dart: () => import('@shikijs/langs/dart'),
  elixir: () => import('@shikijs/langs/elixir'),
  erlang: () => import('@shikijs/langs/erlang'),
  'fortran-free-form': () => import('@shikijs/langs/fortran-free-form'),
  go: () => import('@shikijs/langs/go'),
  groovy: () => import('@shikijs/langs/groovy'),
  haskell: () => import('@shikijs/langs/haskell'),
  html: () => import('@shikijs/langs/html'),
  java: () => import('@shikijs/langs/java'),
  javascript: () => import('@shikijs/langs/javascript'),
  julia: () => import('@shikijs/langs/julia'),
  kotlin: () => import('@shikijs/langs/kotlin'),
  lua: () => import('@shikijs/langs/lua'),
  matlab: () => import('@shikijs/langs/matlab'),
  nim: () => import('@shikijs/langs/nim'),
  'objective-c': () => import('@shikijs/langs/objective-c'),
  ocaml: () => import('@shikijs/langs/ocaml'),
  pascal: () => import('@shikijs/langs/pascal'),
  perl: () => import('@shikijs/langs/perl'),
  php: () => import('@shikijs/langs/php'),
  powershell: () => import('@shikijs/langs/powershell'),
  prolog: () => import('@shikijs/langs/prolog'),
  python: () => import('@shikijs/langs/python'),
  r: () => import('@shikijs/langs/r'),
  ruby: () => import('@shikijs/langs/ruby'),
  rust: () => import('@shikijs/langs/rust'),
  scala: () => import('@shikijs/langs/scala'),
  solidity: () => import('@shikijs/langs/solidity'),
  sql: () => import('@shikijs/langs/sql'),
  svelte: () => import('@shikijs/langs/svelte'),
  swift: () => import('@shikijs/langs/swift'),
  typescript: () => import('@shikijs/langs/typescript'),
  vb: () => import('@shikijs/langs/vb'),
  wasm: () => import('@shikijs/langs/wasm'),
  yaml: () => import('@shikijs/langs/yaml'),
  zig: () => import('@shikijs/langs/zig'),
}

/** Themes are lazy too; the light one only ever loads if the easter egg is used. */
const THEME_LOADERS: Record<string, () => Promise<ThemeModule>> = {
  'one-dark-pro': () => import('@shikijs/themes/one-dark-pro'),
  'one-light': () => import('@shikijs/themes/one-light'),
}

let corePromise: Promise<HighlighterCore> | null = null
const resources = new Map<string, Promise<void>>()

/**
 * The bare highlighter: Shiki core plus the JS regex engine, with no grammars
 * and no themes registered. Both arrive later via getHighlighter().
 *
 * The core and the engine are pulled in with dynamic import() (not a top-level
 * import) so they land in their own async chunk instead of the entry bundle.
 * Nothing Shiki-related loads until the first code block renders.
 */
function getCore(): Promise<HighlighterCore> {
  corePromise ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
      importChunk(() => import('shiki/core')),
      importChunk(() => import('shiki/engine/javascript')),
    ])
    return createHighlighterCore({
      themes: [],
      langs: [],
      engine: createJavaScriptRegexEngine(),
    })
  })().catch((error) => {
    // A rejected promise must not stay cached, or one dropped request would
    // leave every code panel blank for the rest of the session.
    corePromise = null
    throw error
  })
  return corePromise
}

/**
 * Resolve a highlighter ready to tokenize `lang` in `theme`, fetching just those
 * two grammars/themes (plus the shared core) the first time each is asked for.
 *
 * Rejects if a chunk cannot be fetched even after retries; callers are expected
 * to fall back to unhighlighted code rather than render nothing.
 */
export async function getHighlighter(
  lang: string,
  theme: string = CODE_THEME,
): Promise<HighlighterCore> {
  const highlighter = await getCore()

  await Promise.all([
    cacheUnlessRejected(resources, `lang:${lang}`, async () => {
      if (highlighter.getLoadedLanguages().includes(lang)) return
      const loader = LANG_LOADERS[lang]
      if (!loader) throw new Error(`No Shiki grammar registered for "${lang}"`)
      await highlighter.loadLanguage(() => importChunk(loader))
    }),
    cacheUnlessRejected(resources, `theme:${theme}`, async () => {
      if (highlighter.getLoadedThemes().includes(theme)) return
      const loader = THEME_LOADERS[theme]
      if (!loader) throw new Error(`No Shiki theme registered for "${theme}"`)
      await highlighter.loadTheme(() => importChunk(loader))
    }),
  ])

  return highlighter
}

/**
 * Begin fetching everything needed to highlight `lang` without waiting on it.
 *
 * Called as soon as the route is known so the core, engine, grammar and theme
 * download in parallel with the language's own data chunk, rather than in a
 * second round trip once the code panel finally mounts.
 */
export function warmHighlighter(lang: string): void {
  // Failures are ignored here: the code panel asks again and handles them for
  // real (retrying, then falling back to unhighlighted code).
  void getHighlighter(lang).catch(() => {})
}
