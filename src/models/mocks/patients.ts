import type { Patient } from "#/models/patient"
import { mockGroups } from "./groups"
import { mockRatings } from "./ratings"
import { names } from "./_names"

export const mockPatients: Patient[] = []

for (let i = 0; i < 350; i++) {
  const monthMs = 30 * 24 * 60 * 60 * 1_000
  const start = Date.now() - 6 * monthMs
  const end = Date.now() + 2 * monthMs
  const range = end - start
  const arrivalDate = new Date(start + Math.random() * range).toISOString()
  const firstName = names[Math.floor(Math.random() * names.length)]
  const groupId = mockGroups[i % mockGroups.length].groupId

  const patient = {
    firstName,
    arrivalDate,
    groupId,
    instId: "BS",
    patientId: Math.round(Math.random() * 1_000_000).toString(),
    avatarUrl: "/patient_avatar.png",
  }

  mockPatients.push({
    ...patient,
    ratings: mockRatings(patient),
  })
}
