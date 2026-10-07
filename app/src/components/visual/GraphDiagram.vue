<script setup lang="ts">
/**
 * Graph: lanes with commit/merge/conflict nodes, joined by branch curves.
 * Answers "in what order".
 *
 * All geometry comes from layoutGraph(); this file only draws. Accent colour
 * rides on `currentColor` via accents.ts's connector classes, so a region picks
 * up its annotation's colour in both themes without a second palette.
 */
import { computed } from 'vue'
import { accentStyles } from '../../lib/accents'
import type { AccentColor, GraphPanel } from '../../lib/types'
import { layoutGraph } from '../../lib/visual'

const props = defineProps<{
  panel: GraphPanel
  activeId: string | null
  colorMap: Record<string, AccentColor>
}>()

const layout = computed(() => layoutGraph(props.panel))

const accent = (ref: string) => accentStyles[props.colorMap[ref] ?? 'slate'].connector
const on = (ref: string) => props.activeId === ref
</script>

<template>
  <svg
    :viewBox="`0 0 ${layout.width} ${layout.height}`"
    class="w-full"
    :style="{ height: 'auto' }"
    role="img"
  >
    <defs>
      <!-- context-stroke makes one marker take each arrow's own colour. -->
      <marker
        id="vg-arrow"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="5.5"
        markerHeight="5.5"
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 z" fill="context-stroke" />
      </marker>
    </defs>

    <!-- Lane tracks -->
    <g v-for="lane in layout.lanes" :key="lane.id">
      <line
        v-if="lane.x1 !== null && lane.x2 !== null"
        :x1="lane.x1"
        :y1="lane.y"
        :x2="lane.x2"
        :y2="lane.y"
        class="stroke-zinc-300 dark:stroke-zinc-700"
        stroke-width="1.5"
      />
      <text
        x="16"
        :y="lane.y - 24"
        class="fill-zinc-400 text-[10px] font-bold uppercase tracking-[0.13em] dark:fill-zinc-500"
      >
        {{ lane.label }}
      </text>
    </g>

    <!-- Links, drawn under the nodes so they tuck behind them -->
    <g
      v-for="(link, i) in layout.links"
      :key="`${link.from}-${link.to}-${i}`"
      :data-region="link.ref"
      class="cursor-pointer"
      :class="accent(link.ref)"
    >
      <path
        :d="link.path"
        fill="none"
        stroke="currentColor"
        :stroke-width="on(link.ref) ? 3.5 : 2.5"
        :marker-end="link.arrow ? 'url(#vg-arrow)' : undefined"
        class="transition-[stroke-width] duration-150"
      />
      <text
        v-if="link.label"
        :x="link.labelX"
        :y="link.labelY"
        text-anchor="middle"
        fill="currentColor"
        class="font-mono text-[10.5px] font-semibold"
      >
        {{ link.label }}
      </text>
      <!-- Fat invisible copy of the path, so the link is easy to hit -->
      <path :d="link.path" fill="none" stroke="transparent" stroke-width="20" />
    </g>

    <!-- Nodes -->
    <g
      v-for="node in layout.nodes"
      :key="node.id"
      :data-region="node.ref"
      class="cursor-pointer"
      :class="accent(node.ref)"
    >
      <circle
        v-if="node.kind === 'merge'"
        :cx="node.x"
        :cy="node.y"
        :r="on(node.ref) ? layout.radius + 4 : layout.radius + 2"
        fill="currentColor"
        :class="on(node.ref) ? 'transition-[r] duration-150' : undefined"
      />
      <circle
        v-else
        :cx="node.x"
        :cy="node.y"
        :r="on(node.ref) ? layout.radius + 2 : layout.radius"
        stroke="currentColor"
        stroke-width="3"
        :class="[
          'fill-white dark:fill-zinc-900',
          on(node.ref) ? 'transition-[r] duration-150' : undefined,
        ]"
      />
      <circle
        v-if="node.kind === 'conflict'"
        :cx="node.x"
        :cy="node.y"
        :r="layout.radius + 5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-dasharray="3 3"
      />
      <text
        v-if="node.label"
        :x="node.x"
        :y="node.y + 26"
        text-anchor="middle"
        class="fill-zinc-500 font-mono text-[9.5px] dark:fill-zinc-400"
      >
        {{ node.label }}
      </text>
      <text
        v-if="node.above"
        :x="node.x"
        :y="node.y - 20"
        text-anchor="middle"
        class="fill-zinc-500 font-mono text-[9.5px] dark:fill-zinc-400"
      >
        {{ node.above }}
      </text>
    </g>
  </svg>
</template>
