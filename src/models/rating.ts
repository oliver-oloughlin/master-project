import { z } from "zod"

export const StatusSchema = z.enum(["before", "mid", "final", "during"])

export const ScoreSchema = z.object({
  activity: z.string(),
  score: z.number(),
})

export const RatingSchema = z.object({
  patientId: z.string(),
  scores: z.array(ScoreSchema),
  status: StatusSchema,
  timestamp: z.string(),
})

export const ScoreMap = new Map([
  [1, "Skummelt"],
  [2, "Ikke Gøy"],
  [3, "Vet Ikke"],
  [4, "Litt Gøy"],
  [5, "Veldig Gøy"]
])

export type Status = z.infer<typeof StatusSchema>
export type Score = z.infer<typeof ScoreSchema>
export type Rating = z.infer<typeof RatingSchema>
