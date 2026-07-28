<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defaultLanguage, languages, loadLanguage } from '../data'
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
const language = ref<LanguageDef | null>(null)
watch(
  () => meta.value.id,
  async (id) => {
    const def = await loadLanguage(id)
    if (meta.value.id === id) language.value = def
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
