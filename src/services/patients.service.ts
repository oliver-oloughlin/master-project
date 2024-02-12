import { mockPatients } from "#/models/mocks/patients"
import type { Patient } from "#/models/patient"
import { sleep } from "#/utils/sleep"

export async function updatePatientById(patientId: string, data: Partial<Patient>) {
  try {
    await sleep(350)

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
  await sleep(350)
  return mockPatients.find(p => p.patientId === patientId) ?? null
}

export async function getPatients() {
  await sleep(350)
  return mockPatients
}

export async function getPatientsByGroupId(groupId: string) {
  await sleep(350)
  return mockPatients.filter(p => p.groupId === groupId)
}

export async function addPatient(patient: Patient) {
  await sleep(350)
  const exists = mockPatients.find(p => p.patientId === patient.patientId)
  if (exists) {
    return false
  }
  mockPatients.push(patient)
  return true
}
