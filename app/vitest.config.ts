import { defineConfig } from 'vitest/config'

// A standalone config (not vite.config.ts) on purpose: the lib under test is
// plain TypeScript with no Vue SFCs and no Tailwind output to process, so
// pulling in the app's vue()/tailwindcss() plugins would only slow the run
// down for nothing they exercise.
export default defineConfig({
  test: {
    include: ['src/lib/**/*.test.ts'],
    environment: 'node',
  },
})
