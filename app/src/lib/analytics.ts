// Anonymous visit ping to the LunarWerx update-check endpoint. One fire-and-forget GET per
// browser session; the server stores only the app id, a random install id, country, and a
// timestamp (90-day retention). No cookies, no PII, nothing readable back. Honors Do Not
// Track / Global Privacy Control, and a failure can never affect the app.

const PING_URL = 'https://studio.connections.icu/v1/app/anatomyof/latest'
const ID_KEY = 'anatomyof:visitor-id'
const SESSION_KEY = 'anatomyof:pinged'

export function sendVisitPing() {
  try {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean }
    if (nav.doNotTrack === '1' || nav.globalPrivacyControl) return
    if (sessionStorage.getItem(SESSION_KEY)) return
    sessionStorage.setItem(SESSION_KEY, '1')
    let id = localStorage.getItem(ID_KEY)
    const firstVisit = !id
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(ID_KEY, id)
    }
    // Context the server can't infer on its own: still nothing personal: UI language,
    // timezone, where the visit came from (server keeps the hostname only), first-visit flag.
    const params = new URLSearchParams({ iid: id })
    if (navigator.language) params.set('locale', navigator.language)
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz) params.set('tz', tz)
    if (document.referrer) params.set('ref', document.referrer)
    if (firstVisit) params.set('new', '1')
    // no-cors: the request still reaches the server (that IS the ping); the opaque response
    // is discarded, the id rides ?iid= because no-cors forbids custom headers.
    void fetch(`${PING_URL}?${params.toString()}`, { mode: 'no-cors', keepalive: true })
  } catch {
    // storage/fetch unavailable (private mode, extensions), analytics silently skipped
  }
}
