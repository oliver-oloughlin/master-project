import { createLoaderStore } from "#/utils/zustand"
import { AdfectusService } from "#/services"

const store = createLoaderStore(AdfectusService.getGroupIds)

export const useGroupIds = () => {
  const { data, loading, error, init } = store()
  return {
    get groupIds() {
      init()
      return data ?? []
    },
    loading,
    error,
  }
}
