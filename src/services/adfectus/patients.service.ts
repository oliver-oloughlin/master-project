import { mockAdfectusPatients } from "#/models/adfectus/mocks/patients"
import type { AdfectusPatient } from "#/models/adfectus/patient"
import { sleep } from "#/utils/sleep"

export async function updateAdfectusPatientById(
  id: string,
  data: Partial<AdfectusPatient>,
) {
  try {
    await sleep(350)

    const index = mockAdfectusPatients.findIndex((p) => p.userId === id)
    if (index < 0) {
      return false
    }

    const patient = mockAdfectusPatients[index]
    mockAdfectusPatients[index] = {
      ...patient,
      ...data,
    }

    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export async function getAdfectusPatientById(id: string) {
  await sleep(350)
  return mockAdfectusPatients.find((p) => p.userId === id) ?? null
}

export async function getAdfectusPatients() {
  await sleep(350)
  return mockAdfectusPatients
}

export async function getAdfectusPatientsByGroupId(groupId: string) {
  await sleep(350)
  return mockAdfectusPatients.filter((p) => p.groupId === groupId)
}

export async function addAdfectusPatient(patient: AdfectusPatient) {
  await sleep(350)
  const exists = mockAdfectusPatients.find((p) => p.userId === patient.userId)

  if (exists) {
    return false
  }

  mockAdfectusPatients.push(patient)
  return true
}
