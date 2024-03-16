import { z } from "zod"
import { ViewRatingSchema } from "./rating"

export const ViewPatientSchema = z.object({
  patientId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstName: z.string(),
  arrivalDate: z.string(),
  departureDate: z.string().optional(),
  ratings: z.array(ViewRatingSchema),
  avatarUrl: z.string().optional(),
})

export type ViewPatient = z.infer<typeof ViewPatientSchema>
