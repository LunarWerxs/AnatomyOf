// accentStyles is the single source of literal Tailwind class strings for
// every accent color; these tests pin the invariants a broken or incomplete
// entry would violate (a color with the wrong color family baked into one of
// its keys, a missing dark: variant, or a key that doesn't match its own
// name).
import { describe, expect, it } from 'vitest'
import { accentStyles } from './accents'
import type { AccentColor } from './types'

const COLORS: AccentColor[] = [
  'slate',
  'blue',
  'sky',
  'indigo',
  'green',
  'teal',
  'red',
  'rose',
  'amber',
  'orange',
  'purple',
  'pink',
]

describe('accentStyles', () => {
  it('defines exactly the 12 documented accent colors, no more, no less', () => {
    expect(Object.keys(accentStyles).sort()).toEqual([...COLORS].sort())
  })

  it.each(COLORS)('%s: every key names its own color family', (color) => {
    const style = accentStyles[color]
    // card/ring/lineBg/lineBorder/marker/connector must each reference the
    // color they belong to, so a copy-paste from a neighboring entry (e.g.
    // 'rose' text left inside 'red') is caught instead of silently shipping.
    expect(style.card).toContain(`-${color}-`)
    expect(style.ring).toContain(`-${color}-`)
    expect(style.lineBg).toContain(`-${color}-`)
    expect(style.lineBorder).toContain(`-${color}-`)
    expect(style.marker).toContain(`-${color}-`)
    expect(style.connector).toContain(`-${color}-`)
  })

  it.each(COLORS)('%s: card and connector declare a dark: variant', (color) => {
    const style = accentStyles[color]
    expect(style.card).toContain('dark:')
    expect(style.connector).toContain('dark:')
  })

  it.each(COLORS)('%s: ring, lineBg, lineBorder and marker carry no dark: variant', (color) => {
    // These four are applied identically in both themes; a stray dark:
    // variant here would be dead weight Tailwind's scanner picks up for
    // nothing.
    const style = accentStyles[color]
    expect(style.ring).not.toContain('dark:')
    expect(style.lineBg).not.toContain('dark:')
    expect(style.lineBorder).not.toContain('dark:')
    expect(style.marker).not.toContain('dark:')
  })
})
