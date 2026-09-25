<script setup lang="ts">
import type { BundledLanguage, ThemedToken } from 'shiki'
import { computed, nextTick, ref, shallowRef, watch } from 'vue'
import { accentStyles } from '../lib/accents'
import {
  CODE_THEME_CHROME,
  CODE_THEMES,
  type CodeThemeKey,
  getHighlighter,
} from '../lib/highlighter'
import { carryLineKeys } from '../lib/morph'
import { peekPrebuiltTokens, prebuiltTokens } from '../lib/prebuilt-tokens'
import type { ResolvedAnnotation } from '../lib/types'

const props = defineProps<{
  /** Changes whenever code content changes (language + variant) */
  panelKey: string
  /**
   * Panels sharing a morph group (one language's minimal and verbose code) morph into each other:
   * shared lines slide to their new row and only the differing lines fade. A different group, or
   * none, crossfades the whole body as before.
   */
  morphGroup?: string
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

/**
 * What the body renders. `group` keys the whole-body crossfade; `lineKeys` key each row inside it,
 * and a row that keeps its key across a variant switch is the same element gliding to a new place.
 */
interface Shown {
  key: string
  group: string
  lines: ThemedToken[][]
  texts: string[]
  lineKeys: string[]
}

function lineText(line: ThemedToken[]): string {
  return line.map((token) => token.content).join('')
}

let lineSerial = 0
function freshKey(): string {
  return `l${lineSerial++}`
}

function shown(key: string, group: string, lines: ThemedToken[][]): Shown {
  return { key, group, lines, texts: lines.map(lineText), lineKeys: lines.map(freshKey) }
}

const current = shallowRef<Shown | null>(
  firstLines ? shown(props.panelKey, props.morphGroup ?? props.panelKey, firstLines) : null,
)

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Swap in freshly tokenized lines. Same key (a theme recolour) keeps every row as is; a new key in
 * the same morph group carries matched rows over so they move instead of fading; anything else
 * starts a new group, which the outer Transition crossfades. Reduced motion always crossfades.
 */
function show(key: string, lines: ThemedToken[][]) {
  const prev = current.value
  const group = prefersReducedMotion() ? key : (props.morphGroup ?? key)
  if (prev && prev.key === key) {
    current.value = { ...prev, lines, texts: lines.map(lineText) }
    return
  }
  if (!prev || prev.group !== group) {
    current.value = shown(key, group, lines)
    return
  }
  const texts = lines.map(lineText)
  const lineKeys = carryLineKeys(prev.texts, prev.lineKeys, texts, freshKey)
  current.value = { key, group, lines, texts, lineKeys }
  // The outer Transition does not run for a morph, so it cannot report the new layout; report it
  // here instead. The connector remeasure it triggers waits out the row motion.
  nextTick(() => emit('rendered'))
}

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
    if (key === props.panelKey) show(key, prebuilt)
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
  if (key === props.panelKey) show(key, lines)
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
            :key="current.group"
            class="py-3 font-mono text-[13px] [tab-size:4]"
            @mouseleave="emit('hoverLine', null)"
          >
            <!-- Rows keep their key across a minimal <-> verbose switch when the line is shared,
                 so the group slides them to their new row (see show() and lib/morph.ts). -->
            <TransitionGroup tag="div" name="code-morph" class="relative">
              <div
                v-for="(line, index) in current.lines"
                :key="current.lineKeys[index]"
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
            </TransitionGroup>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
