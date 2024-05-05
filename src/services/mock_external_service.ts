import { mockExternalPatients } from "#/models/external/mocks/patients"
import { mockExternalUser } from "#/models/external/mocks/users"
import { ExternalPatient } from "#/models/external/patient"
import { IExternalService } from "./external_service"

export class MockExternalService implements IExternalService {
  async getPatients(groupId?: string): Promise<ExternalPatient[]> {
    if (!groupId) {
      return mockExternalPatients
    }

    return mockExternalPatients.filter((p) => p.groupId === groupId)
  }

  async getUser() {
    return mockExternalUser
  }
}
