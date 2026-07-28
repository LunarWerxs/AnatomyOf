<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AccentColor, ResolvedAnnotation } from '../lib/types'
import DashboardMockup from './mockups/DashboardMockup.vue'
import EmailMockup from './mockups/EmailMockup.vue'
import MobileAppMockup from './mockups/MobileAppMockup.vue'
import SettingsMockup from './mockups/SettingsMockup.vue'
import WebsiteMockup from './mockups/WebsiteMockup.vue'

const props = defineProps<{
  panelKey: string
  which: 'website' | 'settings' | 'mobileapp' | 'dashboard' | 'email'
  annotations: ResolvedAnnotation[]
  activeId: string | null
}>()

const emit = defineEmits<{
  hoverRegion: [id: string | null]
  openRegion: [id: string]
  rendered: []
}>()

const mockupComponent = computed(() => {
  if (props.which === 'settings') return SettingsMockup
  if (props.which === 'mobileapp') return MobileAppMockup
  if (props.which === 'dashboard') return DashboardMockup
  if (props.which === 'email') return EmailMockup
  return WebsiteMockup
})

/** The phone mockup renders centered on a plain stage. */
const isPhone = computed(() => props.which === 'mobileapp')

const url = computed(() => {
  if (props.which === 'settings') return 'app.example.com/settings'
  if (props.which === 'mobileapp') return 'Acme, iOS / Android'
  if (props.which === 'dashboard') return 'app.example.com/dashboard'
  if (props.which === 'email') return 'mail.example.com'
  return 'acme.example.com'
})

const colorMap = computed<Record<string, AccentColor>>(() =>
  Object.fromEntries(props.annotations.map((a) => [a.id, a.color])),
)

// --- traffic-light easter eggs (mirrors CodePanel) ---
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
  const target = event.target as HTMLElement | null
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
    <!-- Browser chrome -->
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
        aria-label="Collapse mockup"
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
        {{ url }}
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
            :class="[
              isPhone ? 'flex justify-center bg-zinc-100 p-6 dark:bg-zinc-950' : 'p-3',
              party ? 'mockup-party' : '',
            ]"
            @mouseover="onOver"
            @mouseleave="emit('hoverRegion', null)"
            @click="onClick"
          >
            <component :is="mockupComponent" :active-id="activeId" :color-map="colorMap" />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
