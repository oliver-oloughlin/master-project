import { createLoaderStore } from "#/utils/zustand"
import { getExternalUser } from "#/services/users"

const store = createLoaderStore(getExternalUser)

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
