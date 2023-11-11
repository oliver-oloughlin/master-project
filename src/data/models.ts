import { z } from "zod"

export const UserSchema = z.object({
  userId: z.string(),
  name: z.string(),
  arrivalDate: z.string(),
})

export const GroupSchema = z.object({
  groupId: z.string(),
  users: z.array(UserSchema),
})

export const DataSchema = z.object({
  groups: z.array(GroupSchema)
})

export type User = z.infer<typeof UserSchema>

export type Group = z.infer<typeof GroupSchema>

export type Data = z.infer<typeof DataSchema>
