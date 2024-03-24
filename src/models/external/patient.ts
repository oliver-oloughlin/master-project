import { z } from "zod"
import { Season, SeasonSchema } from "../shared/season"

export const ExternalPatientSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstName: z.string(),
  arrivalDate: z.string(),
  departureDate: z.string().optional(),
  season: SeasonSchema.default(Season.Summer),
})

export type ExternalPatient = z.infer<typeof ExternalPatientSchema>
