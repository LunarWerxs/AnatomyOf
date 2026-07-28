<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'
import { computed, defineAsyncComponent, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'
import { buildAnatomy, buildMockupAnatomy } from '../lib/anatomy'
import type { ExampleVariant, LanguageDef } from '../lib/types'
import AnnotationCard from './AnnotationCard.vue'
import AnnotationDialog from './AnnotationDialog.vue'
import CodePanel from './CodePanel.vue'
import ConnectorLayer from './ConnectorLayer.vue'

// Only the five concept pages render a mockup, but the panel bundles all five
// of them, so it loads on demand instead of riding along on every language page.
const MockupPanel = defineAsyncComponent(() => import('./MockupPanel.vue'))

const props = defineProps<{ language: LanguageDef; variant: ExampleVariant }>()

const emit = defineEmits<{
  setVariant: [variant: ExampleVariant]
}>()

const isMockup = computed(() => !!props.language.mockup)
const mockupKind = computed(() => props.language.mockup ?? 'website')
const resolved = computed(() =>
  props.language.mockup
    ? buildMockupAnatomy(props.language)
    : buildAnatomy(props.language, props.variant),
)
const panelKey = computed(() => `${props.language.id}:${props.variant}`)
const fileName = computed(() => `example${props.language.extensions[0]}`)
const titleNoun = computed(() => props.language.titleNoun ?? 'file')
// Leading space baked in, a whitespace-only text node between </a> and the
// noun gets trimmed by Vue's template compiler, producing "Bashfile".
const nounSuffix = computed(() => (titleNoun.value ? ` ${titleNoun.value}` : ''))

const hoveredId = ref<string | null>(null)
const dialogId = ref<string | null>(null)
const dialogAnnotation = computed(
  () => resolved.value.annotations.find((a) => a.id === dialogId.value) ?? null,
)

const leftAnnotations = computed(() =>
  resolved.value.annotations.filter((a) => a.column === 'left'),
)
const rightAnnotations = computed(() =>
  resolved.value.annotations.filter((a) => a.column === 'right'),
)

const gridEl = useTemplateRef('grid')
const layoutKey = ref(0)
let settleTimer: ReturnType<typeof setTimeout> | undefined

// Remeasure connectors after the card/code transitions have settled.
function scheduleMeasure(delay: number) {
  clearTimeout(settleTimer)
  settleTimer = setTimeout(() => {
    layoutKey.value++
  }, delay)
}

watch(resolved, () => {
  hoveredId.value = null
  dialogId.value = null
  scheduleMeasure(850)
})

function onCodeRendered() {
  scheduleMeasure(700)
}

// On touch devices there is no hover, so tapping a part of the code/mockup
// pins its descriptor open (like a hover) rather than opening the modal; the
// modal is reserved for tapping the descriptor card itself. On pointer devices
// clicking a part opens the modal directly.
const isTouch = ref(false)
const hoverNoneMq = typeof window !== 'undefined' ? window.matchMedia('(hover: none)') : null
if (hoverNoneMq) {
  isTouch.value = hoverNoneMq.matches
  const onChange = (e: MediaQueryListEvent) => {
    isTouch.value = e.matches
  }
  hoverNoneMq.addEventListener('change', onChange)
  onBeforeUnmount(() => hoverNoneMq.removeEventListener('change', onChange))
}

// Hover-driven highlight from the code/mockup panel. Ignored on touch: there is
// no real hover there, and the synthetic mouseenter/mouseleave that a browser
// fires around a tap (especially the mouseleave emitted while scrolling) would
// otherwise clear a pinned descriptor. Keeping this pointer-only makes the pin
// sticky. On touch, hoveredId is changed solely by explicit taps below.
function onPartHover(id: string | null) {
  if (!isTouch.value) hoveredId.value = id
}

// Tapping a part of the code/mockup pins its descriptor (touch) or opens the
// modal directly (pointer devices).
function onPartOpen(id: string) {
  if (isTouch.value) hoveredId.value = id
  else dialogId.value = id
}

// On touch, the descriptor cards' hover is suppressed so a first tap pins and a
// second tap (of the already-pinned card) opens the modal.
function onCardEnter(id: string) {
  if (!isTouch.value) hoveredId.value = id
}
function onCardLeave() {
  if (!isTouch.value) hoveredId.value = null
}
function onCardOpen(id: string) {
  if (!isTouch.value || hoveredId.value === id) dialogId.value = id
  else hoveredId.value = id
}

function setVariant(value: unknown) {
  if ((value === 'minimal' || value === 'verbose') && value !== props.variant) {
    emit('setVariant', value)
  }
}
</script>

<template>
  <div class="mx-auto max-w-[1400px] px-4 py-4 md:px-8 md:py-10">
    <Transition name="title-swap" mode="out-in" :duration="260">
      <h1
        :key="language.id"
        class="text-center text-3xl font-black uppercase tracking-tight text-zinc-900 md:text-5xl dark:text-zinc-50"
      >
        Anatomy of {{ language.article }}
        <a
          :href="language.officialUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group underline decoration-transparent decoration-4 underline-offset-8 transition-colors hover:decoration-current"
          :style="{ color: language.accentHex }"
        >{{ language.titleWord }}<ExternalLink
            class="mb-4 ml-1 inline size-4 opacity-0 transition-opacity group-hover:opacity-70"
          /></a>{{ nounSuffix }}
      </h1>
    </Transition>
    <div v-if="!isMockup" class="mt-4 flex justify-center md:mt-8">
      <ToggleGroupRoot
        :model-value="variant"
        type="single"
        class="relative flex w-48 rounded-lg border border-zinc-200 bg-white p-0.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
        aria-label="Example size"
        @update:model-value="setVariant"
      >
        <!-- sliding indicator that animates between the two options -->
        <span
          class="absolute inset-y-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-md bg-zinc-900 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none dark:bg-zinc-100"
          :style="{ transform: variant === 'verbose' ? 'translateX(100%)' : 'translateX(0)' }"
          aria-hidden="true"
        />
        <ToggleGroupItem
          v-for="option in ['minimal', 'verbose'] as const"
          :key="option"
          :value="option"
          class="relative z-10 flex-1 cursor-pointer rounded-md px-4 py-1.5 text-center text-xs font-semibold capitalize transition-colors duration-200 data-[state=off]:text-zinc-500 data-[state=on]:text-white dark:data-[state=off]:text-zinc-400 dark:data-[state=on]:text-zinc-900"
        >
          {{ option }}
        </ToggleGroupItem>
      </ToggleGroupRoot>
    </div>

    <div ref="grid" class="relative mt-5 md:mt-10">
      <ConnectorLayer
        :container="gridEl"
        :annotations="resolved.annotations"
        :active-id="hoveredId"
        :layout-key="layoutKey"
        :anchor-mode="isMockup ? 'region' : 'code'"
      />

      <div
        class="relative z-10 grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(220px,1fr)_minmax(0,2.4fr)_minmax(220px,1fr)] xl:gap-x-16"
      >
        <TransitionGroup
          tag="div"
          name="cards-left"
          :duration="{ enter: 900, leave: 200 }"
          class="relative order-2 flex flex-col gap-3 xl:order-1 xl:sticky xl:top-8 xl:self-start xl:pt-10"
        >
          <AnnotationCard
            v-for="(annotation, i) in leftAnnotations"
            :key="`${language.id}:${annotation.id}`"
            :annotation="annotation"
            :active="hoveredId === annotation.id"
            :style="{ '--stagger': i }"
            @enter="onCardEnter(annotation.id)"
            @leave="onCardLeave"
            @open="onCardOpen(annotation.id)"
          />
        </TransitionGroup>

        <div class="order-1 min-w-0 xl:order-2">
          <MockupPanel
            v-if="isMockup"
            :panel-key="panelKey"
            :which="mockupKind"
            :annotations="resolved.annotations"
            :active-id="hoveredId"
            @hover-region="onPartHover"
            @open-region="onPartOpen"
            @rendered="onCodeRendered"
          />
          <CodePanel
            v-else
            :panel-key="panelKey"
            :file-name="fileName"
            :shiki-lang="language.shikiLang"
            :code="resolved.code"
            :annotations="resolved.annotations"
            :active-id="hoveredId"
            @hover-line="onPartHover"
            @open-line="onPartOpen"
            @rendered="onCodeRendered"
          />
        </div>

        <TransitionGroup
          tag="div"
          name="cards-right"
          :duration="{ enter: 900, leave: 200 }"
          class="relative order-3 flex flex-col gap-3 xl:sticky xl:top-8 xl:self-start xl:pt-10"
        >
          <AnnotationCard
            v-for="(annotation, i) in rightAnnotations"
            :key="`${language.id}:${annotation.id}`"
            :annotation="annotation"
            :active="hoveredId === annotation.id"
            :style="{ '--stagger': i }"
            @enter="onCardEnter(annotation.id)"
            @leave="onCardLeave"
            @open="onCardOpen(annotation.id)"
          />
        </TransitionGroup>
      </div>
    </div>

    <Transition name="fade-swap" mode="out-in" :duration="260">
      <div
        :key="language.id"
        class="mx-auto mt-6 max-w-3xl rounded-lg border-2 border-slate-300 bg-slate-100/90 px-5 py-3 text-center text-sm text-slate-700 shadow-sm md:mt-10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
      >
        {{ language.note }}
      </div>
    </Transition>

    <AnnotationDialog
      :annotation="dialogAnnotation"
      :shiki-lang="language.shikiLang"
      @close="dialogId = null"
    />
  </div>
</template>
