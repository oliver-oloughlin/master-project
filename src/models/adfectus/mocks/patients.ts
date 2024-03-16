import type { AdfectusPatient } from "../patient"
import { mockAdfectusGroups } from "./groups"
import { names } from "./_names"

export const mockAdfectusPatients: AdfectusPatient[] = []

const groupIds = mockAdfectusGroups.map((g) => g.groupId)
for (let i = 0; i < 350; i++) {
  const monthMs = 30 * 24 * 60 * 60 * 1_000
  const start = Date.now() - 6 * monthMs
  const end = Date.now() + 2 * monthMs
  const range = end - start
  const arrivalDate = new Date(start + Math.random() * range).toISOString()
  const firstName = names[Math.floor(Math.random() * names.length)]
  const groupId = groupIds[i % groupIds.length]

  mockAdfectusPatients.push({
    firstName,
    arrivalDate,
    groupId,
    instId: "BS",
    userId: Math.round(Math.random() * 1_000_000).toString(),
    avatarUrl: "/patient_avatar.png",
  })
}
