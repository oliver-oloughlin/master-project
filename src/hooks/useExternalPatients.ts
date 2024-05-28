import { ExternalService } from "#/services"
import { createLoaderStore } from "#/utils/zustand"

const store = createLoaderStore(ExternalService.getPatients)

export const useExternalPatients = (groupId?: string) => {
  const { data, loading, error, init } = store()
  return {
    get externalPatients() {
      init(groupId)
      return data ?? []
    },
    loading,
    error,
  }
}
