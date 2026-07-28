import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { importChunk } from '../lib/chunk'

/**
 * Eased momentum scrolling (Lenis) for the app's custom scroll container.
 *
 * Wheel/trackpad scrolling glides with inertia instead of stepping, which softens
 * the sticky annotation cards' hard pin-and-release into a smooth float. Touch
 * scrolling is left native (mobile keeps its own momentum), and anyone who asks for
 * reduced motion gets the browser's default scroll. Lenis is simply never started.
 *
 * Lenis itself is imported lazily: it's a post-paint nicety that reduced-motion
 * visitors never download at all, so it has no business in the entry bundle.
 *
 * `wrapper` is the overflow container; `content` is its inner element that actually
 * holds the scrollable content (kept persistent so Lenis has a stable target even
 * while a language's view is still loading).
 */
export function useSmoothScroll(
  wrapper: Ref<HTMLElement | null>,
  content: Ref<HTMLElement | null>,
) {
  let lenis: { raf: (time: number) => void; destroy: () => void } | null = null
  let rafId = 0
  let disposed = false

  onMounted(async () => {
    const wrapperEl = wrapper.value
    if (!wrapperEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let Lenis: typeof import('lenis').default
    try {
      ;({ default: Lenis } = await importChunk(() => import('lenis')))
    } catch {
      return // Smooth scroll is optional; native scrolling still works.
    }
    if (disposed) return

    lenis = new Lenis({
      wrapper: wrapperEl,
      content: content.value ?? wrapperEl,
      smoothWheel: true,
      lerp: 0.14, // smooth but responsive (higher = tighter/snappier, lower = softer)
    })

    const raf = (time: number) => {
      lenis?.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
  })

  onBeforeUnmount(() => {
    disposed = true
    if (rafId) cancelAnimationFrame(rafId)
    lenis?.destroy()
    lenis = null
  })
}
