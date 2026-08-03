<script setup lang="ts">
/**
 * Topology: boxes grouped into dashed zones, joined by labelled arrows.
 * Answers "what lives where, and which command moves it".
 *
 * All geometry comes from layoutTopology(); this file only draws. Accent colour
 * rides on `currentColor` via accents.ts's connector classes, so a region picks
 * up its annotation's colour in both themes without a second palette.
 */
import { computed } from 'vue'
import { accentStyles } from '../../lib/accents'
import type { AccentColor, TopologyPanel } from '../../lib/types'
import { layoutTopology } from '../../lib/visual'

const props = defineProps<{
  panel: TopologyPanel
  activeId: string | null
  colorMap: Record<string, AccentColor>
}>()

const layout = computed(() => layoutTopology(props.panel))

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
        id="vt-arrow"
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

    <!-- Zones -->
    <g v-for="zone in layout.zones" :key="zone.id">
      <rect
        :x="zone.x"
        :y="zone.y"
        :width="zone.w"
        :height="zone.h"
        rx="12"
        class="fill-zinc-500/[0.04] stroke-zinc-300 dark:stroke-zinc-700"
        stroke-width="1.5"
        stroke-dasharray="5 4"
      />
      <text
        :x="zone.x + 14"
        :y="zone.y - 8"
        class="fill-zinc-400 text-[10px] font-bold uppercase tracking-[0.13em] dark:fill-zinc-500"
      >
        {{ zone.label }}
      </text>
    </g>

    <!-- Edges, drawn under the nodes so they tuck behind the boxes -->
    <g
      v-for="(edge, i) in layout.edges"
      :key="`${edge.from}-${edge.to}-${i}`"
      :data-region="edge.ref"
      class="cursor-pointer"
      :class="accent(edge.ref)"
    >
      <path
        :d="edge.path"
        fill="none"
        stroke="currentColor"
        :stroke-width="on(edge.ref) ? 3.5 : 2"
        :stroke-dasharray="edge.dashed ? '5 4' : undefined"
        marker-end="url(#vt-arrow)"
        class="transition-[stroke-width] duration-150"
      />
      <text
        v-if="edge.label"
        :x="edge.labelX"
        :y="edge.labelY"
        :text-anchor="edge.labelAnchor"
        fill="currentColor"
        class="font-mono text-[10.5px] font-semibold"
        :class="on(edge.ref) ? 'opacity-100' : 'opacity-90'"
      >
        {{ edge.label }}
      </text>
      <!-- Fat invisible copy of the path, so the arrow is easy to hit -->
      <path :d="edge.path" fill="none" stroke="transparent" stroke-width="20" />
    </g>

    <!-- Nodes -->
    <g
      v-for="node in layout.nodes"
      :key="node.id"
      :data-region="node.ref"
      class="cursor-pointer"
      :class="accent(node.ref)"
    >
      <rect
        :x="node.x"
        :y="node.y"
        :width="node.w"
        :height="node.h"
        :rx="node.pill ? node.h / 2 : 9"
        :fill="on(node.ref) ? 'currentColor' : undefined"
        :fill-opacity="on(node.ref) ? 0.15 : undefined"
        :class="[
          on(node.ref) ? 'stroke-current' : 'fill-white stroke-zinc-300 dark:fill-zinc-900 dark:stroke-zinc-700',
        ]"
        :stroke-width="on(node.ref) ? 2.5 : 1.5"
        class="transition-[stroke-width] duration-150"
      />

      <template v-if="node.pill">
        <text
          :x="node.x + node.w / 2"
          :y="node.y + node.h / 2 + 4"
          text-anchor="middle"
          class="fill-zinc-600 font-mono text-[10.5px] dark:fill-zinc-300"
        >
          {{ node.title }}
        </text>
      </template>

      <template v-else>
        <text
          :x="node.x + 14"
          :y="node.y + 26"
          class="fill-zinc-900 text-[12.5px] font-bold dark:fill-zinc-50"
        >
          {{ node.title }}
        </text>
        <text
          v-if="node.sub"
          :x="node.x + 14"
          :y="node.y + 43"
          class="fill-zinc-500 font-mono text-[10.5px] dark:fill-zinc-400"
        >
          {{ node.sub }}
        </text>

        <!-- Rows carry their own annotation when given one (a matrix leg,
             an ordered step), otherwise they belong to the node. -->
        <g
          v-for="(row, r) in node.rows ?? []"
          :key="row.label"
          :data-region="row.ref ?? node.ref"
          :class="row.ref ? accent(row.ref) : undefined"
        >
          <rect
            :x="node.x + 8"
            :y="node.rowYs[r] - 12"
            :width="node.w - 16"
            :height="16"
            rx="4"
            :fill="row.ref && on(row.ref) ? 'currentColor' : 'transparent'"
            :fill-opacity="row.ref && on(row.ref) ? 0.22 : 0"
          />
          <circle
            v-if="row.ok"
            :cx="node.x + 20"
            :cy="node.rowYs[r] - 4"
            r="4.5"
            class="fill-emerald-500"
          />
          <text
            :x="node.x + (row.ok ? 32 : 14)"
            :y="node.rowYs[r]"
            class="fill-zinc-600 font-mono text-[10.5px] dark:fill-zinc-300"
          >
            {{ row.label }}
          </text>
        </g>
      </template>
    </g>
  </svg>
</template>
