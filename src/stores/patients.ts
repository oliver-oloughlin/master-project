import { useEffect } from "react"
import { createLoaderStore } from "./_loader"
import { mockPatients } from "#/models/mocks/patients"
import type { Patient } from "#/models/patient"
import { updatePatient as update } from "#/services/patient"

// TODO: Replace with API request
function fetcher() {
  return new Promise<Patient[]>(r => r(mockPatients))
}

const useLoader = createLoaderStore(fetcher)

export const usePatients = () => {
  const { data, fetch, loading, error, mutate } = useLoader()

  // Update patient and reflect update in patients list
  async function updatePatient(patient: Patient) {
    const success = await update(patient)
    if (!success) {
      return
    }

    mutate(data => {
      const index = data.findIndex(p => p.patientId)

      if (index >= 0) {
        data[index] = patient
      }

      return data
    })
  }

  // Fetch users on initial load
  useEffect(() => {
    fetch()
  }, [fetch])

  // Exposed values
  return {
    patients: data ?? [],
    loading,
    error,
    fetch,
    updatePatient,
  }
}
