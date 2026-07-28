<script setup lang="ts">
import type { BundledLanguage, ThemedToken } from 'shiki'
import { shallowRef, watch } from 'vue'
import { CODE_THEME, getHighlighter } from '../lib/highlighter'

const props = defineProps<{
  text: string
  lang: string
}>()

// Shiki tokens for the fragment (single logical line). Rendered on a dark
// chip so the One-Dark colors read well in both light and dark page themes.
const tokens = shallowRef<ThemedToken[] | null>(null)

watch(
  () => [props.text, props.lang],
  async () => {
    const snapshot = props.text
    try {
      const highlighter = await getHighlighter(props.lang, CODE_THEME)
      const result = highlighter.codeToTokens(props.text, {
        lang: props.lang as BundledLanguage,
        theme: CODE_THEME,
      })
      if (snapshot === props.text) tokens.value = result.tokens[0] ?? null
    } catch {
      tokens.value = null
    }
  },
  { immediate: true },
)
</script>

<template>
  <code
    class="rounded bg-[#282c34] px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-100 ring-1 ring-black/20 dark:ring-white/10"
  >
    <template v-if="tokens">
      <span v-for="(token, i) in tokens" :key="i" :style="{ color: token.color }">{{
        token.content
      }}</span>
    </template>
    <template v-else>{{ text }}</template>
  </code>
</template>
