import type { ViewGroup } from "#/models/view/group"
import type { ViewPatient } from "#/models/view/patient"
import type { ViewRating } from "#/models/view/rating"
import { MockAdfectusService } from "./mock_adfectus_service"

export type IAdfectusService = {
  getGroupIds(): Promise<string[]>
  getGroupById(id: string): Promise<ViewGroup | null>
  getRatingsByPatientId(id: string): Promise<ViewRating[]>
  getActivities(): Promise<string[]>
  updatePatientById(id: string, patient: ViewPatient): Promise<boolean>
  getPatientById(id: string): Promise<ViewPatient | null>
  getPatients(): Promise<ViewPatient[]>
  getPatientsByGroupId(groupId: string): Promise<ViewPatient[]>
  addPatient(patient: ViewPatient): Promise<boolean>
}

export const AdfectusService: IAdfectusService = new MockAdfectusService()
