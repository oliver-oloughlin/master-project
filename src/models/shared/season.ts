import { z } from "zod"

export enum Season {
  Winter = 0,
  Summer = 1,
}

export const SeasonSchema = z.literal<Season>(Season.Summer)
