import { z } from "zod"

export const ViewStatusSchema = z.enum(["before", "mid", "final", "during"])

export const ViewScoreSchema = z.object({
  activity: z.string(),
  score: z.number(),
})

export const ViewRatingSchema = z.object({
  patientId: z.string(),
  scores: z.array(ViewScoreSchema),
  status: ViewStatusSchema,
  timestamp: z.string(),
})

export type ViewStatus = z.infer<typeof ViewStatusSchema>
export type ViewScore = z.infer<typeof ViewScoreSchema>
export type ViewRating = z.infer<typeof ViewRatingSchema>
