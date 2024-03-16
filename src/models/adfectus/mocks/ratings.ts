import {
  AdfectusRating,
  AdfectusScore,
  AdfectusStatusSchema,
} from "../../adfectus/rating.ts"
import type { AdfectusPatient } from "../../adfectus/patient.ts"
import { ScoreMap } from "#/utils/score.ts"
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

export function mockAdfectusRatings(patient: AdfectusPatient) {
  const ratings: AdfectusRating[] = []

  const arrivalDate = new Date(patient.arrivalDate)

  const departureDate = patient.departureDate
    ? new Date(patient.departureDate)
    : new Date(
        arrivalDate.valueOf() +
          DEFAULT_PATIENT_STAY_DURATION_DAYS * 24 * 60 * 60 * 1_000,
      )

  const statuses = new Set(Object.values(AdfectusStatusSchema.Values))

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
      const scores: AdfectusScore[] = activities.map((activity) => ({
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
        userId: patient.userId,
        scores,
        status,
        timestamp: timestampDate.toISOString(),
      })
    }
  }

  return ratings
}
