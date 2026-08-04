/// <reference types="vite/client" />

declare module '*.jinja?raw' {
  const content: string
  export default content
}

declare module 'nunjucks' {
  export class Environment {
    constructor(loaders?: unknown, opts?: { autoescape?: boolean })
    addGlobal(name: string, value: unknown): void
    addFilter(name: string, fn: (...args: unknown[]) => unknown, async?: boolean): void
    renderString(template: string, context: Record<string, unknown>): string
  }
  export default {
    Environment: Environment,
  }
}
