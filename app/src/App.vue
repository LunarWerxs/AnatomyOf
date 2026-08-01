<script setup lang="ts">
import { ArrowLeft, Github, Menu } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
import BrandMark from './components/BrandMark.vue'
import { useSmoothScroll } from './composables/useSmoothScroll'
import { defaultLanguage, languages } from './data'

const repoUrl = 'https://github.com/LunarWerxs/anatomyof'

const route = useRoute()
const router = useRouter()

const selectedId = computed({
  get: () => {
    const id = route.params.langId
    return languages.some((lang) => lang.id === id) ? (id as string) : defaultLanguage.id
  },
  set: (id: string) => {
    const variant = route.params.variant === 'verbose' ? 'verbose' : 'minimal'
    router.push(`/${id}/${variant}`)
  },
})

// Eased momentum scrolling for the main content area (softens the sticky cards).
const scrollEl = ref<HTMLElement | null>(null)
const contentEl = ref<HTMLElement | null>(null)
useSmoothScroll(scrollEl, contentEl)

// Off-canvas drawer on mobile; static sidebar on md+.
const sidebarOpen = ref(false)
// Close the drawer whenever the route changes (e.g. a language was picked).
watch(
  () => route.fullPath,
  () => {
    sidebarOpen.value = false
  },
)
</script>

<template>
  <div
    class="flex h-screen overflow-hidden bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100"
  >
    <!-- Mobile backdrop -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/40 md:hidden"
      @click="sidebarOpen = false"
    />

    <AppSidebar
      v-model="selectedId"
      :languages="languages"
      class="fixed inset-y-0 left-0 z-50 shadow-xl transition-transform duration-300 md:static md:z-auto md:translate-x-0 md:shadow-none"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    />

    <main class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <!-- Desktop: floating "view source" link in the top-right corner. Mobile
           has its own copy in the top bar below. -->
      <a
        :href="repoUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View source on GitHub"
        title="View source on GitHub"
        class="fixed right-4 top-4 z-30 hidden cursor-pointer rounded-lg border border-zinc-200 bg-white/70 p-2 text-zinc-500 shadow-sm backdrop-blur transition-colors hover:bg-zinc-100 hover:text-zinc-900 md:flex dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        <Github class="size-5" />
      </a>

      <!-- Mobile top bar -->
      <div
        class="flex shrink-0 items-center gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 md:hidden dark:border-zinc-800 dark:bg-zinc-950"
      >
        <!-- The sidebar carries the same link, but it is a drawer here, so a
             phone would have no visible way back to the studio without this. -->
        <a
          href="https://lunarwerx.com/"
          aria-label="Back to LunarWerx Studios"
          title="Back to LunarWerx Studios"
          class="shrink-0 cursor-pointer rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <ArrowLeft class="size-5" />
        </a>
        <button
          type="button"
          class="cursor-pointer rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Open menu"
          @click="sidebarOpen = true"
        >
          <Menu class="size-5" />
        </button>
        <BrandMark class="size-5 shrink-0 text-zinc-900 dark:text-zinc-100" />
        <span class="truncate text-sm font-extrabold tracking-tight">AnatomyOf</span>
        <a
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source on GitHub"
          title="View source on GitHub"
          class="ml-auto shrink-0 cursor-pointer rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Github class="size-5" />
        </a>
      </div>

      <div ref="scrollEl" class="graph-paper slim-scrollbar min-h-0 flex-1 overflow-y-auto">
        <div ref="contentEl">
          <RouterView />
        </div>
      </div>
    </main>
  </div>
</template>
