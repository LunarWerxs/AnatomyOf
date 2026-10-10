/**
 * Dead-link check for every outbound URL in the data files: each language's
 * `officialUrl` plus every annotation's `learnMore`. Network-dependent, so it
 * is NOT part of `bun run check`, run it occasionally:
 *
 *   bun run check:links
 *
 * Note: some hosts reject HEAD or block non-browser user agents, so a 403 can be
 * a false positive, eyeball the list rather than trusting it blindly. A URL that
 * never answers within the budget is UNVERIFIED, not dead: it is listed and
 * does not fail the run (see link-verdict.ts for the classifier).
 */
import { loaders } from '../src/data/catalog.generated'
import { classify } from './link-verdict'

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
const unverified: Array<{ url: string; status: string }> = []
let cursor = 0

// A timeout is a slow answer, not a dead page: a host that serves 200 in 1-8s can
// still miss the 15s budget once from a busy runner. Retry those before giving up.
async function probe(url: string): Promise<number | string> {
  let result: number | string = 'unknown'
  for (let attempt = 1; attempt <= 3; attempt++) {
    result = await probeOnce(url)
    if (classify(url, result) !== 'unverified') return result
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
      // Bun and Node put the reason in err.code (ENOTFOUND, CERT_HAS_EXPIRED); a
      // timeout has none, so it falls back to its name (TimeoutError).
      if (method === 'GET') return (err as { code?: string }).code ?? (err as Error).name
    }
  }
  return 'unknown'
}

const skipped: Array<{ url: string; status: string }> = []

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
  const entry = { url, status: String(result) }
  const verdict = classify(url, result)
  if (verdict === 'skipped') skipped.push(entry)
  else if (verdict === 'unverified') unverified.push(entry)
  else if (verdict === 'error') dead.push(entry)
}

if (skipped.length > 0) {
  console.log(
    `\n⚠ ${skipped.length} link(s) skipped (blocked or rate-limited: verify in a browser):`,
  )
  for (const s of skipped.sort((a, b) => a.url.localeCompare(b.url))) {
    console.log(`  [${s.status}] ${s.url}`)
  }
}

if (unverified.length > 0) {
  console.log(
    `\n⚠ ${unverified.length} link(s) unverified (no answer after retries: not counted as dead, verify in a browser):`,
  )
  for (const u of unverified.sort((a, b) => a.url.localeCompare(b.url))) {
    console.log(`  [${u.status}] ${u.url}`)
    // GitHub Actions turns this line into an annotation on the job.
    if (process.env.GITHUB_ACTIONS) {
      console.log(`::warning title=Unverified link::${u.url} did not answer after retries`)
    }
  }
}

if (dead.length > 0) {
  console.error(`\n✗ ${dead.length} dead link(s):`)
  for (const d of dead.sort((a, b) => a.url.localeCompare(b.url))) {
    console.error(`  [${d.status}] ${d.url}`)
  }
  process.exit(1)
}
console.log(
  `\n✓ all ${list.length - skipped.length - unverified.length} checkable links reachable (${unverified.length} unverified)`,
)
