import { z } from "zod"

export const UserSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstname: z.string(),
  arrivalDate: z.string(),
})

export const PostUserSchema = z.object({
  recipient: z.enum(["adfectus"]).default("adfectus"),
  user: UserSchema
})
