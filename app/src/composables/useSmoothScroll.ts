import Lenis from 'lenis'
import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/**
 * Eased momentum scrolling (Lenis) for the app's custom scroll container.
 *
 * Wheel/trackpad scrolling glides with inertia instead of stepping, which softens
 * the sticky annotation cards' hard pin-and-release into a smooth float. Touch
 * scrolling is left native (mobile keeps its own momentum), and anyone who asks for
 * reduced motion gets the browser's default scroll. Lenis is simply never started.
 *
 * `wrapper` is the overflow container; `content` is its inner element that actually
 * holds the scrollable content (kept persistent so Lenis has a stable target even
 * while a language's view is still loading).
 */
export function useSmoothScroll(
  wrapper: Ref<HTMLElement | null>,
  content: Ref<HTMLElement | null>,
) {
  let lenis: Lenis | null = null
  let rafId = 0

  onMounted(() => {
    const wrapperEl = wrapper.value
    if (!wrapperEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

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
    if (rafId) cancelAnimationFrame(rafId)
    lenis?.destroy()
    lenis = null
  })
}
