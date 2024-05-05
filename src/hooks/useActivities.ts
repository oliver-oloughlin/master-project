import { createLoaderStore } from "#/utils/zustand"
import { AdfectusService } from "#/services/adfectus_service"

const store = createLoaderStore(AdfectusService.getActivities)

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
