import { getExternalPatients } from "#/services/patients"
import { createLoaderStore, useLoaderStore } from "#/utils/zustand"

const store = createLoaderStore(getExternalPatients)

export const useExternalPatients = () => {
  const { data, ...rest } = useLoaderStore(store)
  return {
    externalPatients: data ?? [],
    ...rest,
  }
}
