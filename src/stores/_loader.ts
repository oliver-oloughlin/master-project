import { create } from "zustand"

export type LoaderStore<TArgs extends unknown[], TData> = {
  data: TData | null
  loading: boolean
  error: unknown
  fetch(...args: TArgs): Promise<void>
  mutate(fn: (data: TData) => TData): void
}

export type FetcherView<T extends (...args: any[]) => any> = NonNullable<ReturnType<T>> // eslint-disable-line

export function createLoaderStore<const TArgs extends unknown[], const TData>(fetcher: (...args: TArgs) => TData | Promise<TData>) {
  return create<LoaderStore<TArgs, Awaited<TData>>>((set) => ({
    data: null,
    loading: false,
    error: null,
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
      if (!this.data) {
        return
      }
      
      set({ data: fn(this.data) })
    }
  }))
}
