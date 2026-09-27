/**
 * Hidden-tab-safe "after the next paint". A frame callback plus a macrotask lands just after the
 * browser paints, but Chrome pauses frames on a hidden, occluded or headless tab, so a bare
 * requestAnimationFrame used as a one-shot gate can wait forever there. Race the frame against a
 * timer and let whichever arrives first win, exactly once: a painting tab still waits for its
 * paint (~16 ms, well inside the fallback), a hidden one falls through to the timer.
 */

/** Fallback delay, comfortably longer than a 60 Hz frame so a visible tab always wins. */
export const NEXT_PAINT_FALLBACK_MS = 200

/** Run `callback` after the next paint, or after `fallbackMs` if frames are paused. */
export function onNextPaint(callback: () => void, fallbackMs = NEXT_PAINT_FALLBACK_MS): void {
  if (typeof window === 'undefined') {
    // Prerendering: there is no paint to wait for.
    callback()
    return
  }
  let done = false
  const runOnce = () => {
    if (done) return
    done = true
    window.clearTimeout(timer)
    callback()
  }
  const timer = window.setTimeout(runOnce, fallbackMs)
  window.requestAnimationFrame(() => window.setTimeout(runOnce))
}

/** Promise form of {@link onNextPaint}. */
export function waitForNextPaint(fallbackMs = NEXT_PAINT_FALLBACK_MS): Promise<void> {
  return new Promise((resolve) => onNextPaint(resolve, fallbackMs))
}
