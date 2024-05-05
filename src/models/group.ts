import { z } from "zod"
import { PatientSchema } from "./patient"

export const GroupSchema = z.object({
  groupId: z.string(),
  instId: z.string(),
  patients: z.array(PatientSchema),
})

export type Group = z.infer<typeof GroupSchema>
