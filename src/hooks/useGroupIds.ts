import { createLoaderStore } from "#/utils/zustand"
import { getGroupIds } from "#/services/groups"

const store = createLoaderStore(getGroupIds)

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
