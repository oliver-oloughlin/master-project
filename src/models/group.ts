import { z } from "zod"

export const GroupSchema = z.object({
  groupId: z.string(),
  instId: z.string(),
})

export type Group = z.infer<typeof GroupSchema>
