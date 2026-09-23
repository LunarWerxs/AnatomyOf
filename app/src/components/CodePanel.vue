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
import { peekPrebuiltTokens, prebuiltTokens } from '../lib/prebuilt-tokens'
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

/**
 * Snapshot of key + tokens so old content can animate out while new loads. It starts filled when
 * the grammar's build-time tokens are already loaded, as they are for a prerendered page's first
 * view (loadFirstView in app.ts): the server writes the highlighted code into the HTML, and the
 * render that hydrates it has to show the same code, not an empty panel.
 */
const firstLines = peekPrebuiltTokens(props.shikiLang, props.code)
const current = shallowRef<{ key: string; lines: ThemedToken[][] } | null>(
  firstLines ? { key: props.panelKey, lines: firstLines } : null,
)

/**
 * Unhighlighted stand-in: one plain token per line, in the theme's default text
 * color. Shown when Shiki can't be loaded (a dropped chunk request, an offline
 * tab) so the example is still readable instead of the panel rendering empty.
 */
function plainLines(code: string): ThemedToken[][] {
  let offset = 0
  return code.split('\n').map((line) => {
    const token = [{ content: line, offset, color: chrome.value.fg }]
    offset += line.length + 1
    return token
  })
}

async function tokenize() {
  const key = props.panelKey
  let lines: ThemedToken[][]
  // The dark theme's tokens for every shipped example are computed at build time, so the
  // usual first render needs neither Shiki's ~270 kB nor a tokenizing pass on the main thread.
  const prebuilt =
    codeTheme.value === 'dark' ? await prebuiltTokens(props.shikiLang, props.code) : null
  if (prebuilt) {
    // On a repeat visit the tokens are cached and would land before the first paint, making
    // that frame lay out every code line; let the page paint once first (measured: first
    // paint ~130 ms sooner on a warm phone visit).
    if (!current.value) await new Promise((r) => requestAnimationFrame(() => setTimeout(r)))
    if (key === props.panelKey) current.value = { key, lines: prebuilt }
    return
  }
  try {
    const highlighter = await getHighlighter(props.shikiLang, CODE_THEMES[codeTheme.value])
    lines = highlighter.codeToTokens(props.code, {
      lang: props.shikiLang as BundledLanguage,
      theme: CODE_THEMES[codeTheme.value],
    }).tokens
  } catch (error) {
    console.error('[anatomy] highlighting failed, showing plain code', error)
    lines = plainLines(props.code)
  }
  // Same key on a theme toggle => recolor in place (no crossfade); new key => crossfade.
  if (key === props.panelKey) current.value = { key, lines }
}

watch(() => props.panelKey, tokenize, { immediate: !current.value })
watch(codeTheme, tokenize)

/**
 * Every line row is a fixed 24px, so the body height is known and animatable. Before the
 * first tokens land it is taken from the code's own line count, not a 96px placeholder:
 * growing from the placeholder pushed everything under the panel down (CLS 0.19 on a cold
 * phone visit).
 */
const bodyHeight = computed(() => {
  if (collapsed.value) return '0px'
  const lineCount = current.value ? current.value.lines.length : props.code.split('\n').length
  return `${lineCount * 24 + 24}px`
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
        <span :key="fileName" class="ms-3 font-mono text-xs text-zinc-400">{{ fileName }}</span>
      </Transition>
    </div>

    <div class="no-scrollbar overflow-x-auto">
      <div
        class="transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :style="{ height: bodyHeight }"
      >
        <!-- `appear` goes in through v-bind, not as an attribute: for an attribute, Vue's SSR
             compiler wraps the content in an inert <template> until hydration, which would
             blank the prerendered code. Hydrating never animates it either way. -->
        <Transition
          name="code-swap"
          mode="out-in"
          v-bind="{ appear: true }"
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
              class="flex h-6 items-center border-s-2 pe-4 transition-colors duration-75"
              :class="[
                lineClasses(index + 1),
                lineAnnotation.has(index + 1) ? 'cursor-pointer' : '',
              ]"
              @mouseenter="emit('hoverLine', lineAnnotation.get(index + 1)?.id ?? null)"
              @click="onLineClick(index + 1)"
            >
              <span
                class="w-9 shrink-0 select-none pe-3 text-end text-[11px]"
                :class="chrome.gutter"
              >
                {{ index + 1 }}
              </span>
              <span class="me-2 flex w-1.5 shrink-0 justify-center">
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
