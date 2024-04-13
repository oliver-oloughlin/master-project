import { createLoaderStore } from "#/utils/zustand"
import { getActivities } from "#/services/ratings"

const store = createLoaderStore(getActivities)

export const useActivities = () => {
  const { data, loading, error, init } = store()
  return {
    get activities() {
      init()
      return data ?? []
    },
    loading,
    error,
  }
}
