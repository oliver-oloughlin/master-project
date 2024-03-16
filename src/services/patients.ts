import { mockAdfectusPatients } from "#/models/adfectus/mocks/patients"
import { ExternalPatient } from "#/models/external/patient"
import { mockExternalPatients } from "#/models/external/mocks/patients"
import { sleep } from "#/utils/sleep"
import { ViewPatient } from "#/models/view/patient"
import {
  fromAdfectusPatientToViewPatient,
  fromViewPatientToAdfectusPatient,
} from "#/mappers/patients"
import { getRatingsByPatientId } from "./ratings"

export async function updatePatientById(id: string, patient: ViewPatient) {
  try {
    await sleep(350)

    const index = mockAdfectusPatients.findIndex((p) => p.userId === id)
    if (index < 0) {
      return false
    }

    mockAdfectusPatients[index] = fromViewPatientToAdfectusPatient(patient)

    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export async function getPatientById(id: string): Promise<ViewPatient | null> {
  const adfectusPatient = mockAdfectusPatients.find((p) => p.userId === id)

  if (!adfectusPatient) {
    return null
  }

  const ratings = await getRatingsByPatientId(adfectusPatient.userId)
  return fromAdfectusPatientToViewPatient(adfectusPatient, ratings)
}

export async function getPatients(): Promise<ViewPatient[]> {
  return await Promise.all(
    mockAdfectusPatients.map(async (p) => {
      const ratings = await getRatingsByPatientId(p.userId)
      return fromAdfectusPatientToViewPatient(p, ratings)
    }),
  )
}

export async function getPatientsByGroupId(
  groupId: string,
): Promise<ViewPatient[]> {
  const patients = mockAdfectusPatients.filter((p) => p.groupId === groupId)
  return await Promise.all(
    patients.map(async (p) => {
      const ratings = await getRatingsByPatientId(p.userId)
      return fromAdfectusPatientToViewPatient(p, ratings)
    }),
  )
}

export async function addPatient(patient: ViewPatient) {
  await sleep(350)

  const adfectusPatient = fromViewPatientToAdfectusPatient(patient)

  const exists = mockAdfectusPatients.find(
    (p) => p.userId === adfectusPatient.userId,
  )

  if (exists) {
    return false
  }

  mockAdfectusPatients.push(adfectusPatient)
  return true
}

export async function getExternalPatients(
  groupId?: string,
): Promise<ExternalPatient[]> {
  await sleep(350)

  if (!groupId) {
    return mockExternalPatients
  }

  return mockExternalPatients.filter((p) => p.groupId === groupId)
}
