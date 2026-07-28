<script setup lang="ts">
import { computed } from 'vue'
import { accentStyles } from '../lib/accents'
import type { ResolvedAnnotation } from '../lib/types'

const props = defineProps<{
  annotation: ResolvedAnnotation
  active: boolean
}>()

const emit = defineEmits<{
  enter: []
  leave: []
  open: []
}>()

const style = computed(() => accentStyles[props.annotation.color])
</script>

<template>
  <button
    type="button"
    :data-annotation-card="annotation.id"
    class="w-full cursor-pointer rounded-lg border-2 px-3 py-2 text-left text-[13px] leading-snug shadow-sm transition-all duration-100"
    :class="[
      style.card,
      active
        ? `${style.ring} -translate-y-px shadow-md ring-2 ring-offset-1 ring-offset-white dark:ring-offset-zinc-950`
        : 'hover:shadow-md',
    ]"
    @mouseenter="emit('enter')"
    @mouseleave="emit('leave')"
    @click="emit('open')"
  >
    <!-- On mobile the card shows just the title; the body (and its colon) are
         hidden to keep the stacked list compact. The full body is in the modal. -->
    <span class="font-bold uppercase tracking-wide">{{ annotation.title }}<span class="hidden md:inline">:</span></span>
    <span class="ml-1 hidden opacity-85 md:inline">{{ annotation.body }}</span>
  </button>
</template>
