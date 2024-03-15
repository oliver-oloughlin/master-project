import { createLoaderStore, useLoaderStore } from "#/utils/zustand"
import {
  getPatients,
  getPatientById,
  updatePatientById,
  addPatient,
} from "#/services/patients"
import type { ViewPatient } from "#/models/view/patient"

const store = createLoaderStore(getPatients)

export const usePatients = () => {
  const { data, fetch, loading, error, mutate } = useLoaderStore(store)

  /**
   * Get a patient by id
   *
   * @param patientId
   * @returns
   */
  function getPatient(patientId: string) {
    return data?.find((p) => p.patientId === patientId) ?? null
  }

  /**
   * Update a patient by id
   *
   * @param patientId
   * @param patientData
   * @returns
   */
  async function updatePatient(
    patientId: string,
    patientData: Partial<Patient>,
  ) {
    const success = await updatePatientById(patientId, patientData)
    if (!success) {
      return success
    }

    const newPatient = await getPatientById(patientData.patientId ?? patientId)
    if (!newPatient) {
      return success
    }

    mutate((data) => {
      const index = data?.findIndex((p) => p.patientId === patientId)
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
      mutate((data) =>
        data.some((p) => p.patientId === patient.patientId)
          ? [...data]
          : [...data, patient],
      )
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
