import { z } from "zod"

export const PatientSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstName: z.string(),
  arrivalDate: z.string(),
})

export type Patient = z.infer<typeof PatientSchema>
