/**
 * Load a lazy chunk, retrying a transient failure before giving up.
 *
 * Every dynamic import() here is a separate network request to a static host, so
 * any one of them can lose to a dropped connection or a CDN hiccup. Without a
 * retry a single unlucky request leaves whatever depended on that chunk missing
 * for the rest of the page's life, since a module that failed to load is not
 * re-fetched on its own.
 */
export async function importChunk<T>(load: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await load()
    } catch (error) {
      lastError = error
      if (attempt < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 150 * 2 ** attempt))
      }
    }
  }
  throw lastError
}

/**
 * Cache in-flight/settled work by key, but never cache a REJECTION: a failed
 * entry is dropped so the next caller starts a fresh attempt instead of
 * re-awaiting the same stale error forever.
 */
export function cacheUnlessRejected<T>(
  store: Map<string, Promise<T>>,
  key: string,
  run: () => Promise<T>,
): Promise<T> {
  const existing = store.get(key)
  if (existing) return existing

  const promise = run().catch((error) => {
    store.delete(key)
    throw error
  })
  store.set(key, promise)
  return promise
}
