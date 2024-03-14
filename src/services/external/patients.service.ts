import { ExternalPatient } from "#/models/external/patient"
import { mockExternalPatients } from "#/models/external/mocks/patients"
import { sleep } from "#/utils/sleep"

export async function getExternalPatients(
  groupId?: string,
): Promise<ExternalPatient[]> {
  await sleep(350)

  if (!groupId) {
    return mockExternalPatients
  }

  return mockExternalPatients.filter((p) => p.groupId === groupId)
}
