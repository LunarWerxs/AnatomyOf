<script setup lang="ts">
import { computed } from 'vue'
import { accentStyles } from '../lib/accents'
import type { AccentColor } from '../lib/types'

const props = defineProps<{
  id: string
  activeId: string | null
  color: AccentColor
  /** Render as inline-block instead of block (nav items, buttons, chips) */
  inline?: boolean
  /** Short label for the corner badge (defaults to the id) */
  label?: string
}>()

const active = computed(() => props.activeId === props.id)
const style = computed(() => accentStyles[props.color])
</script>

<template>
  <!-- Hover/click are handled by delegation in MockupPanel via [data-region]. -->
  <component
    :is="inline ? 'span' : 'div'"
    :data-region="id"
    class="relative cursor-pointer rounded-md ring-2 transition-[color,background-color,box-shadow] duration-150"
    :class="[
      inline ? 'inline-block align-middle' : 'block',
      active ? `${style.lineBg} ${style.ring}` : 'ring-transparent',
    ]"
  >
    <slot />
    <span
      v-if="active"
      class="pointer-events-none absolute -top-2.5 left-1.5 z-10 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow"
      :class="style.marker"
    >
      {{ label ?? id }}
    </span>
  </component>
</template>
