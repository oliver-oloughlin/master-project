import { z } from "zod"

export const UserSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstname: z.string(),
  arrivalDate: z.string(),
})
