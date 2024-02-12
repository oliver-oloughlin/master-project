import { createLoaderStore } from "./_loader"
import { getPatients, getPatientById, updatePatientById, addPatient as _addPatient } from "#/services/patients.service"
import { Patient } from "#/models/patient"

const usePatientsLoader = createLoaderStore(getPatients)

export type PatientsView = Awaited<ReturnType<typeof getPatients>>

export const usePatients = () => {
  const { data, fetch, loading, error, mutate } = usePatientsLoader()

  /**
   * Get a patient by id
   * 
   * @param patientId 
   * @returns 
   */
  function getPatient(patientId: string) {
    return data?.find(p => p.patientId === patientId) ?? null
  }

  /**
   * Update a patient by id
   * 
   * @param patientId 
   * @param patientData 
   * @returns 
   */
  async function updatePatient(patientId: string, patientData: Partial<Patient>) {
    const success = await updatePatientById(patientId, patientData)
    if (!success) {
      return success
    }

    const newPatient = await getPatientById(patientData.patientId ?? patientId)
    if (!newPatient) {
      return success
    }

    mutate(data => {
      const index = data?.findIndex(p => p.patientId === patientId)
      if (!index) {
        return data
      }

      return [...data.slice(0, index), newPatient, ...data.slice(index + 1)]
    })

    return success
  }

  /**
   * Add a new patient
   * 
   * @param patient 
   * @returns 
   */
  async function addPatient(patient: Patient) {
    const success = await _addPatient(patient)
    if (success) {
      mutate(data => [...data, patient])
    }
    return success
  }

  // Exposed view
  return {
    patients: data ?? [],
    loading,
    error,
    fetchPatients: fetch,
    getPatient,
    updatePatient,
    addPatient,
  }
}
