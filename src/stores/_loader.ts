import { create } from "zustand"

export type LoaderStore<T> = {
  data: T | null
  loading: boolean
  error: unknown
  fetch(): Promise<void>
  mutate(fn: (data: T) => T): void
}

export function createLoaderStore<const T>(fetcher: () => Promise<T>) {
  return create<LoaderStore<T>>((set) => ({
    data: null,
    loading: false,
    error: null,
    async fetch() {
      try {
        set({ loading: true })
        const data = await fetcher()
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
