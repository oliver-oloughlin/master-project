import type { Group } from "#/models/group"
import type { Patient } from "#/models/patient"
import type { Rating } from "#/models/rating"
import { MockAdfectusService } from "./mock_adfectus_service"

export type IAdfectusService = {
  getGroupIds(): Promise<string[]>
  getGroupById(id: string): Promise<Group | null>
  getRatingsByPatientId(id: string): Promise<Rating[]>
  getActivities(): Promise<string[]>
  updatePatientById(id: string, patient: Patient): Promise<boolean>
  getPatientById(id: string): Promise<Patient | null>
  getPatients(): Promise<Patient[]>
  getPatientsByGroupId(groupId: string): Promise<Patient[]>
  addPatient(patient: Patient): Promise<boolean>
}

export const AdfectusService: IAdfectusService = new MockAdfectusService()
