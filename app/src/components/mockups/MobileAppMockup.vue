<script setup lang="ts">
import type { AccentColor } from '../../lib/types'
import MockupRegion from '../MockupRegion.vue'

defineProps<{
  activeId: string | null
  colorMap: Record<string, AccentColor>
}>()
</script>

<template>
  <!-- Phone frame -->
  <div
    class="relative h-150 w-75 shrink-0 overflow-hidden rounded-[2.25rem] border-10 border-zinc-900 bg-zinc-50 shadow-xl dark:border-black dark:bg-zinc-900"
  >
    <div class="flex h-full flex-col text-zinc-800 dark:text-zinc-100">
      <!-- Status bar -->
      <MockupRegion id="status-bar" :active-id="activeId" :color="colorMap['status-bar'] ?? 'slate'">
        <div
          class="flex h-7 items-center justify-between px-5 pt-1 text-caption font-semibold text-zinc-900 dark:text-zinc-100"
        >
          <span>9:41</span>
          <span class="flex items-center gap-1 text-micro">
            <span>▮▮▮</span><span>Wi‑Fi</span><span>100%</span>
          </span>
        </div>
      </MockupRegion>

      <!-- App bar -->
      <MockupRegion id="app-bar" :active-id="activeId" :color="colorMap['app-bar'] ?? 'blue'">
        <header
          class="flex items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <span class="flex items-center gap-2">
            <span class="text-lg leading-none">☰</span>
            <span class="text-base font-black text-zinc-900 dark:text-zinc-50">Inbox</span>
          </span>
          <span class="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
            <span>⌕</span>
            <span class="grid size-6 place-items-center rounded-full bg-zinc-200 text-micro dark:bg-zinc-700">JD</span>
          </span>
        </header>
      </MockupRegion>

      <!-- Search field -->
      <div class="px-4 pt-3">
        <MockupRegion id="search" :active-id="activeId" :color="colorMap.search ?? 'sky'">
          <div
            class="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-2 text-xs text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
          >
            <span>⌕</span> Search mail
          </div>
        </MockupRegion>
      </div>

      <!-- Scrollable content -->
      <MockupRegion id="content" :active-id="activeId" :color="colorMap.content ?? 'teal'">
        <main class="flex flex-col gap-2 p-4">
          <MockupRegion id="card" :active-id="activeId" :color="colorMap.card ?? 'purple'">
            <div
              class="flex gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
            >
              <span class="grid size-8 shrink-0 place-items-center rounded-full bg-sky-500 text-xs font-bold text-white">A</span>
              <div class="min-w-0 flex-1">
                <div class="mb-1 h-2 w-1/2 rounded bg-zinc-300 dark:bg-zinc-600" />
                <div class="h-1.5 w-4/5 rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          </MockupRegion>
          <div
            v-for="i in 3"
            :key="i"
            class="flex gap-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <span class="size-8 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div class="min-w-0 flex-1">
              <div class="mb-1 h-2 w-2/5 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div class="h-1.5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>
        </main>
      </MockupRegion>

      <!-- Snackbar -->
      <div class="absolute bottom-53 inset-x-3">
        <MockupRegion id="snackbar" :active-id="activeId" :color="colorMap.snackbar ?? 'indigo'">
          <div
            class="flex items-center justify-between rounded-lg bg-zinc-900 px-3 py-2 text-caption text-white shadow-lg dark:bg-zinc-700"
          >
            <span>Message archived</span>
            <span class="font-bold text-sky-400">UNDO</span>
          </div>
        </MockupRegion>
      </div>

      <!-- Floating action button -->
      <div class="absolute bottom-42 right-4">
        <MockupRegion id="fab" :active-id="activeId" :color="colorMap.fab ?? 'green'">
          <div class="grid size-12 place-items-center rounded-2xl bg-sky-600 text-2xl text-white shadow-lg">
            ✎
          </div>
        </MockupRegion>
      </div>

      <!-- Bottom sheet -->
      <div class="absolute inset-x-0 bottom-14">
        <MockupRegion id="bottom-sheet" :active-id="activeId" :color="colorMap['bottom-sheet'] ?? 'amber'">
          <div
            class="rounded-t-2xl border-t border-zinc-200 bg-white p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div class="mx-auto mb-2 h-1 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div class="mb-2 text-xs font-bold text-zinc-900 dark:text-zinc-50">Move to…</div>
            <div class="flex items-center justify-between py-1 text-xs text-zinc-600 dark:text-zinc-300">
              <span>📁 Work</span><span>›</span>
            </div>
            <div class="flex items-center justify-between py-1 text-xs text-zinc-600 dark:text-zinc-300">
              <span>📁 Personal</span><span>›</span>
            </div>
          </div>
        </MockupRegion>
      </div>

      <!-- Bottom navigation -->
      <div class="absolute inset-x-0 bottom-0">
        <MockupRegion id="bottom-nav" :active-id="activeId" :color="colorMap['bottom-nav'] ?? 'rose'">
          <nav
            class="flex items-center justify-around border-t border-zinc-200 bg-white py-2 text-micro dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span class="flex flex-col items-center gap-0.5 text-sky-600 dark:text-sky-400">
              <span class="text-base leading-none">✉</span>Mail
            </span>
            <span class="flex flex-col items-center gap-0.5 text-zinc-400 dark:text-zinc-500">
              <span class="text-base leading-none">◷</span>Snoozed
            </span>
            <span class="flex flex-col items-center gap-0.5 text-zinc-400 dark:text-zinc-500">
              <span class="text-base leading-none">➤</span>Sent
            </span>
            <span class="flex flex-col items-center gap-0.5 text-zinc-400 dark:text-zinc-500">
              <span class="text-base leading-none">☰</span>More
            </span>
          </nav>
        </MockupRegion>
      </div>
    </div>
  </div>
</template>
