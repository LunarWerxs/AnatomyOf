/**
 * Dead-link check for every outbound URL in the data files: each language's
 * `officialUrl` plus every annotation's `learnMore`. Network-dependent, so it
 * is NOT part of `bun run check`, run it occasionally:
 *
 *   bun run check:links
 *
 * Note: some hosts reject HEAD or block non-browser user agents, so a 403 or a
 * timeout can be a false positive, eyeball the list rather than trusting it
 * blindly.
 */
import { loaders } from '../src/data/catalog.generated'

// The browser `languages` export is now lightweight metadata; load the FULL definitions
// (officialUrl + annotations' learnMore) via the generated loaders to collect every URL.
const languages = await Promise.all(Object.values(loaders).map((load) => load()))

const urls = new Set<string>()
for (const lang of languages) {
  if (lang.officialUrl) urls.add(lang.officialUrl)
  for (const annotation of lang.annotations) {
    if (annotation.learnMore) urls.add(annotation.learnMore)
  }
}

const list = [...urls].sort()
console.log(`Checking ${list.length} unique URLs across ${languages.length} entries...`)

const UA = 'Mozilla/5.0 (compatible; AnatomyLinkCheck/1.0; +https://anatomyof.lunarwerx.com)'
const CONCURRENCY = 10
const dead: Array<{ url: string; status: string }> = []
let cursor = 0

async function probe(url: string): Promise<number | string> {
  for (const method of ['HEAD', 'GET'] as const) {
    try {
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        headers: { 'User-Agent': UA },
        signal: AbortSignal.timeout(15000),
      })
      if (res.status < 400) return res.status
      if (method === 'GET') return res.status
    } catch (err) {
      if (method === 'GET') return (err as Error).name
    }
  }
  return 'unknown'
}

// Hosts that 403 automated requests but serve fine in a real browser. Their
// 403s are reported as "skipped", not failures, verify them manually.
const BOT_BLOCKED_HOSTS = ['mathworks.com', 'clojure.org']
const skipped: Array<{ url: string; status: string }> = []

function isUnavailableToChecker(url: string, status: string): boolean {
  // 429 means the server is rate-limiting this concurrent audit, not that the
  // destination is dead. Keep it visible for manual review without failing.
  if (status === '429') return true
  if (status !== '403') return false
  try {
    const host = new URL(url).hostname
    return BOT_BLOCKED_HOSTS.some((d) => host === d || host.endsWith(`.${d}`))
  } catch {
    return false
  }
}

async function worker() {
  while (cursor < list.length) {
    const url = list[cursor++]
    const result = await probe(url)
    if (typeof result === 'string' || result >= 400) {
      const entry = { url, status: String(result) }
      if (isUnavailableToChecker(url, entry.status)) skipped.push(entry)
      else dead.push(entry)
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()))

if (skipped.length > 0) {
  console.log(
    `\n⚠ ${skipped.length} link(s) skipped (blocked or rate-limited: verify in a browser):`,
  )
  for (const s of skipped.sort((a, b) => a.url.localeCompare(b.url))) {
    console.log(`  [${s.status}] ${s.url}`)
  }
}

if (dead.length > 0) {
  console.error(`\n✗ ${dead.length} dead link(s):`)
  for (const d of dead.sort((a, b) => a.url.localeCompare(b.url))) {
    console.error(`  [${d.status}] ${d.url}`)
  }
  process.exit(1)
}
console.log(`\n✓ all ${list.length - skipped.length} checkable links reachable`)
