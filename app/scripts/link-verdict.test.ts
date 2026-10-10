// classify: a probe that never got an answer is unverified, while a real answer
// (a 404), a DNS failure or a TLS failure is an error. A timeout is not evidence
// of a dead link.
import { describe, expect, it } from 'vitest'
import { classify } from './link-verdict'

const url = 'https://www.gnu.org/software/bash/'

describe('classify', () => {
  it('reports a probe that never answered within the budget as unverified', () => {
    expect(classify(url, 'TimeoutError')).toBe('unverified')
    expect(classify(url, 'AbortError')).toBe('unverified')
  })

  it('reports a 404 as an error', () => {
    expect(classify(url, 404)).toBe('error')
  })

  it('reports a DNS failure as an error', () => {
    expect(classify('https://nonexistent.example/', 'ENOTFOUND')).toBe('error')
  })

  it('reports a TLS failure as an error', () => {
    expect(classify('https://expired.example/', 'CERT_HAS_EXPIRED')).toBe('error')
  })

  it('keeps a bot-blocked 403 as skipped, not an error', () => {
    expect(classify('https://www.mathworks.com/help/', 403)).toBe('skipped')
  })

  it('passes a healthy status', () => {
    expect(classify(url, 200)).toBe('ok')
  })
})
