<script setup lang="ts">
import type { AccentColor } from '../../lib/types'
import MockupRegion from '../MockupRegion.vue'

defineProps<{
  activeId: string | null
  colorMap: Record<string, AccentColor>
}>()
</script>

<template>
  <div class="flex flex-col bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
    <!-- Toolbar -->
    <MockupRegion id="toolbar" :active-id="activeId" :color="colorMap.toolbar ?? 'slate'">
      <header class="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-2.5 dark:border-zinc-800">
        <div class="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
          <span class="text-sm font-black text-zinc-900 dark:text-zinc-50">✉ Mail</span>
          <span class="text-base leading-none">↩</span><span class="text-base leading-none">🗑</span><span class="text-base leading-none">⌸</span>
        </div>
        <MockupRegion id="search" :active-id="activeId" :color="colorMap.search ?? 'sky'" inline>
          <span class="flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-[11px] text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">⌕ Search mail</span>
        </MockupRegion>
      </header>
    </MockupRegion>

    <div class="grid grid-cols-[110px_1.1fr_1.6fr]">
      <!-- Folders -->
      <MockupRegion id="folders" :active-id="activeId" :color="colorMap.folders ?? 'blue'">
        <nav class="flex h-full flex-col gap-1 border-r border-zinc-200 p-2 text-xs dark:border-zinc-800">
          <MockupRegion id="compose" :active-id="activeId" :color="colorMap.compose ?? 'green'">
            <div class="mb-1 rounded-full bg-sky-600 px-3 py-1.5 text-center text-[11px] font-bold text-white">✎ Compose</div>
          </MockupRegion>
          <span class="flex justify-between rounded bg-zinc-900 px-2 py-1 font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">Inbox <span>12</span></span>
          <span class="px-2 py-1 text-zinc-500 dark:text-zinc-400">Starred</span>
          <span class="px-2 py-1 text-zinc-500 dark:text-zinc-400">Sent</span>
          <span class="px-2 py-1 text-zinc-500 dark:text-zinc-400">Drafts</span>
        </nav>
      </MockupRegion>

      <!-- Message list -->
      <MockupRegion id="message-list" :active-id="activeId" :color="colorMap['message-list'] ?? 'teal'">
        <div class="flex h-full flex-col border-r border-zinc-200 dark:border-zinc-800">
          <MockupRegion id="message" :active-id="activeId" :color="colorMap.message ?? 'purple'">
            <div class="border-l-2 border-sky-500 bg-sky-50 px-3 py-2 dark:bg-sky-950/40">
              <div class="flex justify-between text-xs font-bold text-zinc-800 dark:text-zinc-100"><span>Globex Corp</span><span class="text-[10px] font-normal text-zinc-400">9:41</span></div>
              <div class="truncate text-[11px] font-medium text-zinc-700 dark:text-zinc-200">Q3 invoice attached</div>
              <div class="truncate text-[10px] text-zinc-400">Hi, please find the invoice for…</div>
            </div>
          </MockupRegion>
          <div class="border-t border-zinc-100 px-3 py-2 dark:border-zinc-800">
            <div class="flex justify-between text-xs text-zinc-600 dark:text-zinc-300"><span>Jane Doe</span><span class="text-[10px] text-zinc-400">8:02</span></div>
            <div class="truncate text-[11px] text-zinc-500 dark:text-zinc-400">Lunch on Friday?</div>
          </div>
          <div class="border-t border-zinc-100 px-3 py-2 dark:border-zinc-800">
            <div class="flex justify-between text-xs text-zinc-600 dark:text-zinc-300"><span>CI / CD</span><span class="text-[10px] text-zinc-400">7:30</span></div>
            <div class="truncate text-[11px] text-zinc-500 dark:text-zinc-400">✓ Build passed on main</div>
          </div>
        </div>
      </MockupRegion>

      <!-- Reading pane -->
      <MockupRegion id="reading-pane" :active-id="activeId" :color="colorMap['reading-pane'] ?? 'indigo'">
        <article class="flex h-full flex-col gap-2 p-3">
          <div class="text-sm font-black text-zinc-900 dark:text-zinc-50">Q3 invoice attached</div>
          <div class="flex items-center gap-2">
            <span class="grid size-6 place-items-center rounded-full bg-sky-500 text-[10px] font-bold text-white">G</span>
            <span class="text-[11px] text-zinc-500 dark:text-zinc-400">Globex Corp &lt;billing@globex.com&gt;</span>
          </div>
          <div class="space-y-1.5">
            <div class="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
            <div class="h-1.5 w-11/12 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div class="h-1.5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
          <MockupRegion id="attachment" :active-id="activeId" :color="colorMap.attachment ?? 'amber'">
            <div class="flex w-40 items-center gap-2 rounded border border-zinc-200 p-2 text-[11px] dark:border-zinc-700">
              <span class="text-base">📎</span>
              <span class="min-w-0"><span class="block truncate text-zinc-700 dark:text-zinc-200">invoice-q3.pdf</span><span class="text-[9px] text-zinc-400">248 KB</span></span>
            </div>
          </MockupRegion>
          <MockupRegion id="reply" :active-id="activeId" :color="colorMap.reply ?? 'rose'">
            <div class="mt-1 flex gap-2">
              <span class="rounded-md bg-zinc-900 px-3 py-1.5 text-[11px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">↩ Reply</span>
              <span class="rounded-md border border-zinc-300 px-3 py-1.5 text-[11px] font-semibold text-zinc-600 dark:border-zinc-600 dark:text-zinc-300">↪ Forward</span>
            </div>
          </MockupRegion>
        </article>
      </MockupRegion>
    </div>
  </div>
</template>
