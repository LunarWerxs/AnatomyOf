import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import AnatomyPage from './components/AnatomyPage.vue'
import { sendVisitPing } from './lib/analytics'
import { installImeCompositionGuard } from './lib/ime-composition-guard'
import './style.css'

/**
 * A legacy `#/python/verbose` link, rewritten to `/python/verbose` before the
 * router ever sees it.
 *
 * Every link shared while this site used hash history points at a fragment, and
 * a fragment is not a path: under web history those URLs would all silently open
 * the default language instead of the one the sender meant. This runs once, at
 * boot, and replaces the entry rather than pushing, so Back still leaves the
 * site instead of bouncing between the two spellings of the same page.
 */
function upgradeLegacyHashUrl(): void {
  const hash = window.location.hash
  if (!hash.startsWith('#/')) return
  const path = hash.slice(1)
  window.history.replaceState(null, '', path + window.location.search)
}

upgradeLegacyHashUrl()

/**
 * Real paths, not a hash, because a hash fragment is never sent to a server and
 * is not indexed as a separate URL.
 *
 * Hash history was the right call when this was a plain static site: it made
 * deep links survive a refresh with no rewrite rules. The cost was invisible and
 * total. All 55 tours shared one indexable URL, so an assistant asked what lives
 * inside a Rust file had nothing to cite, and the site's best asset, a written
 * tour per language, was worth nothing to search.
 *
 * What replaces the rewrite rule is `scripts/prerender.ts`: it writes a real
 * `dist/<id>/index.html` for every entry after the build, so each path is a file
 * that exists, answers 200, and carries that language's own title, description
 * and prose before any JavaScript runs. GitHub Pages needs no configuration for
 * that, because nothing is being rewritten.
 */
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/:langId?/:variant?', name: 'anatomy', component: AnatomyPage }],
})

// One capture-phase guard, before anything can listen: on Safari and Chrome on
// macOS the Enter that commits an input-method candidate (Chinese, Japanese,
// Korean typing) arrives as a plain key="Enter" and would otherwise reach every
// Enter handler in a half-typed state.
installImeCompositionGuard()

createApp(App).use(router).mount('#app')

sendVisitPing()
