import { z } from "zod"
import { Season, SeasonSchema } from "../shared/season"

export const AdfectusPatientSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstName: z.string(),
  arrivalDate: z.string(),
  season: SeasonSchema.default(Season.Summer),
  departureDate: z.string().optional(),
  avatarUrl: z.string().optional(),
})

export type AdfectusPatient = z.infer<typeof AdfectusPatientSchema>
