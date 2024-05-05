import {
  fromAdfectusPatientToViewPatient,
  fromViewPatientToAdfectusPatient,
} from "#/mappers/patients"
import { fromAdfectusRatingToViewRating } from "#/mappers/ratings"
import { mockAdfectusGroups } from "#/models/adfectus/mocks/groups"
import { mockAdfectusPatients } from "#/models/adfectus/mocks/patients"
import {
  mockActivities,
  mockAdfectusRatings,
} from "#/models/adfectus/mocks/ratings"
import { ViewGroup } from "#/models/view/group"
import { ViewPatient } from "#/models/view/patient"
import { ViewRating } from "#/models/view/rating"
import type { IAdfectusService } from "./adfectus_service"

export class MockAdfectusService implements IAdfectusService {
  async getGroupIds(): Promise<string[]> {
    return mockAdfectusGroups.map((g) => g.groupId)
  }

  async getGroupById(id: string): Promise<ViewGroup | null> {
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

  async getRatingsByPatientId(id: string): Promise<ViewRating[]> {
    const patient = mockAdfectusPatients.find((p) => p.userId === id)

    if (!patient) {
      return []
    }

    const ratings = mockAdfectusRatings(patient)
    return ratings.map(fromAdfectusRatingToViewRating)
  }

  async getActivities(): Promise<string[]> {
    return mockActivities
  }

  async updatePatientById(id: string, patient: ViewPatient) {
    try {
      const index = mockAdfectusPatients.findIndex((p) => p.userId === id)
      if (index < 0) {
        return false
      }

      mockAdfectusPatients[index] = fromViewPatientToAdfectusPatient(patient)

      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  async getPatientById(id: string): Promise<ViewPatient | null> {
    const adfectusPatient = mockAdfectusPatients.find((p) => p.userId === id)

    if (!adfectusPatient) {
      return null
    }

    const ratings = await this.getRatingsByPatientId(adfectusPatient.userId)
    return fromAdfectusPatientToViewPatient(adfectusPatient, ratings)
  }

  async getPatients(): Promise<ViewPatient[]> {
    return await Promise.all(
      mockAdfectusPatients.map(async (p) => {
        const ratings = await this.getRatingsByPatientId(p.userId)
        return fromAdfectusPatientToViewPatient(p, ratings)
      }),
    )
  }

  async getPatientsByGroupId(groupId: string): Promise<ViewPatient[]> {
    const patients = mockAdfectusPatients.filter((p) => p.groupId === groupId)
    return await Promise.all(
      patients.map(async (p) => {
        const ratings = await this.getRatingsByPatientId(p.userId)
        return fromAdfectusPatientToViewPatient(p, ratings)
      }),
    )
  }

  async addPatient(patient: ViewPatient) {
    const adfectusPatient = fromViewPatientToAdfectusPatient(patient)

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
