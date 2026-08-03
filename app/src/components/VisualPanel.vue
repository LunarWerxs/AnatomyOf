<script setup lang="ts">
/**
 * The Visual variant's panel. Picks a component per template and delegates
 * hover/click from any `[data-region]` inside it, exactly as MockupPanel does,
 * so the callout cards and connector lines need no special case for diagrams.
 */
import { computed, ref } from 'vue'
import type { AccentColor, ResolvedAnnotation, VisualDef } from '../lib/types'
import GraphDiagram from './visual/GraphDiagram.vue'
import TimelineDiagram from './visual/TimelineDiagram.vue'
import TopologyDiagram from './visual/TopologyDiagram.vue'

const props = defineProps<{
  panelKey: string
  visual: VisualDef
  annotations: ResolvedAnnotation[]
  activeId: string | null
}>()

const emit = defineEmits<{
  hoverRegion: [id: string | null]
  openRegion: [id: string]
  rendered: []
}>()

const TEMPLATES = {
  topology: TopologyDiagram,
  graph: GraphDiagram,
  timeline: TimelineDiagram,
} as const

const colorMap = computed<Record<string, AccentColor>>(() =>
  Object.fromEntries(props.annotations.map((a) => [a.id, a.color])),
)

// --- traffic-light easter eggs (mirrors CodePanel / MockupPanel) ---
const collapsed = ref(false)
const party = ref(false)
const shaking = ref(false)

function toggleParty() {
  party.value = !party.value
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

function regionFromEvent(event: Event): string | null {
  const target = event.target as Element | null
  return target?.closest('[data-region]')?.getAttribute('data-region') ?? null
}

function onOver(event: MouseEvent) {
  const id = regionFromEvent(event)
  if (id) emit('hoverRegion', id)
}

function onClick(event: MouseEvent) {
  const id = regionFromEvent(event)
  if (id) emit('openRegion', id)
}
</script>

<template>
  <div
    data-code-panel
    class="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/10 dark:bg-zinc-900 dark:shadow-black/60 dark:ring-white/10"
    :class="shaking ? 'code-shake' : ''"
  >
    <div
      class="flex items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-800"
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
        aria-label="Collapse diagram"
        @click="toggleCollapsed"
      />
      <button
        type="button"
        class="size-3 cursor-pointer rounded-full bg-[#28c840] transition-transform hover:scale-110"
        title="Party mode 🎉"
        aria-label="Toggle party mode"
        @click="toggleParty"
      />
      <div
        class="ml-3 flex-1 truncate rounded bg-white px-3 py-1 text-center font-mono text-[11px] text-zinc-500 dark:bg-zinc-700 dark:text-zinc-300"
      >
        diagram
      </div>
    </div>

    <div
      class="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :style="{ gridTemplateRows: collapsed ? '0fr' : '1fr' }"
    >
      <div class="overflow-hidden">
        <Transition
          name="code-swap"
          mode="out-in"
          :duration="{ enter: 360, leave: 160 }"
          appear
          @after-enter="emit('rendered')"
          @after-appear="emit('rendered')"
        >
          <div
            :key="panelKey"
            class="flex flex-col gap-5 p-4"
            :class="party ? 'mockup-party' : ''"
            @mouseover="onOver"
            @mouseleave="emit('hoverRegion', null)"
            @click="onClick"
          >
            <section v-for="(panel, i) in visual.panels" :key="`${panel.template}-${i}`">
              <h3
                v-if="panel.caption"
                class="mb-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-zinc-400 dark:text-zinc-500"
              >
                {{ panel.caption }}
              </h3>
              <component
                :is="TEMPLATES[panel.template]"
                :panel="panel as never"
                :active-id="activeId"
                :color-map="colorMap"
              />
            </section>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
