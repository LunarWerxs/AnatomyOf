<script setup lang="ts">
import { ExternalLink, X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { computed } from 'vue'
import { accentStyles } from '../lib/accents'
import { splitInline } from '../lib/inline'
import type { ResolvedAnnotation } from '../lib/types'
import CodeChip from './CodeChip.vue'

const props = defineProps<{
  annotation: ResolvedAnnotation | null
  shikiLang: string
}>()

const emit = defineEmits<{
  close: []
}>()

const paragraphs = computed(() =>
  (props.annotation?.details ?? '')
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean),
)

function formatRange([start, end]: [number, number]): string {
  return start === end ? `line ${start}` : `lines ${start}-${end}`
}
</script>

<template>
  <DialogRoot :open="annotation !== null" @update:open="(open) => !open && emit('close')">
    <DialogPortal>
      <DialogOverlay data-dialog-overlay class="fixed inset-0 z-40 bg-black/25 dark:bg-black/40" />
      <!-- Offset by the sidebar width so the modal centers over the content
           area (the code/mockup), not the whole viewport. -->
      <DialogContent
        data-dialog-content
        class="slim-scrollbar fixed inset-y-0 left-0 right-0 z-50 m-auto h-fit max-h-[85vh] w-[min(92vw,560px)] overflow-y-auto rounded-xl border border-zinc-200 bg-white p-6 shadow-2xl md:left-60 dark:border-zinc-700 dark:bg-zinc-900"
      >
        <template v-if="annotation">
          <div class="flex items-center gap-2.5 pr-8">
            <span
              class="size-2.5 shrink-0 rounded-full"
              :class="accentStyles[annotation.color].marker"
            />
            <DialogTitle
              class="text-base font-extrabold uppercase tracking-wide text-zinc-900 dark:text-zinc-100"
            >
              {{ annotation.title }}
            </DialogTitle>
          </div>

          <DialogDescription class="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <template v-for="(seg, i) in splitInline(annotation.body)" :key="i">
              <CodeChip v-if="seg.code" :text="seg.text" :lang="shikiLang" />
              <template v-else>{{ seg.text }}</template>
            </template>
          </DialogDescription>

          <div class="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p v-for="(para, p) in paragraphs" :key="p">
              <template v-for="(seg, i) in splitInline(para)" :key="i">
                <CodeChip v-if="seg.code" :text="seg.text" :lang="shikiLang" />
                <template v-else>{{ seg.text }}</template>
              </template>
            </p>
          </div>

          <a
            v-if="annotation.learnMore"
            :href="annotation.learnMore"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-600 transition-colors hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
          >
            Learn more <ExternalLink class="size-3.5" />
          </a>

          <div v-if="annotation.ranges.length" class="mt-5 flex flex-wrap items-center gap-1.5">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              In this example:
            </span>
            <span
              v-for="range in annotation.ranges"
              :key="`${range[0]}-${range[1]}`"
              class="rounded-full border border-zinc-200 px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
            >
              {{ formatRange(range) }}
            </span>
          </div>

          <DialogClose
            class="absolute right-3 top-3 cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            aria-label="Close"
          >
            <X class="size-4" />
          </DialogClose>
        </template>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
