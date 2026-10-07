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
    <!-- Header -->
    <MockupRegion id="header" :active-id="activeId" :color="colorMap.header ?? 'slate'">
      <header class="flex items-center justify-between border-b border-zinc-200 px-5 py-3 dark:border-zinc-700">
        <div>
          <div class="text-sm font-black text-zinc-900 dark:text-zinc-50">Settings</div>
          <div class="text-[10px] text-zinc-500 dark:text-zinc-400">Manage your account and preferences</div>
        </div>
        <span class="grid size-7 place-items-center rounded-full bg-zinc-200 text-xs dark:bg-zinc-700">JD</span>
      </header>
    </MockupRegion>

    <div class="grid grid-cols-[140px_1fr]">
      <!-- Category nav -->
      <MockupRegion id="nav" :active-id="activeId" :color="colorMap.nav ?? 'blue'">
        <nav class="flex h-full flex-col gap-0.5 border-e border-zinc-200 p-2 text-xs dark:border-zinc-700">
          <span class="rounded bg-zinc-900 px-2.5 py-1.5 font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">Account</span>
          <span class="px-2.5 py-1.5 text-zinc-500 dark:text-zinc-400">Notifications</span>
          <span class="px-2.5 py-1.5 text-zinc-500 dark:text-zinc-400">Appearance</span>
          <span class="px-2.5 py-1.5 text-zinc-500 dark:text-zinc-400">Privacy</span>
        </nav>
      </MockupRegion>

      <!-- Panels -->
      <div class="flex flex-col gap-4 p-4">
        <MockupRegion id="group" :active-id="activeId" :color="colorMap.group ?? 'teal'">
          <section class="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
            <h3 class="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Profile</h3>

            <MockupRegion id="row" :active-id="activeId" :color="colorMap.row ?? 'purple'">
              <div class="flex items-center justify-between gap-3 py-2">
                <label class="text-xs font-medium text-zinc-700 dark:text-zinc-200">Display name</label>
                <input
                  class="w-40 rounded border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-600 dark:bg-zinc-700"
                  value="Jane Doe"
                  readonly
                />
              </div>
            </MockupRegion>

            <div class="flex items-center justify-between gap-3 border-t border-zinc-100 py-2 dark:border-zinc-800">
              <div>
                <div class="text-xs font-medium text-zinc-700 dark:text-zinc-200">Language</div>
                <MockupRegion id="help" :active-id="activeId" :color="colorMap.help ?? 'sky'" inline>
                  <span class="text-[10px] text-zinc-400 dark:text-zinc-500">Used across the interface.</span>
                </MockupRegion>
              </div>
              <MockupRegion
                id="select"
                :active-id="activeId"
                :color="colorMap.select ?? 'indigo'"
                inline
              >
                <span
                  class="flex items-center gap-1 rounded border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-600 dark:bg-zinc-700"
                >
                  English ▾
                </span>
              </MockupRegion>
            </div>
          </section>
        </MockupRegion>

        <section class="rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
          <h3 class="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Notifications</h3>
          <div class="flex items-center justify-between gap-3 py-2">
            <label class="text-xs font-medium text-zinc-700 dark:text-zinc-200">Email updates</label>
            <MockupRegion
              id="toggle"
              :active-id="activeId"
              :color="colorMap.toggle ?? 'green'"
              inline
            >
              <span class="flex h-5 w-9 items-center rounded-full bg-green-500 px-0.5">
                <span class="ms-auto size-4 rounded-full bg-white shadow" />
              </span>
            </MockupRegion>
          </div>
        </section>

        <!-- Danger zone -->
        <MockupRegion id="danger" :active-id="activeId" :color="colorMap.danger ?? 'red'">
          <section class="rounded-md border border-red-300 bg-red-50 p-3 dark:border-red-900 dark:bg-red-950/40">
            <h3 class="mb-1 text-xs font-bold uppercase tracking-wide text-red-600 dark:text-red-400">Danger zone</h3>
            <div class="flex items-center justify-between gap-3">
              <span class="text-[10px] text-red-500 dark:text-red-400">Permanently delete this account.</span>
              <span class="rounded bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white">
                Delete account
              </span>
            </div>
          </section>
        </MockupRegion>

        <!-- Action bar -->
        <MockupRegion id="actions" :active-id="activeId" :color="colorMap.actions ?? 'amber'">
          <div class="flex items-center justify-end gap-2 border-t border-zinc-200 pt-3 dark:border-zinc-700">
            <span class="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:border-zinc-600 dark:text-zinc-300">
              Cancel
            </span>
            <span class="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
              Save changes
            </span>
          </div>
        </MockupRegion>
      </div>
    </div>
  </div>
</template>
