import { createApp, createSSRApp } from 'vue'
import { createRouter, type Router, type RouterHistory } from 'vue-router'
import App from './App.vue'
import AnatomyPage from './components/AnatomyPage.vue'
import { defaultLanguage, languages, loadLanguage } from './data'
import { importChunk } from './lib/chunk'
import { loadPrebuiltTokens } from './lib/prebuilt-tokens'

/**
 * The app, shared by the browser (`main.ts`) and the build-time renderer (`entry-server.ts`).
 *
 * `scripts/prerender.ts` renders every route to real HTML at build time, so a visitor sees the
 * tour, heading and code included, before any JavaScript has run. The browser then HYDRATES that
 * markup (`createSSRApp`) instead of building the page a second time; `createApp` is only for a
 * page that arrives empty, which is the dev server.
 *
 * Real paths, not a hash, because a hash fragment is never sent to a server and is not indexed
 * as a separate URL. Every path is a prerendered file that exists and answers 200, so GitHub
 * Pages needs no rewrite rule.
 */
export function createAnatomyApp(history: RouterHistory, hydrate: boolean) {
  const app = hydrate ? createSSRApp(App) : createApp(App)
  const router = createRouter({
    history,
    routes: [{ path: '/:langId?/:variant?', name: 'anatomy', component: AnatomyPage }],
  })
  app.use(router)
  return { app, router }
}

/**
 * Loads everything the current route's first render reads, before that render runs.
 *
 * Hydration only works if the browser's first render is the one the prerender produced, and that
 * render shows the language's full definition and its build-time highlighted code. Both are lazy
 * chunks, so the server awaits them before rendering and the browser before hydrating; after this
 * they are read synchronously (`loadedLanguage`, `peekPrebuiltTokens`). Concept pages show a
 * mockup instead of code, and need its panel's chunk: an async component whose chunk is still in
 * flight hydrates late, and one updated before then is not hydrated at all.
 */
export async function loadFirstView(router: Router): Promise<void> {
  await router.isReady()
  const { langId } = router.currentRoute.value.params
  const meta = languages.find((lang) => lang.id === langId) ?? defaultLanguage
  const def = await importChunk(() => loadLanguage(meta.id))
  if (def.mockup) await importChunk(() => import('./components/MockupPanel.vue'))
  else await loadPrebuiltTokens(def.shikiLang)
}
