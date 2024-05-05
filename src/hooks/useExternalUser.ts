import { createLoaderStore } from "#/utils/zustand"
import { ExternalService } from "#/services/external_service"

const store = createLoaderStore(ExternalService.getUser)

export const useExternalUser = () => {
  const { data, loading, error, init } = store()
  return {
    get externalUser() {
      init()
      return data
    },
    loading,
    error,
  }
}
