<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defaultLanguage, languages, loadLanguage } from '../data'
import { importChunk } from '../lib/chunk'
import { warmHighlighter } from '../lib/highlighter'
import type { ExampleVariant, LanguageDef } from '../lib/types'
import AnatomyView from './AnatomyView.vue'

const route = useRoute()
const router = useRouter()

// Lightweight metadata for the current route, used to validate the URL and to
// decide which full definition to load. The heavy annotations/examples come from
// loadLanguage() below, not this array.
const meta = computed(
  () => languages.find((lang) => lang.id === route.params.langId) ?? defaultLanguage,
)
const variant = computed<ExampleVariant>(() =>
  route.params.variant === 'verbose' ? 'verbose' : 'minimal',
)

// The FULL definition loads on demand per language. Keep the previously-loaded one
// visible until the next resolves so switching languages doesn't flash empty, and
// guard against out-of-order resolution when the route changes mid-load.
// A dropped chunk request is retried rather than left as a permanently blank page.
const language = ref<LanguageDef | null>(null)

// Monotonic id for the in-flight load. Only the newest one may commit, so a slow
// chunk that lands after the user has moved on is discarded instead of yanking the
// page back. Comparing against the route id alone is not enough: two loads of the
// SAME id can be in flight after a there-and-back-again click.
let latest = 0

watch(
  () => meta.value.id,
  async (id) => {
    const mine = ++latest
    // Grammars are by far the largest assets here, and warming one for every route
    // the user passes THROUGH is what made a quick click-through look frozen: a
    // dozen of them queue up on the connection and the chunk for the language
    // actually landed on waits behind all of them.
    //
    // So only the very first load warms eagerly, where fetching Shiki's core,
    // engine and grammar alongside the data chunk is a real cold-start win. After
    // that the warm waits until the data has landed AND this is still the current
    // route, which means a language merely passed through never costs a grammar.
    // Concept pages render a mockup, not code, so they never pay for Shiki at all.
    const cold = language.value === null
    if (cold && meta.value.category !== 'concept') warmHighlighter(meta.value.shikiLang)
    try {
      const def = await importChunk(() => loadLanguage(id))
      if (mine !== latest) return
      language.value = def
      if (!cold && def.category !== 'concept') warmHighlighter(def.shikiLang)
    } catch (error) {
      console.error(`[anatomy] failed to load language "${id}"`, error)
    }
  },
  { immediate: true },
)

// Normalize garbage URLs (e.g. /#/nope/wat) back to a real route.
watchEffect(() => {
  const { langId, variant: v } = route.params
  const langOk = !langId || languages.some((lang) => lang.id === langId)
  const variantOk = !v || v === 'minimal' || v === 'verbose'
  if (!langOk || !variantOk) {
    router.replace(`/${meta.value.id}/${variant.value}`)
  }
})

function setVariant(value: ExampleVariant) {
  router.push(`/${meta.value.id}/${value}`)
}
</script>

<template>
  <AnatomyView
    v-if="language"
    :language="language"
    :variant="variant"
    @set-variant="setVariant"
  />
</template>
