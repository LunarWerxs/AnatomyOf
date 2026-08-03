import type { ExampleVariant, LanguageDef, ResolvedAnatomy, ResolvedAnnotation } from './types'
import { visualRefs } from './visual'

/** Merge sorted ranges that touch or overlap ([14,15]+[16,18] -> [14,18]). */
function mergeRanges(ranges: Array<[number, number]>): Array<[number, number]> {
  const sorted = [...ranges].sort((a, b) => a[0] - b[0])
  const merged: Array<[number, number]> = []
  for (const [start, end] of sorted) {
    const last = merged[merged.length - 1]
    if (last && start <= last[1] + 1) {
      last[1] = Math.max(last[1], end)
    } else {
      merged.push([start, end])
    }
  }
  return merged
}

/**
 * Assemble an example from its segments: concatenate the code and derive
 * each annotation's line ranges from segment positions. Annotations the
 * chosen variant never references are dropped, so minimal examples
 * automatically show a subset of the catalog.
 */
/**
 * Resolve a `mockup` concept: annotations carry no line ranges (they point at
 * rendered UI regions by id), just balanced columns for layout.
 */
export function buildMockupAnatomy(def: LanguageDef): ResolvedAnatomy {
  const annotations: ResolvedAnnotation[] = def.annotations.map((a) => ({
    ...a,
    ranges: [],
    column: a.side,
  }))
  balanceColumns(annotations)
  return { variant: 'minimal', code: '', lineCount: 0, annotations }
}

/**
 * Resolve the `visual` variant. Like a mockup, annotations carry no line
 * ranges: they point at diagram regions by id. Only the annotations the
 * diagrams actually reference are shown, and in the order the diagrams
 * introduce them, so the callout column reads top to bottom with the drawing.
 */
export function buildVisualAnatomy(def: LanguageDef): ResolvedAnatomy {
  const order = visualRefs(def.visual?.panels ?? [])
  const annotations: ResolvedAnnotation[] = def.annotations
    .filter((a) => order.includes(a.id))
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
    .map((a) => ({ ...a, ranges: [], column: a.side }))

  if (import.meta.env.DEV) {
    for (const ref of order) {
      if (!def.annotations.some((a) => a.id === ref)) {
        console.warn(`[anatomy] ${def.id}/visual: diagram references unknown annotation "${ref}"`)
      }
    }
  }

  balanceColumns(annotations)
  return { variant: 'minimal', code: '', lineCount: 0, annotations }
}

export function buildAnatomy(def: LanguageDef, variant: ExampleVariant): ResolvedAnatomy {
  const lines: string[] = []
  const rangesByRef = new Map<string, Array<[number, number]>>()
  const segments = def.examples?.[variant] ?? []

  for (const segment of segments) {
    const start = lines.length + 1
    lines.push(...segment.code.split('\n'))
    const end = lines.length
    for (const ref of segment.refs ?? []) {
      if (import.meta.env.DEV && !def.annotations.some((a) => a.id === ref)) {
        console.warn(`[anatomy] ${def.id}/${variant}: segment refs unknown annotation "${ref}"`)
      }
      const existing = rangesByRef.get(ref) ?? []
      existing.push([start, end])
      rangesByRef.set(ref, existing)
    }
  }

  const annotations: ResolvedAnnotation[] = def.annotations
    .filter((a) => rangesByRef.has(a.id))
    .map((a) => ({ ...a, ranges: mergeRanges(rangesByRef.get(a.id) ?? []), column: a.side }))
    .sort((a, b) => (a.ranges[0]?.[0] ?? 0) - (b.ranges[0]?.[0] ?? 0))

  balanceColumns(annotations)

  return { variant, code: lines.join('\n'), lineCount: lines.length, annotations }
}

/**
 * Assign each annotation's render column, honoring its preferred `side` until
 * that column holds its fair share (half, rounded up). Prevents lopsided
 * layouts like a variant whose five annotations all prefer the right column.
 */
function balanceColumns(annotations: ResolvedAnnotation[]): void {
  const cap = Math.ceil(annotations.length / 2)
  const counts = { left: 0, right: 0 }
  for (const annotation of annotations) {
    const preferred = annotation.side
    const other = preferred === 'left' ? 'right' : 'left'
    annotation.column = counts[preferred] < cap ? preferred : other
    counts[annotation.column]++
  }
}
