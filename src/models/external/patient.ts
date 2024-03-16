import { z } from "zod"

export const ExternalPatientSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstName: z.string(),
  arrivalDate: z.string(),
  departureDate: z.string().optional(),
})

export type ExternalPatient = z.infer<typeof ExternalPatientSchema>
