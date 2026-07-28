import type { HighlighterCore } from 'shiki/core'

/** Code-window themes. Dark is the default; light is the traffic-light easter egg. */
export const CODE_THEMES = { dark: 'one-dark-pro', light: 'one-light' } as const
export type CodeThemeKey = keyof typeof CODE_THEMES
export const CODE_THEME = CODE_THEMES.dark

/** Panel background + gutter colors per theme (match the Shiki theme's bg). */
export const CODE_THEME_CHROME: Record<CodeThemeKey, { bg: string; gutter: string }> = {
  dark: { bg: '#282c34', gutter: 'text-zinc-600' },
  light: { bg: '#fafafa', gutter: 'text-zinc-400' },
}

let highlighterPromise: Promise<HighlighterCore> | null = null

/**
 * Lazily create a single shared highlighter with just the grammars we need.
 *
 * The Shiki core + the JS regex engine are pulled in with dynamic import() (not a
 * top-level import) so they land in their own async chunk instead of the entry
 * bundle. Nothing Shiki-related loads until the first code block renders.
 *
 * Uses the fine-grained core API so only the grammars listed below are
 * bundled, instead of every grammar/theme Shiki ships. When adding a new
 * language under src/data/, its `shikiLang` grammar must be added to `langs`
 * here (`import('@shikijs/langs/<shikiLang>')`).
 */
export function getHighlighter() {
  highlighterPromise ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ])
    return createHighlighterCore({
      themes: [import('@shikijs/themes/one-dark-pro'), import('@shikijs/themes/one-light')],
      langs: [
        import('@shikijs/langs/python'),
        import('@shikijs/langs/bat'),
        import('@shikijs/langs/css'),
        import('@shikijs/langs/javascript'),
        import('@shikijs/langs/typescript'),
        import('@shikijs/langs/html'),
        import('@shikijs/langs/powershell'),
        import('@shikijs/langs/go'),
        import('@shikijs/langs/rust'),
        import('@shikijs/langs/c'),
        import('@shikijs/langs/cpp'),
        import('@shikijs/langs/csharp'),
        import('@shikijs/langs/java'),
        import('@shikijs/langs/kotlin'),
        import('@shikijs/langs/swift'),
        import('@shikijs/langs/ruby'),
        import('@shikijs/langs/php'),
        import('@shikijs/langs/lua'),
        import('@shikijs/langs/dart'),
        import('@shikijs/langs/haskell'),
        import('@shikijs/langs/scala'),
        import('@shikijs/langs/clojure'),
        import('@shikijs/langs/elixir'),
        import('@shikijs/langs/julia'),
        import('@shikijs/langs/zig'),
        import('@shikijs/langs/nim'),
        import('@shikijs/langs/r'),
        import('@shikijs/langs/perl'),
        import('@shikijs/langs/asm'),
        import('@shikijs/langs/awk'),
        import('@shikijs/langs/cobol'),
        import('@shikijs/langs/erlang'),
        import('@shikijs/langs/fortran-free-form'),
        import('@shikijs/langs/groovy'),
        import('@shikijs/langs/matlab'),
        import('@shikijs/langs/objective-c'),
        import('@shikijs/langs/ocaml'),
        import('@shikijs/langs/solidity'),
        import('@shikijs/langs/vb'),
        import('@shikijs/langs/wasm'),
        import('@shikijs/langs/sql'),
        import('@shikijs/langs/bash'),
        import('@shikijs/langs/pascal'),
        import('@shikijs/langs/ada'),
        import('@shikijs/langs/prolog'),
        import('@shikijs/langs/common-lisp'),
      ],
      engine: createJavaScriptRegexEngine(),
    })
  })()
  return highlighterPromise
}
