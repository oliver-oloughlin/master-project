import { ExternalPatient } from "#/models/external_patient"
import { mockExternalPatients } from "#/models/mocks/external_patients"
import { sleep } from "#/utils/sleep"

export async function getExternalPatients(): Promise<ExternalPatient[]> {
  await sleep(350)
  return mockExternalPatients
}
