import { createLoaderStore } from "#/utils/zustand"
import { AdfectusService } from "#/services/adfectus_service"
import type { ViewPatient } from "#/models/view/patient"

const store = createLoaderStore(() => AdfectusService.getPatients())

export const usePatients = () => {
  const { data, loading, error, init, mutate } = store()

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
  async function updatePatient(patientId: string, data: ViewPatient) {
    const success = await AdfectusService.updatePatientById(patientId, data)

    if (!success) {
      return success
    }

    const newPatient = await AdfectusService.getPatientById(data.patientId)
    if (!newPatient) {
      return success
    }

    await mutate((data) => {
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
  async function addPatient(patient: ViewPatient) {
    const success = await AdfectusService.addPatient(patient)
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
    get patients() {
      init()
      return data ?? []
    },
    loading,
    error,
    getPatient,
    updatePatient,
    addPatient,
  }
}
