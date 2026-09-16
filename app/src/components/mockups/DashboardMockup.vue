<script setup lang="ts">
import type { AccentColor } from '../../lib/types'
import MockupRegion from '../MockupRegion.vue'

defineProps<{
  activeId: string | null
  colorMap: Record<string, AccentColor>
}>()

const bars = [40, 62, 48, 75, 58, 88, 70]
</script>

<template>
  <div class="grid grid-cols-[132px_1fr] bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
    <!-- Sidebar -->
    <MockupRegion id="sidebar" :active-id="activeId" :color="colorMap.sidebar ?? 'slate'">
      <aside class="flex h-full flex-col gap-1 border-e border-zinc-200 p-2 text-xs dark:border-zinc-800">
        <div class="mb-2 px-2 text-sm font-black text-zinc-900 dark:text-zinc-50">◆ Acme</div>
        <span class="rounded bg-zinc-900 px-2.5 py-1.5 font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">Overview</span>
        <span class="px-2.5 py-1.5 text-zinc-500 dark:text-zinc-400">Reports</span>
        <span class="px-2.5 py-1.5 text-zinc-500 dark:text-zinc-400">Customers</span>
        <span class="px-2.5 py-1.5 text-zinc-500 dark:text-zinc-400">Settings</span>
      </aside>
    </MockupRegion>

    <div class="flex flex-col">
      <!-- Top bar -->
      <MockupRegion id="topbar" :active-id="activeId" :color="colorMap.topbar ?? 'blue'">
        <header class="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div class="text-sm font-black text-zinc-900 dark:text-zinc-50">Overview</div>
          <div class="flex items-center gap-3">
            <MockupRegion id="search" :active-id="activeId" :color="colorMap.search ?? 'sky'" inline>
              <span class="flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-[11px] text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">⌕ Search</span>
            </MockupRegion>
            <span class="grid size-6 place-items-center rounded-full bg-zinc-200 text-[10px] dark:bg-zinc-700">JD</span>
          </div>
        </header>
      </MockupRegion>

      <div class="flex flex-col gap-3 p-4">
        <!-- KPI cards -->
        <div class="grid grid-cols-3 gap-3">
          <MockupRegion id="kpi" :active-id="activeId" :color="colorMap.kpi ?? 'teal'">
            <div class="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
              <div class="text-[10px] uppercase tracking-wide text-zinc-400">Revenue</div>
              <div class="text-lg font-black text-zinc-900 dark:text-zinc-50">$48.2k</div>
              <div class="text-[10px] font-semibold text-green-600 dark:text-green-400">▲ 12.4%</div>
            </div>
          </MockupRegion>
          <div class="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
            <div class="text-[10px] uppercase tracking-wide text-zinc-400">Users</div>
            <div class="text-lg font-black text-zinc-900 dark:text-zinc-50">3,914</div>
            <div class="text-[10px] font-semibold text-green-600 dark:text-green-400">▲ 5.1%</div>
          </div>
          <div class="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
            <div class="text-[10px] uppercase tracking-wide text-zinc-400">Churn</div>
            <div class="text-lg font-black text-zinc-900 dark:text-zinc-50">1.8%</div>
            <div class="text-[10px] font-semibold text-red-500 dark:text-red-400">▼ 0.3%</div>
          </div>
        </div>

        <!-- Chart + filter -->
        <MockupRegion id="chart" :active-id="activeId" :color="colorMap.chart ?? 'purple'">
          <div class="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
            <div class="mb-2 flex items-center justify-between">
              <span class="text-xs font-bold text-zinc-700 dark:text-zinc-200">Weekly revenue</span>
              <MockupRegion id="filter" :active-id="activeId" :color="colorMap.filter ?? 'amber'" inline>
                <span class="flex items-center gap-1 rounded border border-zinc-300 px-2 py-0.5 text-[10px] text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">Last 7 days ▾</span>
              </MockupRegion>
            </div>
            <div class="flex h-20 items-end gap-2">
              <div
                v-for="(b, i) in bars"
                :key="i"
                class="flex-1 rounded-t bg-sky-500/80"
                :style="{ height: `${b}%` }"
              />
            </div>
          </div>
        </MockupRegion>

        <!-- Table -->
        <MockupRegion id="table" :active-id="activeId" :color="colorMap.table ?? 'indigo'">
          <div class="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
            <div class="flex bg-zinc-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-zinc-400 dark:bg-zinc-800">
              <span class="flex-1">Customer</span><span class="w-16">Plan</span><span class="w-16 text-end">MRR</span>
            </div>
            <MockupRegion id="row" :active-id="activeId" :color="colorMap.row ?? 'rose'">
              <div class="flex items-center border-t border-zinc-100 px-3 py-2 text-xs dark:border-zinc-800">
                <span class="flex-1 text-zinc-700 dark:text-zinc-200">Globex Corp</span>
                <span class="w-16 text-zinc-500 dark:text-zinc-400">Pro</span>
                <span class="w-16 text-end font-semibold text-zinc-800 dark:text-zinc-100">$1,200</span>
              </div>
            </MockupRegion>
            <div class="flex items-center border-t border-zinc-100 px-3 py-2 text-xs dark:border-zinc-800">
              <span class="flex-1 text-zinc-700 dark:text-zinc-200">Initech</span>
              <span class="w-16 text-zinc-500 dark:text-zinc-400">Team</span>
              <span class="w-16 text-end font-semibold text-zinc-800 dark:text-zinc-100">$640</span>
            </div>
            <MockupRegion id="pagination" :active-id="activeId" :color="colorMap.pagination ?? 'green'">
              <div class="flex items-center justify-end gap-1 border-t border-zinc-100 px-3 py-1.5 text-[10px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <span class="rounded border border-zinc-300 px-1.5 dark:border-zinc-600">‹</span>
                <span>1 / 12</span>
                <span class="rounded border border-zinc-300 px-1.5 dark:border-zinc-600">›</span>
              </div>
            </MockupRegion>
          </div>
        </MockupRegion>
      </div>
    </div>
  </div>
</template>
