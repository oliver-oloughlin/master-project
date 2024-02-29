import { client, resource } from "@oliver_nexro/zod_api"
import { UserSchema } from "./models/User"
import { z } from "zod"

export const adfectusGatewayApiClient = client({
  fetcher: fetch,
  baseUrl: "http://localhost:8200",
  logger: console,
  resources: {
    users: resource("/users", {
      actions: {
        post: {
          bodySchema: UserSchema,
          headersSchema: z.object({
            Authorization: z.string(),
          }),
          searchParamsSchema: z.object({
            vendor: z.enum(["adfectus"]),
          }),
        },
      },
    }),
  },
})
