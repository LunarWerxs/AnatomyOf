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

// A timeout is a slow answer, not a dead page: a host that serves 200 in 1-8s can
// still miss the 15s budget once from a busy runner. Retry those before failing.
const TRANSIENT_ERRORS = new Set(['TimeoutError', 'AbortError'])

async function probe(url: string): Promise<number | string> {
  let result: number | string = 'unknown'
  for (let attempt = 1; attempt <= 3; attempt++) {
    result = await probeOnce(url)
    if (typeof result !== 'string' || !TRANSIENT_ERRORS.has(result)) return result
    // Back off so a host that is briefly stalling gets room to recover.
    await new Promise((resolve) => setTimeout(resolve, attempt * 2000))
  }
  return result
}

// A #fragment never leaves the client, so every anchor on one page is the same request.
// Probe each page once; gnu.org's manual alone has 17 anchors on 9 pages.
const pageOf = (url: string) => url.split('#')[0]

// Deal the pages out host by host, so the concurrent workers spread across hosts
// instead of all hitting one server at once (sorted, a host's pages sit together).
function interleaveByHost(pages: string[]): string[] {
  const byHost = new Map<string, string[]>()
  for (const page of pages) {
    const host = new URL(page).hostname
    byHost.set(host, [...(byHost.get(host) ?? []), page])
  }
  const groups = [...byHost.values()]
  const out: string[] = []
  for (let i = 0; out.length < pages.length; i++) {
    for (const group of groups) if (i < group.length) out.push(group[i])
  }
  return out
}

async function probeOnce(url: string): Promise<number | string> {
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
const BOT_BLOCKED_HOSTS = ['mathworks.com', 'clojure.org', 'cppreference.com', 'isocpp.org']
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

const pages = interleaveByHost([...new Set(list.map(pageOf))])
const pageResult = new Map<string, number | string>()

async function worker() {
  while (cursor < pages.length) {
    const page = pages[cursor++]
    pageResult.set(page, await probe(page))
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()))

for (const url of list) {
  const result = pageResult.get(pageOf(url)) ?? 'unknown'
  if (typeof result === 'string' || result >= 400) {
    const entry = { url, status: String(result) }
    if (isUnavailableToChecker(url, entry.status)) skipped.push(entry)
    else dead.push(entry)
  }
}

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
