import { useEffect } from "react"
import { createLoaderStore } from "./_loader"
import { mockPatients } from "#/models/mocks/patients"
import type { Patient } from "#/models/patient"

// TODO: Replace with API request
function fetcher() {
  return new Promise<Patient[]>(r => r(mockPatients))
}

const useLoader = createLoaderStore(fetcher)

export const usePatients = () => {
  const { data, fetch, loading, error } = useLoader()

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    patients: data ?? [],
    loading,
    error,
    fetch
  }
}
