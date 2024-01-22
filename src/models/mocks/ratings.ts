import { Rating, Score, StatusSchema } from "../rating"
import type { Patient } from "../patient.ts"
import { DEFAULT_PATIENT_STAY_DURATION_DAYS } from "#/utils/constants.ts"

const activities = [
  "swimming",
  "horseback riding",
  "hiking",
  "fishing",
]

const scoreValues = [
  1,
  2,
  3,
  4,
  5,
]

export function mockRatings(patient: Omit<Patient, "ratings">) {
  const ratings: Rating[] = []

  const arrivalDate = new Date(patient.arrivalDate)

  const departureDate = patient.departureDate 
    ? new Date(patient.departureDate) 
    : new Date(arrivalDate.valueOf() + DEFAULT_PATIENT_STAY_DURATION_DAYS * 24 * 60 * 60 * 1_000)
  
  const statuses = new Set(Object.values(StatusSchema.Values))

  if (arrivalDate.valueOf() > Date.now()) {
    statuses.delete("during")
    statuses.delete("mid")
    statuses.delete("final")
  }

  if (departureDate.valueOf() > Date.now()) {
    statuses.delete("final")
  }

  for (const status of statuses) {
    const n = status === "during" ? 3 : 1
    for (let i = 0; i < n; i++) {
      const scores: Score[] = activities.map(activity => ({
        activity,
        score: scoreValues[Math.floor(Math.random() * scoreValues.length)]
      }))
  
      const min = new Date("2022-05-01").valueOf()
      const max = Date.now()
      const diff = max - min
  
      ratings.push({
        patientId: patient.patientId,
        scores,
        status,
        timestamp: new Date(min + Math.random() * diff).toISOString()
      })
    }
  }

  return ratings
}
