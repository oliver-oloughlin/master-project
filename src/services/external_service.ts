import type { ExternalPatient } from "#/models/external/patient"
import type { ExternalUser } from "#/models/external/user"
import { MockExternalService } from "./mock_external_service"

export type IExternalService = {
  getUser(): Promise<ExternalUser>
  getPatients(groupId?: string): Promise<ExternalPatient[]>
}

export const ExternalService: IExternalService = new MockExternalService()
