<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { accentStyles } from '../lib/accents'
import type { ResolvedAnnotation } from '../lib/types'

const props = defineProps<{
  /** The positioned wrapper that both the cards and the code panel live in */
  container: HTMLElement | null
  annotations: ResolvedAnnotation[]
  activeId: string | null
  /** Bump to kick off a fresh tracking pass (after a variant/language swap) */
  layoutKey: number
  /** 'code' targets `[data-code-line]` by range; 'region' targets `[data-region]` by id */
  anchorMode?: 'code' | 'region'
}>()

interface ConnectorPath {
  id: string
  d: string
  colorClass: string
  endX: number
  endY: number
}

const paths = ref<ConnectorPath[]>([])
const ready = ref(false)

const XL_QUERY = '(min-width: 1280px)'

function compute() {
  const container = props.container
  if (!container || !window.matchMedia(XL_QUERY).matches) {
    paths.value = []
    return
  }
  const codePanel = container.querySelector('[data-code-panel]')
  if (!codePanel) {
    paths.value = []
    return
  }
  const cRect = container.getBoundingClientRect()
  const codeRect = codePanel.getBoundingClientRect()
  const next: ConnectorPath[] = []

  const region = props.anchorMode === 'region'

  props.annotations.forEach((annotation, index) => {
    const card = container.querySelector(`[data-annotation-card="${annotation.id}"]`)
    if (!card) return
    const cardRect = card.getBoundingClientRect()
    const fromLeft = annotation.column === 'left'
    const startX = (fromLeft ? cardRect.right : cardRect.left) - cRect.left
    const startY = cardRect.top + cardRect.height / 2 - cRect.top

    // Each target is one endpoint: a code-line range (code mode) or a UI
    // region (mockup mode). Code endpoints sit at the panel edge; region
    // endpoints at the region's own near edge.
    const targets: Array<{ id: string; endX: number; endY: number }> = []

    if (region) {
      const el = container.querySelector(`[data-region="${annotation.id}"]`)
      if (el) {
        const r = el.getBoundingClientRect()
        targets.push({
          id: annotation.id,
          endX: (fromLeft ? r.left : r.right) - cRect.left,
          endY: r.top + r.height / 2 - cRect.top,
        })
      }
    } else {
      const panelEndX = (fromLeft ? codeRect.left : codeRect.right) - cRect.left
      for (const [first, last] of annotation.ranges) {
        const firstEl = container.querySelector(`[data-code-line="${first}"]`)
        const lastEl = container.querySelector(`[data-code-line="${last}"]`) ?? firstEl
        if (!firstEl || !lastEl) continue
        targets.push({
          id: `${annotation.id}:${first}`,
          endX: panelEndX,
          endY:
            (firstEl.getBoundingClientRect().top + lastEl.getBoundingClientRect().bottom) / 2 -
            cRect.top,
        })
      }
    }

    // stagger the elbow position so parallel lines don't overlap
    const bend = 0.42 + (index % 4) * 0.12

    for (const t of targets) {
      // Guard against transient garbage coordinates mid-layout.
      if (!Number.isFinite(startX) || !Number.isFinite(t.endY) || t.endX <= 0) continue
      const midX = startX + (t.endX - startX) * bend
      next.push({
        id: t.id,
        d: `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${t.endY} L ${t.endX} ${t.endY}`,
        colorClass: accentStyles[annotation.color].connector,
        endX: t.endX,
        endY: t.endY,
      })
    }
  })

  paths.value = next
  if (next.length > 0) ready.value = true
}

// --- continuous tracking ---
// Card fly-ins move via CSS transform and the code panel animates its height;
// neither reliably fires a single settle event, so we recompute every frame
// for the duration of a swap. This makes the lines glide with the layout
// instead of snapping between discrete samples.
let rafId: number | null = null
let trackUntil = 0

function track(durationMs: number) {
  trackUntil = Math.max(trackUntil, performance.now() + durationMs)
  // Always compute immediately so a single event positions lines correctly
  // even if the rAF loop is paused (e.g. a backgrounded tab). The loop only
  // adds smooth intermediate frames during the animation window.
  compute()
  if (rafId === null) loop()
}

function loop() {
  compute()
  if (performance.now() < trackUntil) {
    rafId = requestAnimationFrame(loop)
  } else {
    rafId = null
  }
}

// A data swap invalidates every position; blank out and re-track from scratch.
watch(
  () => props.annotations,
  () => {
    ready.value = false
    paths.value = []
    // Covers the code-panel height transition (500ms) + card fly-in (450ms + stagger).
    track(900)
  },
)

watch(
  () => props.layoutKey,
  () => track(900),
)

onMounted(() => track(900))

// Reflows that don't animate (font load, wrap changes) still need a remeasure.
let resizeObserver: ResizeObserver | null = null

watch(
  () => props.container,
  (container) => {
    resizeObserver?.disconnect()
    if (container) {
      resizeObserver = new ResizeObserver(() => track(120))
      resizeObserver.observe(container)
      const codePanel = container.querySelector('[data-code-panel]')
      if (codePanel) resizeObserver.observe(codePanel)
    }
  },
  { immediate: true },
)

function onWindowResize() {
  track(120)
}

// The card columns are sticky, so scrolling changes their position relative to
// the (scrolling) code panel, recompute the lines to keep them anchored.
function onScroll() {
  track(0)
}

onMounted(() => {
  window.addEventListener('resize', onWindowResize)
  window.addEventListener('scroll', onScroll, { capture: true, passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('scroll', onScroll, { capture: true })
  resizeObserver?.disconnect()
  if (rafId !== null) cancelAnimationFrame(rafId)
})

// A path's id is either `annId` (region) or `annId:line` (code).
function isActive(pathId: string): boolean {
  const active = props.activeId
  return active != null && (pathId === active || pathId.startsWith(`${active}:`))
}
const inactivePaths = computed(() => paths.value.filter((p) => !isActive(p.id)))
const activePaths = computed(() => paths.value.filter((p) => isActive(p.id)))
</script>

<template>
  <svg
    class="pointer-events-none absolute inset-0 z-0 hidden h-full w-full transition-opacity duration-300 xl:block"
    :class="ready ? 'opacity-100' : 'opacity-0'"
    aria-hidden="true"
  >
    <g
      v-for="path in inactivePaths"
      :key="path.id"
      :class="path.colorClass"
      class="opacity-40 transition-opacity duration-150"
    >
      <path
        :d="path.d"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <circle :cx="path.endX" :cy="path.endY" r="3" fill="currentColor" />
    </g>
    <g v-for="path in activePaths" :key="path.id" :class="path.colorClass">
      <path
        :d="path.d"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linejoin="round"
      />
      <circle :cx="path.endX" :cy="path.endY" r="3.5" fill="currentColor" />
    </g>
  </svg>
</template>
