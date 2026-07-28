<script setup lang="ts">
import type { BundledLanguage, ThemedToken } from 'shiki'
import { computed, ref, shallowRef, watch } from 'vue'
import { accentStyles } from '../lib/accents'
import {
  CODE_THEME_CHROME,
  CODE_THEMES,
  type CodeThemeKey,
  getHighlighter,
} from '../lib/highlighter'
import type { ResolvedAnnotation } from '../lib/types'

const props = defineProps<{
  /** Changes whenever code content changes (language + variant) */
  panelKey: string
  fileName: string
  shikiLang: string
  code: string
  annotations: ResolvedAnnotation[]
  activeId: string | null
}>()

const emit = defineEmits<{
  hoverLine: [id: string | null]
  openLine: [id: string]
  rendered: []
}>()

// --- traffic-light easter eggs ---
const codeTheme = ref<CodeThemeKey>('dark')
const collapsed = ref(false)
const shaking = ref(false)
const chrome = computed(() => CODE_THEME_CHROME[codeTheme.value])

function toggleCodeTheme() {
  codeTheme.value = codeTheme.value === 'dark' ? 'light' : 'dark'
}
function toggleCollapsed() {
  collapsed.value = !collapsed.value
}
function nudge() {
  shaking.value = true
  window.setTimeout(() => {
    shaking.value = false
  }, 450)
}

/** Snapshot of key + tokens so old content can animate out while new loads. */
const current = shallowRef<{ key: string; lines: ThemedToken[][] } | null>(null)

async function tokenize() {
  const key = props.panelKey
  const highlighter = await getHighlighter()
  const { tokens } = highlighter.codeToTokens(props.code, {
    lang: props.shikiLang as BundledLanguage,
    theme: CODE_THEMES[codeTheme.value],
  })
  // Same key on a theme toggle => recolor in place (no crossfade); new key => crossfade.
  if (key === props.panelKey) current.value = { key, lines: tokens }
}

watch(() => props.panelKey, tokenize, { immediate: true })
watch(codeTheme, tokenize)

/** Every line row is a fixed 24px, so the body height is known and animatable. */
const bodyHeight = computed(() => {
  if (collapsed.value) return '0px'
  return current.value ? `${current.value.lines.length * 24 + 24}px` : '96px'
})

function rangeSpan(annotation: ResolvedAnnotation): number {
  return annotation.ranges.reduce((sum, [start, end]) => sum + (end - start + 1), 0)
}

/** Innermost (smallest) annotation covering each line, used for hover + gutter markers. */
const lineAnnotation = computed(() => {
  const map = new Map<number, ResolvedAnnotation>()
  for (const annotation of props.annotations) {
    for (const [start, end] of annotation.ranges) {
      for (let line = start; line <= end; line++) {
        const existing = map.get(line)
        if (!existing || rangeSpan(annotation) < rangeSpan(existing)) {
          map.set(line, annotation)
        }
      }
    }
  }
  return map
})

const activeAnnotation = computed(
  () => props.annotations.find((a) => a.id === props.activeId) ?? null,
)

const activeLines = computed(() => {
  const lines = new Set<number>()
  if (!activeAnnotation.value) return lines
  for (const [start, end] of activeAnnotation.value.ranges) {
    for (let line = start; line <= end; line++) lines.add(line)
  }
  return lines
})

function lineClasses(line: number): string {
  const active = activeAnnotation.value
  if (active && activeLines.value.has(line)) {
    const style = accentStyles[active.color]
    return `${style.lineBg} ${style.lineBorder}`
  }
  return 'border-transparent'
}

function onLineClick(line: number) {
  const annotation = lineAnnotation.value.get(line)
  if (annotation) emit('openLine', annotation.id)
}
</script>

<template>
  <div
    data-code-panel
    class="overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/40 transition-colors duration-300 dark:shadow-black/60 dark:ring-white/10"
    :class="shaking ? 'code-shake' : ''"
    :style="{ backgroundColor: chrome.bg }"
  >
    <div
      class="flex items-center gap-2 border-b px-4 py-2.5"
      :class="codeTheme === 'dark' ? 'border-white/5' : 'border-black/10'"
    >
      <button
        type="button"
        class="size-3 cursor-pointer rounded-full bg-[#ff5f57] transition-transform hover:scale-110"
        title="Don’t close me"
        aria-label="Nudge"
        @click="nudge"
      />
      <button
        type="button"
        class="size-3 cursor-pointer rounded-full bg-[#febc2e] transition-transform hover:scale-110"
        title="Minimise"
        aria-label="Collapse code"
        @click="toggleCollapsed"
      />
      <button
        type="button"
        class="size-3 cursor-pointer rounded-full bg-[#28c840] transition-transform hover:scale-110"
        title="Lights?"
        aria-label="Toggle code theme"
        @click="toggleCodeTheme"
      />
      <Transition name="fade-swap" mode="out-in" :duration="250">
        <span :key="fileName" class="ml-3 font-mono text-xs text-zinc-400">{{ fileName }}</span>
      </Transition>
    </div>

    <div class="no-scrollbar overflow-x-auto">
      <div
        class="transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :style="{ height: bodyHeight }"
      >
        <Transition
          name="code-swap"
          mode="out-in"
          appear
          :duration="{ enter: 360, leave: 160 }"
          @after-enter="emit('rendered')"
          @after-appear="emit('rendered')"
        >
          <div
            v-if="current"
            :key="current.key"
            class="py-3 font-mono text-[13px] [tab-size:4]"
            @mouseleave="emit('hoverLine', null)"
          >
            <div
              v-for="(line, index) in current.lines"
              :key="index"
              :data-code-line="index + 1"
              class="flex h-6 items-center border-l-2 pr-4 transition-colors duration-75"
              :class="[
                lineClasses(index + 1),
                lineAnnotation.has(index + 1) ? 'cursor-pointer' : '',
              ]"
              @mouseenter="emit('hoverLine', lineAnnotation.get(index + 1)?.id ?? null)"
              @click="onLineClick(index + 1)"
            >
              <span
                class="w-9 shrink-0 select-none pr-3 text-right text-[11px]"
                :class="chrome.gutter"
              >
                {{ index + 1 }}
              </span>
              <span class="mr-2 flex w-1.5 shrink-0 justify-center">
                <span
                  v-if="lineAnnotation.has(index + 1)"
                  class="size-1.5 rounded-full opacity-70"
                  :class="accentStyles[lineAnnotation.get(index + 1)!.color].marker"
                />
              </span>
              <code class="whitespace-pre leading-6">
                <span v-for="(token, t) in line" :key="t" :style="{ color: token.color }">{{
                  token.content
                }}</span>
              </code>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
