/**
 * The one place the app reads the user's reduced-motion preference. The SSR guard and the
 * capability check live here so every caller gets the same answer: false while prerendering or
 * where matchMedia is unavailable, otherwise the live media query.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  )
}
