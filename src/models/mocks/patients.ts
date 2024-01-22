import type { Patient } from "#/models/patient"
import { mockGroups } from "./groups"
import { mockRatings } from "./ratings"

const nameSet = new Set([
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
  "Anders",
  "Karsten",
  "Emilie",
  "Kristine",
  "Andrine",
  "Hannah",
  "Marie",
  "Sanna",
  "Sara",
  "Sander",
  "Pål",
  "Henrik",
  "Hector",
  "Øyvind",
  "Sindre",
  "Svein",
  "Lasse",
  "Lars",
  "Eirik",
  "Eivind",
  "Erik",
  "Eskil",
  "Emma",
  "Marthe",
  "Lisa",
  "Hedda",
  "Fanny",
  "Klamma",
  "Kari",
  "Kirsten",
  "Mette",
  "Gonna",
  "Dirrdrik",
  "Raymond",
  "Bjørn",
  "Bjarte",
  "Beate",
  "Hilde",
  "Tiril",
  "Jarle",
  "Jenny",
  "Ida",
  "Helene",
  "Simen",
  "Berit",
  "Gard",
  "Robert",
  "Roger",
  "Frode",
  "Brede",
  "Brage",
  "Randi",
  "Nora",
  "Olivia",
  "Oliver",
  "Ella",
  "Leah",
  "Iben",
  "Ada",
  "Astrid",
  "Selma",
  "Mia",
  "Amanda",
  "Amalie",
  "Solveig",
  "Agnes",
  "Tuva",
  "Live",
  "Jakob",
  "Isak",
  "William",
  "Filip",
  "Ludvig",
  "Oskar",
  "Emil",
  "Kasper",
  "Viktor",
  "Viktoria",
  "Adam",
  "Jonas",
  "Tor",
  "Odin"
])

const names = Array.from(nameSet)

export const mockPatients: Patient[] = []

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
    patientId: (Math.round(Math.random() * 1_000_000)).toString()
  }

  mockPatients.push({
    ...patient,
    ratings: mockRatings(patient)
  })
}
