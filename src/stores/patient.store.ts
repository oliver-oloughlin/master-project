import { Patient } from "#/models/patient"
import { getPatientById, updatePatient } from "#/services/patients.service"
import { createLoaderStore } from "./_loader"
import { usePatients } from "./patients.store"

const usePatientLoader = createLoaderStore(getPatientById)

export type PatientView = ReturnType<typeof usePatient>

export const usePatient = (patientId: string) => {
  const { data, fetch, loading, error } = usePatientLoader()
  const { invalidatePatient } = usePatients()

  async function update(data: Partial<Patient>) {
    const success = await updatePatient(patientId, data)
    if (success) await invalidatePatient(patientId)
    return success
  }

  return {
    patient: data,
    loading,
    error,
    fetchPatient: fetch,
    updatePatient: update,
  }
}
