import { Rating, Score, ScoreMap, StatusSchema } from "../rating"
import type { Patient } from "../patient.ts"
import { DEFAULT_PATIENT_STAY_DURATION_DAYS } from "#/utils/constants.ts"

const activities = [
  "Basseng",
  "Ri på hest",
  "Klatring",
  "Gymsal",
  "Være på tur",
  "Friluftsliv",
  "Alpin",
  "Skøyter",
  "Langrenn",
  "Aktivitet skjerm",
  "Leke ute",
  "Bevegelse musikk",
  "Utendørs vann",
  "Sykle",
]

const scoreValues = Array.from(ScoreMap.keys())

export function mockRatings(patient: Omit<Patient, "ratings">) {
  const ratings: Rating[] = []

  const arrivalDate = new Date(patient.arrivalDate)

  const departureDate = patient.departureDate
    ? new Date(patient.departureDate)
    : new Date(
        arrivalDate.valueOf() +
          DEFAULT_PATIENT_STAY_DURATION_DAYS * 24 * 60 * 60 * 1_000,
      )

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
      const scores: Score[] = activities.map((activity) => ({
        activity,
        score: scoreValues[Math.floor(Math.random() * scoreValues.length)],
      }))

      const arrivalDepartureDIff =
        departureDate.valueOf() - arrivalDate.valueOf()

      const timestampDate =
        status === "before"
          ? new Date(arrivalDate.valueOf() - 7 * 24 * 60 * 60 * 1_000)
          : status === "mid"
            ? new Date(arrivalDate.valueOf() + arrivalDepartureDIff / 2)
            : status === "final"
              ? departureDate
              : new Date(
                  arrivalDate.valueOf() + Math.random() * arrivalDepartureDIff,
                )

      ratings.push({
        patientId: patient.patientId,
        scores,
        status,
        timestamp: timestampDate.toISOString(),
      })
    }
  }

  return ratings
}
