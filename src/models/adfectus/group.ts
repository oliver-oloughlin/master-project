import { z } from "zod"

export const AdfectusGroupSchema = z.object({
  groupId: z.string(),
  instId: z.string(),
})

export type AdfectusGroup = z.infer<typeof AdfectusGroupSchema>
