import { z } from "zod"

export const AdfectusPatientSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstName: z.string(),
  arrivalDate: z.string(),
  departureDate: z.string().optional(),
  avatarUrl: z.string().optional(),
})

export type AdfectusPatient = z.infer<typeof AdfectusPatientSchema>
