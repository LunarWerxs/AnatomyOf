<script setup lang="ts">
import type { AccentColor } from '../../lib/types'
import MockupRegion from '../MockupRegion.vue'

defineProps<{
  activeId: string | null
  colorMap: Record<string, AccentColor>
}>()
</script>

<template>
  <div class="flex flex-col gap-3 bg-white p-3 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
    <!-- Header -->
    <MockupRegion id="header" :active-id="activeId" :color="colorMap.header ?? 'slate'">
      <header class="flex items-center justify-between gap-3 rounded-md bg-zinc-900 px-4 py-3 dark:bg-zinc-950">
        <MockupRegion id="brand" :active-id="activeId" :color="colorMap.brand ?? 'blue'" inline>
          <span class="flex items-center gap-1.5 px-1 text-sm font-black text-white">
            <span class="grid size-5 place-items-center rounded bg-sky-500 text-[11px]">◆</span>
            Acme
          </span>
        </MockupRegion>
        <MockupRegion id="nav" :active-id="activeId" :color="colorMap.nav ?? 'indigo'" inline>
          <nav class="flex gap-4 px-1 text-xs font-medium text-zinc-300">
            <span>Products</span><span>Pricing</span><span>About</span><span>Contact</span>
          </nav>
        </MockupRegion>
      </header>
    </MockupRegion>

    <!-- Hero -->
    <MockupRegion id="hero" :active-id="activeId" :color="colorMap.hero ?? 'sky'">
      <section
        class="flex flex-col items-center gap-3 rounded-md bg-gradient-to-b from-sky-50 to-white px-6 py-8 text-center dark:from-sky-950/40 dark:to-zinc-900"
      >
        <h2 class="max-w-md text-xl font-black leading-tight text-zinc-900 dark:text-zinc-50">
          Build something people love
        </h2>
        <p class="max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
          A short, punchy value proposition that tells visitors what you do and why it matters.
        </p>
        <MockupRegion id="cta" :active-id="activeId" :color="colorMap.cta ?? 'green'" inline>
          <span class="mt-1 rounded-md bg-sky-600 px-4 py-2 text-xs font-bold text-white">
            Get started →
          </span>
        </MockupRegion>
      </section>
    </MockupRegion>

    <!-- Body: main + sidebar -->
    <div class="grid grid-cols-[1.7fr_1fr] gap-3">
      <MockupRegion id="main" :active-id="activeId" :color="colorMap.main ?? 'teal'">
        <main class="flex h-full flex-col gap-3 rounded-md border border-zinc-200 p-3 dark:border-zinc-700">
          <MockupRegion
            id="article"
            :active-id="activeId"
            :color="colorMap.article ?? 'purple'"
          >
            <article class="rounded-md bg-zinc-50 p-3 dark:bg-zinc-800">
              <div class="mb-2 h-2.5 w-2/3 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div class="space-y-1.5">
                <div class="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                <div class="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                <div class="h-1.5 w-4/5 rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </article>
          </MockupRegion>
          <div class="rounded-md bg-zinc-50 p-3 dark:bg-zinc-800">
            <div class="mb-2 h-2.5 w-1/2 rounded bg-zinc-300 dark:bg-zinc-600" />
            <div class="space-y-1.5">
              <div class="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
              <div class="h-1.5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>
        </main>
      </MockupRegion>

      <MockupRegion id="aside" :active-id="activeId" :color="colorMap.aside ?? 'amber'">
        <aside class="flex h-full flex-col gap-2 rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
          <div class="text-[10px] font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">Related</div>
          <div class="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div class="h-1.5 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div class="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div class="mt-2 h-8 rounded bg-zinc-200 dark:bg-zinc-700" />
        </aside>
      </MockupRegion>
    </div>

    <!-- Footer -->
    <MockupRegion id="footer" :active-id="activeId" :color="colorMap.footer ?? 'rose'">
      <footer
        class="flex items-center justify-between gap-3 rounded-md bg-zinc-900 px-4 py-3 text-[10px] text-zinc-400 dark:bg-zinc-950"
      >
        <span>© 2026 Acme, Inc.</span>
        <span class="flex gap-3"><span>Privacy</span><span>Terms</span><span>Status</span></span>
      </footer>
    </MockupRegion>
  </div>
</template>
