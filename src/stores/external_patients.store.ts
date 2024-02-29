import { getExternalPatients } from "#/services/external_patients.service"
import { useCallback } from "react"
import { createLoaderStore } from "./_loader"

const useExternalPatientsLoader = createLoaderStore(getExternalPatients)

export const useExternalPatients = (groupId?: string) => {
  const { data, loading, error, fetch } = useExternalPatientsLoader()

  const fetchExternalPatients = useCallback(
    () => fetch(groupId),
    [fetch, groupId],
  )

  return {
    externalPatients: data ?? [],
    loading,
    error,
    fetchExternalPatients,
  }
}
