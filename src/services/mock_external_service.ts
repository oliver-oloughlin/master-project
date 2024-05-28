import { Patient } from "#/models/patient"
import { Rating } from "#/models/rating"
import { Season, SeasonSchema } from "#/models/season"
import { names } from "./_names"
import { IExternalService } from "./external_service"
import { z } from "zod"
import { mockAdfectusGroups } from "./mock_adfectus_service"

export class MockExternalService implements IExternalService {
  async getPatients(groupId?: string): Promise<Patient[]> {
    if (!groupId) {
      return mockExternalPatients.map((p) =>
        fromExternalPatientToPatient(p, []),
      )
    }

    return mockExternalPatients
      .filter((p) => p.groupId === groupId)
      .map((p) => fromExternalPatientToPatient(p, []))
  }

  async getUser() {
    return mockExternalUser
  }
}

// Mappers
function fromExternalPatientToPatient(
  { userId, ...p }: ExternalPatient,
  ratings: Rating[],
): Patient {
  return {
    patientId: userId,
    ratings,
    ...p,
  }
}

// Models
const ExternalUserSchema = z.object({
  username: z.string(),
})

const ExternalPatientSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstName: z.string(),
  arrivalDate: z.string(),
  departureDate: z.string().optional(),
  season: SeasonSchema.default(Season.Summer),
})

type ExternalPatient = z.infer<typeof ExternalPatientSchema>
type ExternalUser = z.infer<typeof ExternalUserSchema>

// Mocks
const mockExternalUser: ExternalUser = { username: "olivol" }
const mockExternalPatients: ExternalPatient[] = []

const groupIds = mockAdfectusGroups.map((g) => g.groupId)
for (let i = 0; i < 300; i++) {
  const monthMs = 30 * 24 * 60 * 60 * 1_000
  const start = Date.now() - 6 * monthMs
  const end = Date.now() + 2 * monthMs
  const range = end - start
  const arrivalDate = new Date(start + Math.random() * range).toISOString()
  const firstName = names[Math.floor(Math.random() * names.length)]
  const groupId = groupIds[i % groupIds.length]

  mockExternalPatients.push({
    firstName,
    arrivalDate,
    groupId,
    instId: "BS",
    userId: Math.round(Math.random() * 1_000_000).toString(),
    season: Season.Summer,
  })
}
