import type { User } from "#/models/user"
import type { Patient } from "#/models/patient"
import { MockExternalService } from "./mock_external_service"

export type IExternalService = {
  getUser(): Promise<User>
  getPatients(groupId?: string): Promise<Patient[]>
}

export const ExternalService: IExternalService = new MockExternalService()
