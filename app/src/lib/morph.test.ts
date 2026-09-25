// Pins the line matching behind the minimal <-> verbose morph: shared lines keep their identity
// (even when a block moved or was re-indented), only the rest is new, and blank rows never pair.
import { describe, expect, it } from 'vitest'
import { carryLineKeys, matchLineRuns } from './morph'

describe('matchLineRuns', () => {
  it('pairs shared lines, ignoring re-indentation', () => {
    const before = ['import a', 'import b', '', 'print(x)']
    const after = ['# comment', 'import a', 'import b', 'def f():', '    print(x)']
    expect(matchLineRuns(before, after)).toEqual([
      { from: 0, to: 1, length: 2 },
      { from: 3, to: 4, length: 1 },
    ])
  })

  it('keeps blocks that swapped places, which an order-preserving diff would drop', () => {
    expect(matchLineRuns(['a', 'b', 'c', 'd'], ['c', 'd', 'a', 'b'])).toEqual([
      { from: 2, to: 0, length: 2 },
      { from: 0, to: 2, length: 2 },
    ])
  })

  it('never pairs a run made only of blank lines', () => {
    expect(matchLineRuns(['x', '', ''], ['', '', 'y'])).toEqual([])
    expect(matchLineRuns(['a', '', 'b'], ['a', '', 'b'])).toEqual([{ from: 0, to: 0, length: 3 }])
  })
})

describe('carryLineKeys', () => {
  it('hands matched lines their old key and gives the rest fresh ones', () => {
    const before = ['a', 'b', 'c']
    const keys = carryLineKeys(before, ['A', 'B', 'C'], ['c', 'new', 'a', 'b'], (i) => `n${i}`)
    expect(keys).toEqual(['C', 'n1', 'A', 'B'])
  })
})
