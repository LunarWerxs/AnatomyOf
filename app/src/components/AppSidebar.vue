<script setup lang="ts">
import { useColorMode, useStorage } from '@vueuse/core'
import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowLeft,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from 'lucide-vue-next'
import { TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { computed, nextTick, ref } from 'vue'
import { comingSoon } from '../data/comingSoon'
import type { LanguageMeta } from '../lib/types'
import BrandMark from './BrandMark.vue'
import SuggestDialog from './SuggestDialog.vue'

const props = defineProps<{ languages: LanguageMeta[] }>()

const model = defineModel<string>({ required: true })

const suggestOpen = ref(false)

const query = ref('')
const q = computed(() => query.value.trim().toLowerCase())

function matches(name: string, ext: string | string[]): boolean {
  if (!q.value) return true
  const hay = `${name} ${Array.isArray(ext) ? ext.join(' ') : ext}`.toLowerCase()
  return hay.includes(q.value)
}

/**
 * Sidebar order for the Languages group. 'popularity' is the default and simply
 * keeps the order the list arrives in (data/index.ts ranks it); 'name' sorts A-Z.
 * Only languages are re-sorted: concepts keep their curated order.
 */
type SortMode = 'popularity' | 'name'
const sortMode = useStorage<SortMode>('anatomy-lang-sort', 'popularity')

function toggleSort() {
  sortMode.value = sortMode.value === 'popularity' ? 'name' : 'popularity'
}

const languageItems = computed(() => {
  const items = props.languages
    .filter((lang) => (lang.category ?? 'language') === 'language')
    .filter((lang) => matches(lang.name, lang.extensions))
  return sortMode.value === 'name'
    ? [...items].sort((a, b) => a.name.localeCompare(b.name, 'en'))
    : items
})
const conceptItems = computed(() =>
  props.languages
    .filter((lang) => lang.category === 'concept')
    .filter((lang) => matches(lang.name, lang.extensions)),
)
const comingItems = computed(() => comingSoon.filter((item) => matches(item.name, item.ext)))

const noMatches = computed(
  () =>
    q.value &&
    !languageItems.value.length &&
    !conceptItems.value.length &&
    !comingItems.value.length,
)

// Fade the footer's top border once the list is scrolled to the bottom.
const scrollAtBottom = ref(true)
function onScroll(event: Event) {
  const el = event.target as HTMLElement
  scrollAtBottom.value = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
}

const mode = useColorMode({ storageKey: 'anatomy-theme', initialValue: 'dark' })

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => unknown) => { finished: Promise<void> }
}

function toggleTheme() {
  const next = mode.value === 'dark' ? 'light' : 'dark'
  const doc = document as ViewTransitionDocument
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // A view transition crossfades one snapshot of the page on the compositor.
  // Where it isn't available, switch instantly rather than falling back to
  // transitioning every element, which is the stutter this replaced.
  if (reduced || typeof doc.startViewTransition !== 'function') {
    mode.value = next
    return
  }

  // The DOM change has to happen inside the callback, and useColorMode writes the
  // class in a watcher, so wait for Vue to flush before the snapshot is taken.
  doc.startViewTransition(async () => {
    mode.value = next
    await nextTick()
  })
}
</script>

