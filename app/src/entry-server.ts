import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory } from 'vue-router'
import { createAnatomyApp, loadFirstView } from './app'

/**
 * Build-time render of one route to the HTML that goes inside `#app` (see scripts/prerender.ts).
 *
 * Built by `vite build --ssr` into dist-ssr/, which never ships: it runs once per page during the
 * build and the browser hydrates what it wrote.
 */
export async function render(url: string): Promise<string> {
  const { app, router } = createAnatomyApp(createMemoryHistory(), true)
  await router.push(url)
  await loadFirstView(router)
  const ctx: { teleports?: Record<string, string> } = {}
  const html = await renderToString(app, ctx)
  // Anything teleported (an open dialog) would be written outside #app and never hydrate.
  if (ctx.teleports && Object.values(ctx.teleports).some(Boolean)) {
    throw new Error(`render(${url}): the first view teleported content out of #app`)
  }
  return html
}
