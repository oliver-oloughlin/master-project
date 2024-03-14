import { z } from "zod"

export const AdfectusStatusSchema = z.enum(["before", "mid", "final", "during"])

export const AdfectusScoreSchema = z.object({
  activity: z.string(),
  score: z.number(),
})

export const AdfectusRatingSchema = z.object({
  userId: z.string(),
  scores: z.array(AdfectusScoreSchema),
  status: AdfectusStatusSchema,
  timestamp: z.string(),
})

export type AdfectusStatus = z.infer<typeof AdfectusStatusSchema>
export type AdfectusScore = z.infer<typeof AdfectusScoreSchema>
export type AdfectusRating = z.infer<typeof AdfectusRatingSchema>
