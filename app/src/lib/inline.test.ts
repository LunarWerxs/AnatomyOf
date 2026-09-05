// Exercises splitInline's documented contract: split on `backticks`, tag
// alternating parts as code/prose, and drop empty pieces.
import { describe, expect, it } from 'vitest'
import { splitInline } from './inline'

describe('splitInline', () => {
  it('returns a single prose segment for plain text', () => {
    expect(splitInline('just plain text')).toEqual([{ code: false, text: 'just plain text' }])
  })

  it('marks a single backtick-wrapped run as code', () => {
    expect(splitInline('call `foo()` now')).toEqual([
      { code: false, text: 'call ' },
      { code: true, text: 'foo()' },
      { code: false, text: ' now' },
    ])
  })

  it('alternates code/prose across multiple backtick runs', () => {
    const result = splitInline('`a` and `b` and `c`')
    expect(result.map((s) => s.code)).toEqual([true, false, true, false, true])
    expect(result.map((s) => s.text)).toEqual(['a', ' and ', 'b', ' and ', 'c'])
  })

  it('drops empty segments produced by adjacent or edge backticks', () => {
    // Leading backtick produces an empty prose segment before it; trailing
    // backtick likewise after it. Neither should survive.
    expect(splitInline('`code` at the start')).toEqual([
      { code: true, text: 'code' },
      { code: false, text: ' at the start' },
    ])
    expect(splitInline('ends with `code`')).toEqual([
      { code: false, text: 'ends with ' },
      { code: true, text: 'code' },
    ])
  })

  it('returns an empty array for an empty string', () => {
    expect(splitInline('')).toEqual([])
  })

  it('treats an odd trailing backtick as the start of an (empty, dropped) code run', () => {
    // 'a`b' -> ['a', 'b'] -> index 1 ('b') is code=true, index 0 is prose.
    expect(splitInline('a`b')).toEqual([
      { code: false, text: 'a' },
      { code: true, text: 'b' },
    ])
  })
})
