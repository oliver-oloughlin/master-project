import type { Patient } from "#/models/view/patient"
import type { Rating } from "#/models/view/rating"

export type ScoreTimestamp = {
  score: number
  timestamp: string
}

export type ActivityRatingMap = Map<string, ScoreTimestamp[]>

export type PatientStatus = "arriving" | "present" | "departed"

export type RatingData = Pick<Rating, "scores" | "timestamp">

export function patientStatus(patient: Patient): PatientStatus {
  const arrival = new Date(patient.arrivalDate).valueOf()
  const departure = patient.departureDate
    ? new Date(patient.departureDate).valueOf()
    : arrival.valueOf() + 1000 * 60 * 60 * 24 * 7 * 3
  const now = Date.now()
  return arrival > now ? "arriving" : departure < now ? "departed" : "present"
}

export function scoresByActivity(ratings: RatingData[]): ActivityRatingMap {
  const activityScoresMap = new Map<string, ScoreTimestamp[]>()

  ratings.forEach(({ timestamp, scores }) => {
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

export function averageScoresAndCount(ratings: RatingData[]) {
  const activityScoresCountMap = new Map<string, Map<number, number>>()
  const averageAcitvityScoresMap = new Map<
    string,
    { score: number; count: number }
  >()

  ratings.forEach((rating) => {
    rating.scores.forEach((score) => {
      const scoresCountMap =
        activityScoresCountMap.get(score.activity) ?? new Map<number, number>()
      const scoresCount = scoresCountMap.get(score.score) ?? 0
      scoresCountMap.set(score.score, scoresCount + 1)
      activityScoresCountMap.set(score.activity, scoresCountMap)
    })
  })

  activityScoresCountMap.forEach((scoresCountMap, activity) => {
    let scoreSum = 0
    scoresCountMap.forEach((scoreCount, score) => {
      scoreSum += scoreCount * score
    })

    const averageScore = Math.round(scoreSum / ratings.length)

    averageAcitvityScoresMap.set(activity, {
      score: averageScore,
      count: scoresCountMap.size,
    })
  })

  return {
    activityScoresCountMap,
    averageAcitvityScoresMap,
  }
}

export function dailyAverageScoresByWeeklyWindow(
  ratings: RatingData[],
  start: Date,
  end: Date,
) {
  const dailyAverageScoresByAcitivty: ActivityRatingMap = new Map()
  const DAY_TO_MS = 24 * 60 * 60 * 1_000
  const startMs = start.valueOf()
  const endMs = end.valueOf()

  if (startMs > endMs) {
    throw Error("Start can not be higher (later) than end")
  }

  for (
    let current = startMs;
    current < endMs + DAY_TO_MS;
    current += DAY_TO_MS
  ) {
    const from = current - 3 * DAY_TO_MS
    const to = current + 3 * DAY_TO_MS

    const windowRatings = ratings.filter((r) => {
      const timestamp = new Date(r.timestamp).valueOf()
      return timestamp >= from && timestamp <= to
    })

    const { averageAcitvityScoresMap } = averageScoresAndCount(windowRatings)

    averageAcitvityScoresMap.forEach((avgScore, activity) => {
      const activityAvgScores = dailyAverageScoresByAcitivty.get(activity) ?? []
      activityAvgScores.push({
        score: avgScore.score,
        timestamp: new Date(current).toISOString(),
      })
      dailyAverageScoresByAcitivty.set(activity, activityAvgScores)
    })
  }

  return dailyAverageScoresByAcitivty
}
