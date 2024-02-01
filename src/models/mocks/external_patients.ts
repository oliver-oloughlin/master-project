import type { ExternalPatient } from "../external_patient"
import { mockGroups } from "./groups"
import { names } from "./_names"

export const mockExternalPatients: ExternalPatient[] = []

for (let i = 0; i < 300; i++) {
  const start = new Date("2023-05-01").valueOf()
  const end = new Date("2024-05-01").valueOf()
  const range = end - start
  const arrivalDate = new Date(start + Math.random() * range).toISOString()
  const firstName = names[Math.floor(Math.random() * names.length)]
  const groupId = mockGroups[i % mockGroups.length].groupId

  const patient = {
    firstName,
    arrivalDate,
    groupId,
    instId: "BS",
    patientId: (Math.round(Math.random() * 1_000_000)).toString(),
  }

  mockExternalPatients.push({
    ...patient,
  })
}
