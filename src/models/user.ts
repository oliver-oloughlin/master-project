import { z } from "zod"

export const UserSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstName: z.string(),
  arrivalDate: z.string(),
})

export type User = z.infer<typeof UserSchema>
