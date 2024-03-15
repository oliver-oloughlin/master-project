import { getGroupById } from "#/services/groups"
import { createLoaderStore } from "#/utils/zustand"

const store = createLoaderStore(getGroupById)

export const useGroup = (groupId: string) => {
  const { data, loading, error, init } = store()
  return {
    get group() {
      init(groupId)
      return data
    },
    loading,
    error,
  }
}
