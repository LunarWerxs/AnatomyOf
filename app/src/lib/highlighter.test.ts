// getHighlighter/warmHighlighter wrap real Shiki (already a project dependency,
// resolved from node_modules with no network call) with this module's own
// contract: reject with a named error for a grammar/theme nobody registered,
// and never let a rejection escape warmHighlighter. The static tables
// (CODE_THEMES, CODE_THEME_CHROME) are checked directly since they are the
// part every component actually imports.
import { describe, expect, it } from 'vitest'
import {
  CODE_THEME,
  CODE_THEME_CHROME,
  CODE_THEMES,
  getHighlighter,
  warmHighlighter,
} from './highlighter'

describe('theme tables', () => {
  it('CODE_THEME points at the dark entry of CODE_THEMES', () => {
    expect(CODE_THEME).toBe(CODE_THEMES.dark)
    expect(CODE_THEMES).toEqual({ dark: 'one-dark-pro', light: 'one-light' })
  })

  it('CODE_THEME_CHROME defines bg/fg/gutter for both theme keys', () => {
    expect(Object.keys(CODE_THEME_CHROME).sort()).toEqual(['dark', 'light'])
    for (const key of Object.keys(CODE_THEMES) as Array<keyof typeof CODE_THEMES>) {
      const chrome = CODE_THEME_CHROME[key]
      expect(chrome.bg).toMatch(/^#[0-9a-f]{6}$/i)
      expect(chrome.fg).toMatch(/^#[0-9a-f]{6}$/i)
      expect(chrome.gutter.length).toBeGreaterThan(0)
    }
    // The two themes must actually differ, or the traffic-light easter egg
    // would toggle to something visually identical.
    expect(CODE_THEME_CHROME.dark.bg).not.toBe(CODE_THEME_CHROME.light.bg)
  })
})

describe('getHighlighter', () => {
  it('rejects with a named error for a grammar nobody registered, before touching the network', async () => {
    await expect(getHighlighter('not-a-real-language')).rejects.toThrow(
      'No Shiki grammar registered for "not-a-real-language"',
    )
  }, 20_000)

  it('rejects with a named error for a theme nobody registered', async () => {
    await expect(getHighlighter('python', 'not-a-real-theme')).rejects.toThrow(
      'No Shiki theme registered for "not-a-real-theme"',
    )
  }, 20_000)

  it('resolves a real highlighter that has actually loaded the requested language and theme', async () => {
    const highlighter = await getHighlighter('python', 'one-dark-pro')
    expect(highlighter.getLoadedLanguages()).toContain('python')
    expect(highlighter.getLoadedThemes()).toContain('one-dark-pro')
  }, 20_000)
})

describe('warmHighlighter', () => {
  it('never lets a rejection (unknown language) escape as an unhandled rejection', async () => {
    expect(() => warmHighlighter('also-not-a-real-language')).not.toThrow()
    // Give the fire-and-forget promise a tick to settle; if it were unhandled,
    // vitest would surface it as a failure of this test (or the run).
    await new Promise((resolve) => setTimeout(resolve, 50))
  })
})
