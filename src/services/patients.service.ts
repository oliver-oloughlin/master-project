import { mockPatients } from "#/models/mocks/patients"
import type { Patient } from "#/models/patient"
import { sleep } from "#/utils/sleep"

export async function updatePatient(patientId: string, data: Partial<Patient>) {
  try {
    await sleep(500)

    const index = mockPatients.findIndex(p => p.patientId === patientId)
    if (index < 0) {
      return false
    }

    const patient = mockPatients[index]
    mockPatients[index] = {
      ...patient,
      ...data,
    }

    return true
  } catch (e) {
    console.error(e)
    return false
  }
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
