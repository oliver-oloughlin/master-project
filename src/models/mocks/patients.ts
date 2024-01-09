import type { Patient } from "#/models/patient"
import { mockGroups } from "./groups"

const names = [
  "Adrian",
  "Hermine",
  "Fredrik",
  "Sofie",
  "Ingrid",
  "Petter",
  "Frida",
  "Elias",
  "Aksel",
  "Vilde",
  "Ola",
  "Anna",
  "Ole",
  "Per",
  "Julie",
  "Kåre",
  "Elise",
  "Lukas",
  "Martin",
  "Markus",
  "Martine",
  "Maria",
  "Herman",
  "Karoline",
  "Linnea",
  "Lise",
  "Kristoffer",
  "Birthe",
  "Sandra",
]

export const mockPatients: Patient[] = []

for (let i = 0; i < 300; i++) {
  const start = new Date("2023-05-01").valueOf()
  const end = new Date("2024-05-01").valueOf()
  const range = end - start
  const arrivalDate = new Date(start + Math.random() * range).toISOString()
  const firstName = names[Math.floor(Math.random() * names.length)]
  const groupId = mockGroups[i % mockGroups.length].groupId
  mockPatients.push({
    firstName,
    arrivalDate,
    groupId,
    instId: "BS",
    userId: (Math.round(Math.random() * 1_000_000)).toString()
  })
}
