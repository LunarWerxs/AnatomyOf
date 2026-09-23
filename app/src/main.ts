import { createWebHistory } from 'vue-router'
import { createAnatomyApp, loadFirstView } from './app'
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
function upgradeLegacyHashUrl(): boolean {
  const hash = window.location.hash
  if (!hash.startsWith('#/')) return false
  const path = hash.slice(1)
  window.history.replaceState(null, '', path + window.location.search)
  return true
}

const upgradedLegacyHashUrl = upgradeLegacyHashUrl()

// One capture-phase guard, before anything can listen: on Safari and Chrome on
// macOS the Enter that commits an input-method candidate (Chinese, Japanese,
// Korean typing) arrives as a plain key="Enter" and would otherwise reach every
// Enter handler in a half-typed state.
installImeCompositionGuard()

// Every built page arrives with its route already rendered (scripts/prerender.ts); hydrate that
// rather than rebuild it. A legacy hash link is the exception: `/` was prerendered, but the
// router now shows the language the hash named, so that page is rendered fresh.
const container = document.getElementById('app') as HTMLElement
const { app, router } = createAnatomyApp(
  createWebHistory(),
  container.hasChildNodes() && !upgradedLegacyHashUrl,
)
loadFirstView(router)
  .catch((error) => console.error('[anatomy] failed to load the first view', error))
  .then(() => app.mount(container))

sendVisitPing()
