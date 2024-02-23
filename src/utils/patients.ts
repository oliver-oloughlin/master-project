import { Patient } from "#/models/patient"

export type ScoreTimestamp = {
  score: number
  timestamp: string
}

export type PatientStatus = "arriving" | "present" | "departed"

export function patientScoresByActivity(patient: Patient) {
  const activityScoresMap = new Map<string, ScoreTimestamp[]>()

  patient.ratings.forEach(({ timestamp, scores }) => {
    scores.forEach(({ score, activity }) => {
      const activityScores = activityScoresMap.get(activity) ?? []
      activityScores.push({
        timestamp,
        score,
      })
      activityScoresMap.set(activity, activityScores)
    })
  })

  return activityScoresMap
}

export function patientStatus(patient: Patient): PatientStatus {
  const arrival = new Date(patient.arrivalDate).valueOf()
  const departure = patient.departureDate ? new Date(patient.departureDate).valueOf() : arrival.valueOf() + 1000 * 60 * 60 * 24 * 7 * 3
  const now = Date.now()
  return arrival > now ? "arriving" : departure < now ? "departed" : "present"
}
