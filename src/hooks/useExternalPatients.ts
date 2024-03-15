import { getExternalPatients } from "#/services/patients"
import { createLoaderStore } from "#/utils/zustand"

const store = createLoaderStore(getExternalPatients)

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
