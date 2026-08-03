<script setup lang="ts">
/**
 * Timeline: horizontal bars against a shared axis, with optional point markers.
 * Answers "what happens when, and how long does it take".
 *
 * All geometry comes from layoutTimeline(); this file only draws. Accent colour
 * rides on `currentColor` via accents.ts's connector classes, so a region picks
 * up its annotation's colour in both themes without a second palette.
 */
import { computed } from 'vue'
import { accentStyles } from '../../lib/accents'
import type { AccentColor, TimelinePanel } from '../../lib/types'
import { layoutTimeline } from '../../lib/visual'

const props = defineProps<{
  panel: TimelinePanel
  activeId: string | null
  colorMap: Record<string, AccentColor>
}>()

const layout = computed(() => layoutTimeline(props.panel))

const accent = (ref: string) => accentStyles[props.colorMap[ref] ?? 'slate'].connector
const on = (ref: string) => props.activeId === ref
</script>

<template>
  <svg :viewBox="`0 0 ${layout.width} ${layout.height}`" class="w-full" role="img">
    <!-- Axis -->
    <line
      :x1="layout.ticks[0]?.x"
      :y1="layout.axisY"
      :x2="layout.ticks[layout.ticks.length - 1]?.x"
      :y2="layout.axisY"
      class="stroke-zinc-300 dark:stroke-zinc-700"
      stroke-width="1.5"
    />
    <text
      v-for="tick in layout.ticks"
      :key="tick.label"
      :x="tick.x"
      :y="layout.axisY + 18"
      text-anchor="middle"
      class="fill-zinc-400 font-mono text-[9.5px] dark:fill-zinc-500"
    >
      {{ tick.label }}
    </text>

    <!-- Markers -->
    <g
      v-for="marker in layout.markers"
      :key="marker.ref"
      :data-region="marker.ref"
      class="cursor-pointer"
      :class="accent(marker.ref)"
    >
      <line
        :x1="marker.x"
        :y1="marker.y1"
        :x2="marker.x"
        :y2="marker.y2"
        stroke="currentColor"
        :stroke-width="on(marker.ref) ? 3 : 2"
        stroke-dasharray="5 4"
        class="transition-[stroke-width] duration-150"
      />
      <text
        :x="marker.x + 9"
        :y="marker.y2 - 4"
        fill="currentColor"
        class="font-mono text-[10.5px] font-semibold"
      >
        {{ marker.label }}
      </text>
      <!-- Fat invisible copy of the line, so the marker is easy to hit -->
      <rect
        :x="marker.x - 10"
        :y="marker.y1"
        width="20"
        :height="marker.y2 - marker.y1"
        fill="transparent"
      />
    </g>

    <!-- Bars -->
    <g
      v-for="bar in layout.bars"
      :key="bar.id"
      :data-region="bar.ref"
      class="cursor-pointer"
      :class="accent(bar.ref)"
    >
      <text
        :x="140"
        :y="bar.labelY"
        text-anchor="end"
        class="fill-zinc-500 font-mono text-[10.5px] dark:fill-zinc-400"
      >
        {{ bar.label }}
      </text>
      <rect
        :x="bar.x"
        :y="bar.y"
        :width="bar.w"
        height="20"
        rx="5"
        fill="currentColor"
        :fill-opacity="on(bar.ref) ? 1 : 0.8"
        class="transition-[fill-opacity] duration-150"
      />
      <rect
        v-if="on(bar.ref)"
        :x="bar.x"
        :y="bar.y"
        :width="bar.w"
        height="20"
        rx="5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <text
        v-if="bar.note"
        :x="bar.x + bar.w + 10"
        :y="bar.labelY"
        class="fill-zinc-500 font-mono text-[9.5px] dark:fill-zinc-400"
      >
        {{ bar.note }}
      </text>
    </g>
  </svg>
</template>
