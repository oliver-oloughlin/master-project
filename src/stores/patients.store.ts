import { createLoaderStore } from "./_loader"
import { getPatientById, getPatients } from "#/services/patients.service"

const usePatientsLoader = createLoaderStore(getPatients)

export type PatientsView = ReturnType<typeof getPatients>

export const usePatients = () => {
  const { data, fetch, loading, error, mutate } = usePatientsLoader()

  async function invalidatePatient(patientId: string) {
    const patient = await getPatientById(patientId)

    // Returning a new list is important to make React re-render and reflect any changes
    mutate((data) => {
      const index = data.findIndex(p => p.patientId === patientId)

      if (index < 0 && !patient) {
        return [...data]
      }

      if (!patient) {
        return [...data.slice(0, index), ...data.slice(index + 1)]
      }

      if (index < 0) {
        data.push(patient)
        return [...data]
      }

      data[index] = patient
      return [...data]
    })
  }

  return {
    patients: data ?? [],
    loading,
    error,
    fetchPatients: fetch,
    invalidatePatient,
  }
}
