import { ExternalPatient } from "#/models/external_patient"
import { mockExternalPatients } from "#/models/mocks/external_patients"
import { sleep } from "#/utils/sleep"

export async function getExternalPatients(groupId?: string): Promise<ExternalPatient[]> {
  await sleep(350)

  if (!groupId) {
    return mockExternalPatients
  }

  return mockExternalPatients.filter(p => p.groupId === groupId)
}
