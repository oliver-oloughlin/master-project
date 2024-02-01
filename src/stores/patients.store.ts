import { useEffect } from "react"
import { FetcherView, createLoaderStore } from "./_loader"
import type { Patient } from "#/models/patient"
import { getPatients, updatePatient as update } from "#/services/patients.service"

const usePatientsLoader = createLoaderStore(getPatients)

export type PatientsView = FetcherView<typeof getPatients>

export const usePatients = () => {
  const { data, fetch, loading, error, mutate } = usePatientsLoader()

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
