// Exercises the three anatomy builders against the invariants their own
// comments document: line ranges are derived (never hand-counted), touching
// ranges merge, an annotation nothing references is dropped, results are
// ordered by first appearance, and column balancing keeps one side from
// swallowing more than its fair (rounded-up) half.
import { describe, expect, it } from 'vitest'
import { buildAnatomy, buildMockupAnatomy, buildVisualAnatomy } from './anatomy'
import type { AnnotationDef, ExampleSegment, LanguageDef, TopologyPanel } from './types'

function annotation(id: string, side: 'left' | 'right' = 'left'): AnnotationDef {
  return { id, title: id, body: id, details: id, color: 'blue', side }
}

function makeDef(overrides: Partial<LanguageDef> = {}): LanguageDef {
  return {
    id: 'x',
    name: 'X',
    titleWord: 'X',
    article: 'a',
    extensions: ['.x'],
    accentHex: '#000000',
    officialUrl: 'https://example.test',
    shikiLang: 'x',
    note: 'note',
    annotations: [],
    ...overrides,
  }
}

describe('buildAnatomy', () => {
  it('concatenates segment code and derives 1-indexed inclusive line ranges', () => {
    const segments: ExampleSegment[] = [
      { code: 'import os', refs: ['imp'] },
      { code: '' },
      { code: 'def foo():\n    pass', refs: ['func'] },
    ]
    const def = makeDef({
      annotations: [annotation('imp', 'left'), annotation('func', 'right')],
      examples: { minimal: segments, verbose: [] },
    })

    const result = buildAnatomy(def, 'minimal')

    expect(result.variant).toBe('minimal')
    expect(result.code).toBe('import os\n\ndef foo():\n    pass')
    expect(result.lineCount).toBe(4)
    expect(result.annotations.map((a) => a.id)).toEqual(['imp', 'func'])
    expect(result.annotations.find((a) => a.id === 'imp')?.ranges).toEqual([[1, 1]])
    expect(result.annotations.find((a) => a.id === 'func')?.ranges).toEqual([[3, 4]])
  })

  it('merges ranges from adjacent segments sharing a ref (touching, no gap)', () => {
    const segments: ExampleSegment[] = [
      { code: 'a\nb', refs: ['x'] }, // lines 1-2
      { code: 'c', refs: ['x'] }, // line 3, touches the previous range
    ]
    const def = makeDef({
      annotations: [annotation('x')],
      examples: { minimal: segments, verbose: [] },
    })

    const result = buildAnatomy(def, 'minimal')
    expect(result.annotations[0].ranges).toEqual([[1, 3]])
  })

  it('keeps ranges separate when a gap (an unreferenced line) sits between them', () => {
    const segments: ExampleSegment[] = [
      { code: 'a', refs: ['y'] }, // line 1
      { code: 'b' }, // line 2, no ref: breaks contiguity
      { code: 'c', refs: ['y'] }, // line 3
    ]
    const def = makeDef({
      annotations: [annotation('y')],
      examples: { minimal: segments, verbose: [] },
    })

    const result = buildAnatomy(def, 'minimal')
    expect(result.annotations[0].ranges).toEqual([
      [1, 1],
      [3, 3],
    ])
  })

  it('drops an annotation that no segment in this variant references', () => {
    const segments: ExampleSegment[] = [{ code: 'a', refs: ['used'] }]
    const def = makeDef({
      annotations: [annotation('used'), annotation('unused')],
      examples: { minimal: segments, verbose: [] },
    })

    const result = buildAnatomy(def, 'minimal')
    expect(result.annotations.map((a) => a.id)).toEqual(['used'])
  })

  it('orders annotations by first line, not by declaration order in the catalog', () => {
    const segments: ExampleSegment[] = [
      { code: 'a', refs: ['later-declared'] }, // line 1
      { code: 'b\nc\nd' }, // lines 2-4, no ref
      { code: 'e', refs: ['earlier-declared'] }, // line 5
    ]
    // Declared in the catalog in the OPPOSITE order to where they appear in code.
    const def = makeDef({
      annotations: [annotation('earlier-declared'), annotation('later-declared')],
      examples: { minimal: segments, verbose: [] },
    })

    const result = buildAnatomy(def, 'minimal')
    expect(result.annotations.map((a) => a.id)).toEqual(['later-declared', 'earlier-declared'])
  })

  it('caps a lopsided side at half (rounded up) and overflows the rest to the other column', () => {
    const segments: ExampleSegment[] = [
      { code: 'a', refs: ['r1'] },
      { code: 'b', refs: ['r2'] },
      { code: 'c', refs: ['r3'] },
    ]
    const def = makeDef({
      // All three prefer 'right'; cap = ceil(3/2) = 2.
      annotations: [
        annotation('r1', 'right'),
        annotation('r2', 'right'),
        annotation('r3', 'right'),
      ],
      examples: { minimal: segments, verbose: [] },
    })

    const result = buildAnatomy(def, 'minimal')
    expect(result.annotations.map((a) => a.column)).toEqual(['right', 'right', 'left'])
  })

  it('returns an empty, zero-length anatomy when the variant has no examples', () => {
    const def = makeDef({ annotations: [annotation('a')] })
    const result = buildAnatomy(def, 'minimal')
    expect(result).toEqual({ variant: 'minimal', code: '', lineCount: 0, annotations: [] })
  })
})

describe('buildMockupAnatomy', () => {
  it('carries every annotation with no line ranges, balancing lopsided sides', () => {
    const def = makeDef({
      annotations: [annotation('a', 'left'), annotation('b', 'left')],
    })

    const result = buildMockupAnatomy(def)
    expect(result.variant).toBe('minimal')
    expect(result.code).toBe('')
    expect(result.lineCount).toBe(0)
    // cap = ceil(2/2) = 1: only the first 'left'-preferring annotation stays left.
    expect(result.annotations.map((a) => [a.id, a.column, a.ranges])).toEqual([
      ['a', 'left', []],
      ['b', 'right', []],
    ])
  })
})

describe('buildVisualAnatomy', () => {
  it('keeps only annotations the diagram references, ordered by first appearance in it', () => {
    // addTopologyRefs visits every zone's nodes before it visits edges, so the
    // node ref must come out first regardless of catalog declaration order.
    const panel: TopologyPanel = {
      template: 'topology',
      zones: [{ id: 'z', label: 'Z', nodes: [{ id: 'n', ref: 'node-ref', title: 'N' }] }],
      edges: [{ from: 'n', to: 'n', ref: 'edge-ref' }],
    }
    // Declared in the catalog with the diagram-referenced ones in the OPPOSITE
    // order from how the diagram introduces them, plus one nothing draws.
    const def = makeDef({
      annotations: [
        annotation('edge-ref'),
        annotation('unreferenced-by-diagram'),
        annotation('node-ref'),
      ],
      visual: { panels: [panel] },
    })

    const result = buildVisualAnatomy(def)
    expect(result.variant).toBe('minimal')
    expect(result.annotations.map((a) => a.id)).toEqual(['node-ref', 'edge-ref'])
  })

  it('returns no annotations when the entry has no visual block', () => {
    const def = makeDef({ annotations: [annotation('a')] })
    const result = buildVisualAnatomy(def)
    expect(result.annotations).toEqual([])
  })
})