<template>
  <aside
    class="flex h-full w-60 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
  >
    <!-- Up to the studio. AnatomyOf serves from a lunarwerx.com subdomain, and
         this row is the only route back to the parent site. It sits above the
         product mark rather than beside it so the hierarchy reads in the order
         it actually is: studio, then product. -->
    <a
      href="https://lunarwerx.com/"
      class="flex items-center gap-1.5 px-4 pt-3 text-[11px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
    >
      <ArrowLeft class="size-3.5 shrink-0" />
      LunarWerx Studios
    </a>

    <div class="flex items-center gap-2.5 px-4 pb-3.5 pt-2">
      <BrandMark class="size-5 shrink-0 text-zinc-900 dark:text-zinc-100" />
      <div class="min-w-0">
        <div class="truncate text-sm font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          AnatomyOf
        </div>
        <div class="text-[11px] text-zinc-500 dark:text-zinc-400">interactive edition</div>
      </div>
      <button
        type="button"
        class="ml-auto cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        :aria-label="mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
        @click="toggleTheme"
      >
        <Moon v-if="mode === 'dark'" class="size-4" />
        <Sun v-else class="size-4" />
      </button>
    </div>

    <div class="slim-scrollbar flex-1 overflow-y-auto px-2 pb-3" @scroll="onScroll">
      <!-- Search + sort scroll away with the list -->
      <div class="flex items-stretch gap-1.5 px-1 pb-2 pt-1">
        <div class="relative min-w-0 flex-1">
          <Search
            class="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-zinc-400"
          />
          <input
            v-model="query"
            type="text"
            placeholder="Search…"
            aria-label="Search file types"
            class="w-full rounded-md border border-zinc-200 bg-zinc-50 py-1.5 pl-8 pr-7 text-[13px] text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500"
          />
          <button
            v-if="query"
            type="button"
            aria-label="Clear search"
            class="absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer rounded p-0.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            @click="query = ''"
          >
            <X class="size-3.5" />
          </button>
        </div>
        <!-- Order of the Languages group; the icon shows the order in effect -->
        <button
          type="button"
          class="flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 px-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          :aria-label="
            sortMode === 'popularity'
              ? 'Languages sorted by popularity. Sort A to Z instead'
              : 'Languages sorted A to Z. Sort by popularity instead'
          "
          :title="
            sortMode === 'popularity'
              ? 'Sorted by popularity. Click for A-Z'
              : 'Sorted A-Z. Click for popularity'
          "
          @click="toggleSort"
        >
          <ArrowDownWideNarrow v-if="sortMode === 'popularity'" class="size-3.5" />
          <ArrowDownAZ v-else class="size-3.5" />
        </button>
      </div>

      <TabsRoot v-model="model" orientation="vertical">
        <TabsList class="flex flex-col gap-0.5" aria-label="Languages and concepts">
          <div
            v-if="languageItems.length"
            class="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
          >
            Languages
          </div>
          <TabsTrigger
            v-for="lang in languageItems"
            :key="lang.id"
            :value="lang.id"
            class="group flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-1 text-left text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 data-[state=active]:bg-zinc-900 data-[state=active]:text-white dark:text-zinc-400 dark:hover:bg-zinc-800 dark:data-[state=active]:bg-zinc-100 dark:data-[state=active]:text-zinc-900"
          >
            <span
              class="size-1.5 shrink-0 rounded-full"
              :style="{ backgroundColor: lang.accentHex }"
            />
            {{ lang.name }}
            <span
              class="ml-auto text-[10px] text-zinc-400 group-data-[state=active]:text-zinc-400 dark:text-zinc-500 dark:group-data-[state=active]:text-zinc-500"
            >
              {{ lang.extensions.join(' ') }}
            </span>
          </TabsTrigger>

          <div
            v-if="conceptItems.length"
            class="mt-4 px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
          >
            Concepts
          </div>
          <TabsTrigger
            v-for="lang in conceptItems"
            :key="lang.id"
            :value="lang.id"
            class="group flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-1 text-left text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 data-[state=active]:bg-zinc-900 data-[state=active]:text-white dark:text-zinc-400 dark:hover:bg-zinc-800 dark:data-[state=active]:bg-zinc-100 dark:data-[state=active]:text-zinc-900"
          >
            <span
              class="size-1.5 shrink-0 rounded-full"
              :style="{ backgroundColor: lang.accentHex }"
            />
            {{ lang.name }}
          </TabsTrigger>
        </TabsList>
      </TabsRoot>

      <div
        v-if="comingItems.length"
        class="mt-5 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
      >
        Coming soon
      </div>
      <ul class="mt-1.5 flex flex-col gap-0.5">
        <li
          v-for="item in comingItems"
          :key="item.name + item.ext"
          class="flex items-center gap-2.5 rounded-md px-3 py-1 text-[13px] text-zinc-400 dark:text-zinc-600"
        >
          <span class="size-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          {{ item.name }}
          <span class="ml-auto text-[10px] text-zinc-300 dark:text-zinc-700">{{ item.ext }}</span>
        </li>
        <li>
          <button
            type="button"
            class="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-1 text-left text-[13px] text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-sky-600 dark:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-sky-400"
            @click="suggestOpen = true"
          >
            <!-- Icon centered in a 6px-wide slot (same footprint as the row
                 dots) so the label aligns with the language/coming-soon text;
                 shrink-0 keeps the sparkle at its 10px size, overflowing the
                 slot symmetrically rather than being squished to fit. -->
            <span class="flex w-1.5 shrink-0 justify-center">
              <Sparkles class="size-2.5 shrink-0" />
            </span>
            Suggest one…
          </button>
        </li>
      </ul>

      <p v-if="noMatches" class="px-3 py-6 text-center text-[13px] text-zinc-400">
        No matches for “{{ query }}”.
      </p>
    </div>

    <!-- Company credit; its top border fades once the list is scrolled to the end -->
    <a
      href="https://lunarwerx.com/"
      target="_blank"
      rel="noopener noreferrer"
      title="LunarWerx Studios, Digital Dreams & AI Solutions"
      class="group flex items-center gap-2 border-t px-4 py-2.5 transition-colors duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
      :class="
        scrollAtBottom ? 'border-transparent' : 'border-zinc-200 dark:border-zinc-800'
      "
    >
      <img src="/lunarwerx.webp" alt="LunarWerx" class="size-4 shrink-0 rounded" />
      <span class="text-[11px] leading-tight">
        <span class="text-zinc-400 dark:text-zinc-500">Built by</span>
        <span class="font-bold text-zinc-600 dark:text-zinc-300">LunarWerx</span>
      </span>
    </a>

    <SuggestDialog v-model:open="suggestOpen" />
  </aside>
</template>
