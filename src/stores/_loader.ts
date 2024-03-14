import { useEffect } from "react"
import { create } from "zustand"

export type LoaderStore<TArgs extends unknown[], TData> = {
  data: TData | null
  loading: boolean
  error: unknown
  fetch(...args: TArgs): Promise<void>
  mutate(fn: (data: TData) => TData): void
}

export function createLoaderStore<const TArgs extends unknown[], const TData>(
  fetcher: (...args: TArgs) => TData | Promise<TData>,
) {
  return (...args: TArgs) => {
    const store = create<LoaderStore<TArgs, Awaited<TData>>>((set, get) => ({
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
    }))

    const initializedStore = store()

    useEffect(() => {
      initializedStore.fetch(...args)
    }, [args])

    return initializedStore
  }
}
