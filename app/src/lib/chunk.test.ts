// importChunk: retries a failing loader with exponential backoff before
// giving up. cacheUnlessRejected: memoizes by key but must never memoize a
// rejection, so a failed chunk gets a fresh attempt next time it's asked for.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cacheUnlessRejected, importChunk } from './chunk'

describe('importChunk', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the loaded value on the first successful attempt, without waiting', async () => {
    const load = vi.fn().mockResolvedValue('ok')
    const result = await importChunk(load)
    expect(result).toBe('ok')
    expect(load).toHaveBeenCalledTimes(1)
  })

  it('retries after a failure and returns the value once the loader succeeds', async () => {
    const load = vi
      .fn()
      .mockRejectedValueOnce(new Error('first hiccup'))
      .mockResolvedValueOnce('recovered')

    const promise = importChunk(load, 3)
    // Flush the retry backoff (150ms after attempt 0) then await the result.
    await vi.advanceTimersByTimeAsync(150)
    await expect(promise).resolves.toBe('recovered')
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('backs off exponentially between attempts (150ms, then 300ms)', async () => {
    const load = vi.fn().mockRejectedValue(new Error('down'))
    const promise = importChunk(load, 3).catch((e) => e)

    // Nothing has run yet beyond the first synchronous attempt.
    expect(load).toHaveBeenCalledTimes(1)

    // Advancing by less than the first delay must not trigger attempt 2.
    await vi.advanceTimersByTimeAsync(149)
    expect(load).toHaveBeenCalledTimes(1)

    // Crossing 150ms triggers attempt 2.
    await vi.advanceTimersByTimeAsync(1)
    expect(load).toHaveBeenCalledTimes(2)

    // Crossing the second delay (300ms after attempt 2, i.e. 150*2^1) triggers attempt 3.
    await vi.advanceTimersByTimeAsync(299)
    expect(load).toHaveBeenCalledTimes(2)
    await vi.advanceTimersByTimeAsync(1)
    expect(load).toHaveBeenCalledTimes(3)

    const error = await promise
    expect(error).toBeInstanceOf(Error)
    expect((error as Error).message).toBe('down')
  })

  it('throws the LAST error after exhausting all attempts, not the first', async () => {
    const load = vi
      .fn()
      .mockRejectedValueOnce(new Error('attempt 1 failed'))
      .mockRejectedValueOnce(new Error('attempt 2 failed'))

    const promise = importChunk(load, 2).catch((e) => e)
    await vi.advanceTimersByTimeAsync(150)
    const error = await promise
    expect((error as Error).message).toBe('attempt 2 failed')
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('never sleeps after the final attempt (does not retry attempts+1 times)', async () => {
    const load = vi.fn().mockRejectedValue(new Error('nope'))
    const promise = importChunk(load, 1).catch((e) => e)
    // With attempts=1 there is no retry loop at all: it should reject
    // immediately, with no pending timer to advance.
    const error = await promise
    expect((error as Error).message).toBe('nope')
    expect(load).toHaveBeenCalledTimes(1)
  })
})

describe('cacheUnlessRejected', () => {
  it('runs the loader only once and shares the in-flight promise with concurrent callers', async () => {
    let resolveRun: (v: string) => void = () => {}
    const run = vi.fn(
      () =>
        new Promise<string>((resolve) => {
          resolveRun = resolve
        }),
    )
    const store = new Map<string, Promise<string>>()

    const first = cacheUnlessRejected(store, 'k', run)
    const second = cacheUnlessRejected(store, 'k', run)
    expect(run).toHaveBeenCalledTimes(1)

    resolveRun('value')
    await expect(first).resolves.toBe('value')
    await expect(second).resolves.toBe('value')
  })

  it('keeps a resolved entry cached: a later call for the same key does not re-run', async () => {
    const run = vi.fn().mockResolvedValue('cached')
    const store = new Map<string, Promise<string>>()

    await cacheUnlessRejected(store, 'k', run)
    await cacheUnlessRejected(store, 'k', run)

    expect(run).toHaveBeenCalledTimes(1)
  })

  it('drops a rejected entry so the NEXT call gets a fresh attempt', async () => {
    const run = vi.fn().mockRejectedValueOnce(new Error('boom')).mockResolvedValueOnce('recovered')
    const store = new Map<string, Promise<string>>()

    await expect(cacheUnlessRejected(store, 'k', run)).rejects.toThrow('boom')
    expect(store.has('k')).toBe(false)

    await expect(cacheUnlessRejected(store, 'k', run)).resolves.toBe('recovered')
    expect(run).toHaveBeenCalledTimes(2)
  })

  it('keeps entries for different keys independent', async () => {
    const runA = vi.fn().mockResolvedValue('a')
    const runB = vi.fn().mockResolvedValue('b')
    const store = new Map<string, Promise<string>>()

    await expect(cacheUnlessRejected(store, 'a', runA)).resolves.toBe('a')
    await expect(cacheUnlessRejected(store, 'b', runB)).resolves.toBe('b')
    expect(runA).toHaveBeenCalledTimes(1)
    expect(runB).toHaveBeenCalledTimes(1)
  })
})
