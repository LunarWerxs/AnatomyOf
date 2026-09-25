// Line matching for the minimal <-> verbose code morph. Instead of a hard crossfade, lines the two
// variants share keep their identity (their Vue key) so they glide to their new row, and only the
// lines unique to one side fade in or out. The matching is an iterated longest-common-run pass:
// take the longest run of identical lines between the two sides, retire it, repeat. Unlike a plain
// LCS diff the runs may cross, so a block that moved (an import pulled above a comment, say) still
// slides instead of being deleted and retyped. Idea from 3b1b/manim's TransformMatchingStrings
// (manimlib/animation/transform_matching_parts.py, MIT); written fresh for AnatomyOf.

/** One matched run: `length` lines starting at `from` in the old side and `to` in the new side. */
export interface LineRun {
  from: number
  to: number
  length: number
}

/**
 * Longest contiguous run of equal, still-unmatched entries (null = already matched). Ties go to the
 * earliest run in `a`, then in `b`, so the result is deterministic.
 */
function longestRun(a: (string | null)[], b: (string | null)[]): LineRun {
  let best: LineRun = { from: 0, to: 0, length: 0 }
  // lengths[j + 1] = length of the common run ending at a[i], b[j]; one row reused per i.
  let prev = new Array<number>(b.length + 1).fill(0)
  for (let i = 0; i < a.length; i++) {
    const row = new Array<number>(b.length + 1).fill(0)
    const ai = a[i]
    if (ai !== null) {
      for (let j = 0; j < b.length; j++) {
        if (b[j] !== ai) continue
        const length = prev[j] + 1
        row[j + 1] = length
        if (length > best.length) best = { from: i - length + 1, to: j - length + 1, length }
      }
    }
    prev = row
  }
  return best
}

/**
 * Pairs lines of `before` with lines of `after` by repeatedly taking the longest common run of
 * still-unmatched lines. Lines are compared with surrounding whitespace ignored, so a line that
 * only changed indentation (wrapped in a new block in the verbose variant) still counts as shared.
 * Blank lines are never matched on their own: sliding an invisible row says nothing.
 */
export function matchLineRuns(before: string[], after: string[]): LineRun[] {
  const a: (string | null)[] = before.map((line) => line.trim())
  const b: (string | null)[] = after.map((line) => line.trim())
  const runs: LineRun[] = []
  for (;;) {
    const run = longestRun(a, b)
    if (run.length === 0) break
    for (let k = 0; k < run.length; k++) {
      a[run.from + k] = null
      b[run.to + k] = null
    }
    // A run made only of blank lines carries no visible content; retire it without pairing so it
    // cannot drag an empty row across the panel, and keep looking for real content.
    const blank = before.slice(run.from, run.from + run.length).every((line) => !line.trim())
    if (!blank) runs.push(run)
  }
  return runs.sort((x, y) => x.to - y.to)
}

/**
 * Stable per-line keys for the new side: a line matched to an old line inherits that line's key
 * (so Vue moves the same element), every other line gets a fresh key from `fresh` (so it enters).
 */
export function carryLineKeys(
  before: string[],
  beforeKeys: string[],
  after: string[],
  fresh: (index: number) => string,
): string[] {
  const keys = after.map((_, index) => fresh(index))
  for (const run of matchLineRuns(before, after)) {
    for (let k = 0; k < run.length; k++) keys[run.to + k] = beforeKeys[run.from + k]
  }
  return keys
}
