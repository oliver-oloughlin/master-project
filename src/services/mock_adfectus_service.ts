import type { Group } from "#/models/group"
import type { Patient } from "#/models/patient"
import type { Rating } from "#/models/rating"
import { Season, SeasonSchema } from "#/models/season"
import { DEFAULT_PATIENT_STAY_DURATION_DAYS } from "#/utils/constants"
import { ScoreTextMap } from "#/utils/score"
import { names } from "./_names"
import type { IAdfectusService } from "./adfectus_service"
import { z } from "zod"

export class MockAdfectusService implements IAdfectusService {
  async getGroupIds(): Promise<string[]> {
    return mockAdfectusGroups.map((g) => g.groupId)
  }

  async getGroupById(id: string): Promise<Group | null> {
    const group = mockAdfectusGroups.find((g) => g.groupId === id)

    if (!group) {
      return null
    }

    const patients = await this.getPatientsByGroupId(id)

    return {
      ...group,
      patients,
    }
  }

  async getRatingsByPatientId(id: string): Promise<Rating[]> {
    const patient = mockAdfectusPatients.find((p) => p.userId === id)

    if (!patient) {
      return []
    }

    const ratings = mockAdfectusRatings(patient)
    return ratings.map(fromAdfectusRatingToRating)
  }

  async getActivities(): Promise<string[]> {
    return mockActivities
  }

  async updatePatientById(id: string, patient: Patient) {
    try {
      const index = mockAdfectusPatients.findIndex((p) => p.userId === id)
      if (index < 0) {
        return false
      }

      mockAdfectusPatients[index] = fromPatientToAdfectusPatient(patient)

      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  async getPatientById(id: string): Promise<Patient | null> {
    const adfectusPatient = mockAdfectusPatients.find((p) => p.userId === id)

    if (!adfectusPatient) {
      return null
    }

    const ratings = await this.getRatingsByPatientId(adfectusPatient.userId)
    return fromAdfectusPatientToPatient(adfectusPatient, ratings)
  }

  async getPatients(): Promise<Patient[]> {
    return await Promise.all(
      mockAdfectusPatients.map(async (p) => {
        const ratings = await this.getRatingsByPatientId(p.userId)
        return fromAdfectusPatientToPatient(p, ratings)
      }),
    )
  }

  async getPatientsByGroupId(groupId: string): Promise<Patient[]> {
    const patients = mockAdfectusPatients.filter((p) => p.groupId === groupId)
    return await Promise.all(
      patients.map(async (p) => {
        const ratings = await this.getRatingsByPatientId(p.userId)
        return fromAdfectusPatientToPatient(p, ratings)
      }),
    )
  }

  async addPatient(patient: Patient) {
    const adfectusPatient = fromPatientToAdfectusPatient(patient)

    const exists = mockAdfectusPatients.find(
      (p) => p.userId === adfectusPatient.userId,
    )

    if (exists) {
      return false
    }

    mockAdfectusPatients.push(adfectusPatient)
    return true
  }
}

// Models
const AdfectusGroupSchema = z.object({
  groupId: z.string(),
  instId: z.string(),
})

const AdfectusPatientSchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  instId: z.string(),
  firstName: z.string(),
  arrivalDate: z.string(),
  season: SeasonSchema.default(Season.Summer),
  departureDate: z.string().optional(),
  avatarUrl: z.string().optional(),
})

const AdfectusStatusSchema = z.enum(["before", "mid", "final", "during"])

const AdfectusScoreSchema = z.object({
  activity: z.string(),
  score: z.number(),
})

const AdfectusRatingSchema = z.object({
  userId: z.string(),
  scores: z.array(AdfectusScoreSchema),
  status: AdfectusStatusSchema,
  timestamp: z.string(),
})

type AdfectusScore = z.infer<typeof AdfectusScoreSchema>
type AdfectusRating = z.infer<typeof AdfectusRatingSchema>
type AdfectusPatient = z.infer<typeof AdfectusPatientSchema>
type AdfectusGroup = z.infer<typeof AdfectusGroupSchema>

