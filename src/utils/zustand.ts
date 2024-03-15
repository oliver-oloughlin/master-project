import { create } from "zustand"

export type LoaderStore<TArgs extends unknown[], TData> = {
  data: TData | null
  lastArgs: TArgs | null
  loading: boolean
  error: unknown
  fetch(...args: TArgs): Promise<void>
  mutate(fn: (data: TData) => TData): void
  init(...args: TArgs): Promise<void>
}

export type InitializedLoaderStore<TDataName extends string, TData> = {
  [K in TDataName]: TData | null
} & {
  loading: boolean
  error: unknown
  mutate(fn: (data: TData) => TData): void
}

export function createLoaderStore<const TArgs extends unknown[], const TData>(
  fetcher: (...args: TArgs) => TData | Promise<TData>,
) {
  return create<LoaderStore<TArgs, Awaited<TData>>>((set, get) => ({
    data: null,
    lastArgs: null,
    loading: false,
    error: null,
    initialized: false,
    async fetch(...args: TArgs) {
      try {
        set({ loading: true })
        const data = await fetcher(...args)
        set({ data, loading: false })
      } catch (error) {
        set({ error })
      }
    },
    mutate(fn) {
      try {
        const { data } = get()
        if (!data) {
          return
        }

        set({ data: fn(data) })
      } catch (error) {
        console.error(error)
        set({ error })
      }
    },
    async init(...args: TArgs) {
      const { lastArgs, fetch } = get()

      const isStale =
        lastArgs === null || args.some((arg, i) => arg !== lastArgs[i])

      if (isStale) {
        set({ lastArgs: args })
        await fetch(...args)
      }
    },
  }))
}
