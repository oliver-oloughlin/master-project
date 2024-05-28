import type { User } from "#/models/user"
import type { Patient } from "#/models/patient"

export type IExternalService = {
  getUser(): Promise<User>
  getPatients(groupId?: string): Promise<Patient[]>
}
