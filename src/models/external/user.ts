import { z } from "zod"

export const ExternalUserSchema = z.object({
  username: z.string(),
})

export type ExternalUser = z.infer<typeof ExternalUserSchema>
