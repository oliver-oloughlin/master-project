import { Patient } from "#/models/patient"

export type ScoreTimestamp = {
  score: number
  timestamp: string
}

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
