import { z } from "zod"
import { RatingSchema } from "./rating"
import { Season, SeasonSchema } from "./season"

export const PatientSchema = z.object({
  patientId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstName: z.string(),
  arrivalDate: z.string(),
  departureDate: z.string().optional(),
  ratings: z.array(RatingSchema),
  avatarUrl: z.string().optional(),
  season: SeasonSchema.default(Season.Summer),
})

export type Patient = z.infer<typeof PatientSchema>
