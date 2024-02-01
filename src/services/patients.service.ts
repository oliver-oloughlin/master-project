import { mockPatients } from "#/models/mocks/patients"
import type { Patient } from "#/models/patient"
import { sleep } from "#/utils/sleep"

export async function updatePatient(patient: Patient) {
  await sleep(500)

  const index = mockPatients.findIndex(p => p.patientId === patient.patientId)
  if (index < 0) {
    return false
  }

  mockPatients[index] = patient
  return true
}

export async function getPatientById(patientId: string) {
  await sleep(500)
  return mockPatients.find(p => p.patientId === patientId) ?? null
}

export async function getPatients() {
  await sleep(500)
  return mockPatients
}

export async function getPatientsByGroupId(groupId: string) {
  await sleep(500)
  return mockPatients.filter(p => p.groupId === groupId)
}
