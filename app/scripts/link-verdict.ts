// Turns one probe result from check-links.ts into a verdict. Kept in its own
// module because check-links.ts runs its network checks at import time.

// Hosts that 403 automated requests but serve fine in a real browser. Their
// 403s are reported as "skipped", not failures, verify them manually.
const BOT_BLOCKED_HOSTS = ['mathworks.com', 'clojure.org', 'cppreference.com', 'isocpp.org']

// A name that does not resolve (Bun and Node put it in the error code).
const DNS_ERRORS = new Set(['ENOTFOUND', 'EAI_AGAIN'])
// A certificate that is expired, self-signed or does not verify.
const TLS_ERROR = /CERT|SSL|TLS|SIGNATURE|SELF_SIGNED|DEPTH_ZERO|UNABLE_TO_VERIFY/

export type Verdict = 'ok' | 'skipped' | 'unverified' | 'error'

function isUnavailableToChecker(url: string, status: number): boolean {
  // 429 means the server is rate-limiting this concurrent audit, not that the
  // destination is dead. Keep it visible for manual review without failing.
  if (status === 429) return true
  if (status !== 403) return false
  try {
    const host = new URL(url).hostname
    return BOT_BLOCKED_HOSTS.some((d) => host === d || host.endsWith(`.${d}`))
  } catch {
    return false
  }
}

// Only a 4xx/5xx status, a DNS failure or a TLS failure is an error. A probe that
// never got an answer (a timeout, a reset, a refused connection) is unverified: a
// throttled host looks like that, and it is not evidence of a dead link.
export function classify(url: string, result: number | string): Verdict {
  if (typeof result === 'string') {
    if (DNS_ERRORS.has(result) || TLS_ERROR.test(result)) return 'error'
    return 'unverified'
  }
  if (result < 400) return 'ok'
  return isUnavailableToChecker(url, result) ? 'skipped' : 'error'
}
