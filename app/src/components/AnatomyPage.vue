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
watch(
  () => meta.value.id,
  async (id) => {
    // Concept pages render a mockup, not code, so they don't pay for Shiki here.
    if (meta.value.category !== 'concept') warmHighlighter(meta.value.shikiLang)
    try {
      const def = await importChunk(() => loadLanguage(id))
      if (meta.value.id === id) language.value = def
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