// Mappers
function fromAdfectusPatientToPatient(
  { userId, ...p }: AdfectusPatient,
  ratings: Rating[],
): Patient {
  return {
    patientId: userId,
    ratings,
    ...p,
  }
}

function fromPatientToAdfectusPatient({
  patientId,
  ...p
}: Patient): AdfectusPatient {
  return {
    userId: patientId,
    ...p,
  }
}

function fromAdfectusRatingToRating({ userId, ...r }: AdfectusRating): Rating {
  return {
    patientId: userId,
    ...r,
  }
}

// Mocks
export const mockAdfectusGroups: AdfectusGroup[] = [
  {
    groupId: "2C",
    instId: "Beitostølen",
  },
  {
    groupId: "2D",
    instId: "Beitostølen",
  },
  {
    groupId: "2E",
    instId: "Beitostølen",
  },
  {
    groupId: "1B",
    instId: "Beitostølen",
  },
]

const mockAdfectusPatients: AdfectusPatient[] = []

const groupIds = mockAdfectusGroups.map((g) => g.groupId)
for (let i = 0; i < 350; i++) {
  const monthMs = 30 * 24 * 60 * 60 * 1_000
  const start = Date.now() - 6 * monthMs
  const end = Date.now() + 2 * monthMs
  const range = end - start
  const arrivalDate = new Date(start + Math.random() * range).toISOString()
  const firstName = names[Math.floor(Math.random() * names.length)]
  const groupId = groupIds[i % groupIds.length]

  mockAdfectusPatients.push({
    firstName,
    arrivalDate,
    groupId,
    instId: "BS",
    userId: Math.round(Math.random() * 1_000_000).toString(),
    avatarUrl: "/patient_avatar.png",
    season: Season.Summer,
  })
}

const mockActivities = [
  "Basseng",
  "Ri på hest",
  "Klatring",
  "Gymsal",
  "Være på tur",
  "Friluftsliv",
  "Alpin",
  "Skøyter",
  "Langrenn",
  "Aktivitet skjerm",
  "Leke ute",
  "Bevegelse musikk",
  "Utendørs vann",
  "Sykle",
]

const scoreValues = Array.from(ScoreTextMap.keys())

function mockAdfectusRatings(patient: AdfectusPatient) {
  const ratings: AdfectusRating[] = []

  const arrivalDate = new Date(patient.arrivalDate)

  const departureDate = patient.departureDate
    ? new Date(patient.departureDate)
    : new Date(
        arrivalDate.valueOf() +
          DEFAULT_PATIENT_STAY_DURATION_DAYS * 24 * 60 * 60 * 1_000,
      )

  const statuses = new Set(Object.values(AdfectusStatusSchema.Values))

  if (arrivalDate.valueOf() > Date.now()) {
    statuses.delete("during")
    statuses.delete("mid")
    statuses.delete("final")
  }

  if (departureDate.valueOf() > Date.now()) {
    statuses.delete("final")
  }

  for (const status of statuses) {
    const n = status === "during" ? 3 : 1
    for (let i = 0; i < n; i++) {
      const scores: AdfectusScore[] = mockActivities.map((activity) => ({
        activity,
        score: scoreValues[Math.floor(Math.random() * scoreValues.length)],
      }))

      const arrivalDepartureDIff =
        departureDate.valueOf() - arrivalDate.valueOf()

      const timestampDate =
        status === "before"
          ? new Date(arrivalDate.valueOf() - 7 * 24 * 60 * 60 * 1_000)
          : status === "mid"
            ? new Date(arrivalDate.valueOf() + arrivalDepartureDIff / 2)
            : status === "final"
              ? departureDate
              : new Date(
                  arrivalDate.valueOf() + Math.random() * arrivalDepartureDIff,
                )

      ratings.push({
        userId: patient.userId,
        scores,
        status,
        timestamp: timestampDate.toISOString(),
      })
    }
  }

  return ratings
}
