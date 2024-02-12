import { getExternalPatients } from "#/services/external_patients.service"
import { createLoaderStore } from "./_loader"

const useExternalPatientsLoader = createLoaderStore(getExternalPatients)

export const useExternalPatients = () => {
  const { data, loading, error, fetch } = useExternalPatientsLoader()
  return {
    externalPatients: data ?? [],
    loading,
    error,
    fetchExternalPatients: fetch,
  }
}
