import type { ExternalPatient } from "../patient"
import { mockAdfectusGroups } from "../../adfectus/mocks/groups"
import { names } from "../../adfectus/mocks/_names"

export const mockExternalPatients: ExternalPatient[] = []

const groupIds = mockAdfectusGroups.map((g) => g.groupId)
for (let i = 0; i < 300; i++) {
  const monthMs = 30 * 24 * 60 * 60 * 1_000
  const start = Date.now() - 6 * monthMs
  const end = Date.now() + 2 * monthMs
  const range = end - start
  const arrivalDate = new Date(start + Math.random() * range).toISOString()
  const firstName = names[Math.floor(Math.random() * names.length)]
  const groupId = groupIds[i % groupIds.length]

  const patient = {
    firstName,
    arrivalDate,
    groupId,
    instId: "BS",
    userId: Math.round(Math.random() * 1_000_000).toString(),
  }

  mockExternalPatients.push({
    ...patient,
  })
}
