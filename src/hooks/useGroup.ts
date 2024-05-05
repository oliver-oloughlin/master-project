import { AdfectusService } from "#/services/adfectus_service"
import { createLoaderStore } from "#/utils/zustand"

const store = createLoaderStore((groupId: string) =>
  AdfectusService.getGroupById(groupId),
)

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
