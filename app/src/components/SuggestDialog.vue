<script setup lang="ts">
import { Check, X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { ref, watch } from 'vue'
import { SUGGEST_DEST_EMAIL } from '../lib/suggest'

const open = defineModel<boolean>('open', { required: true })

const suggestion = ref('')
const email = ref('')
const honeypot = ref('') // invisible captcha: bots fill this, humans never see it
const submitting = ref(false)
const done = ref(false)
const error = ref('')

// Reset when the dialog closes.
watch(open, (isOpen) => {
  if (!isOpen) {
    setTimeout(() => {
      suggestion.value = ''
      email.value = ''
      honeypot.value = ''
      done.value = false
      error.value = ''
      submitting.value = false
    }, 200)
  }
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function submit() {
  error.value = ''
  // Honeypot tripped, silently pretend success so bots get no signal.
  if (honeypot.value) {
    done.value = true
    return
  }
  if (!suggestion.value.trim()) {
    error.value = 'Please enter a suggestion.'
    return
  }
  if (!EMAIL_RE.test(email.value.trim())) {
    error.value = 'Please enter a valid email.'
    return
  }

  submitting.value = true
  try {
    // Open the visitor's mail client, pre-addressed and pre-filled.
    const body = `Suggestion: ${suggestion.value.trim()}\nFrom: ${email.value.trim()}`
    window.location.href = `mailto:${SUGGEST_DEST_EMAIL}?subject=${encodeURIComponent(
      'AnatomyOf: suggestion',
    )}&body=${encodeURIComponent(body)}`
    done.value = true
  } catch {
    error.value = `Could not open your mail app, email us at ${SUGGEST_DEST_EMAIL}`
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay data-dialog-overlay class="fixed inset-0 z-40 bg-black/25 dark:bg-black/40" />
      <DialogContent
        data-dialog-content
        class="fixed inset-y-0 left-0 right-0 z-50 m-auto h-fit max-h-[85vh] w-[min(92vw,440px)] overflow-y-auto rounded-xl border border-zinc-200 bg-white p-6 shadow-2xl md:left-60 dark:border-zinc-700 dark:bg-zinc-900"
      >
        <DialogTitle class="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
          Suggest a language or concept
        </DialogTitle>
        <DialogDescription class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Want to see a language, file type, or concept dissected? Let us know.
        </DialogDescription>

        <form v-if="!done" class="mt-4 flex flex-col gap-3" @submit.prevent="submit">
          <label class="flex flex-col gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
            Language or concept
            <input
              v-model="suggestion"
              type="text"
              placeholder="e.g. Elm, TOML, a REST request…"
              class="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-800 focus:border-sky-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </label>
          <label class="flex flex-col gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
            Your email
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-normal text-zinc-800 focus:border-sky-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </label>

          <!-- Invisible honeypot: hidden from users, tempting to bots. -->
          <input
            v-model="honeypot"
            type="text"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
            class="absolute -left-[9999px] size-0"
          />

          <p v-if="error" class="text-xs font-medium text-red-500">{{ error }}</p>

          <button
            type="submit"
            :disabled="submitting"
            class="mt-1 cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {{ submitting ? 'Sending…' : 'Send suggestion' }}
          </button>
        </form>

        <div v-else class="mt-5 flex flex-col items-center gap-2 py-4 text-center">
          <span class="grid size-10 place-items-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
            <Check class="size-5" />
          </span>
          <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Opening your email app…</p>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Just hit send, thanks!</p>
        </div>

        <DialogClose
          class="absolute right-3 top-3 cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          aria-label="Close"
        >
          <X class="size-4" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
