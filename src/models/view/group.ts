import { z } from "zod"
import { ViewPatientSchema } from "./patient"

export const ViewGroupSchema = z.object({
  groupId: z.string(),
  instId: z.string(),
  patients: z.array(ViewPatientSchema),
})

export type ViewGroup = z.infer<typeof ViewGroupSchema>
