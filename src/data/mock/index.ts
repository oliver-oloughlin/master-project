import { DataSchema } from "#/data/models"
import json from "./data.json"

export const data = DataSchema.parse(json)
