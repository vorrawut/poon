/// <reference types="vitest/globals" />

declare global {
  const vi: typeof import('vitest')['vi']
  const describe: typeof import('vitest')['describe']
  const it: typeof import('vitest')['it']
  const expect: typeof import('vitest')['expect']
  const beforeEach: typeof import('vitest')['beforeEach']
  const afterEach: typeof import('vitest')['afterEach']
}
