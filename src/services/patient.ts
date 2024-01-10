//import { adfectusGatewayApiClient } from "#/api_clients/adfectus_gateway"
//import { mapFromPatientToUser } from "#/api_clients/adfectus_gateway/mappers/user"
//import { Auth } from "aws-amplify"
import { mockPatients } from "#/models/mocks/patients"
import type { Patient } from "#/models/patient"

export async function updatePatient(patient: Patient) {
  // TODO: Replace with API request logic
  const index = mockPatients.findIndex(p => p.patientId === patient.patientId)
  if (index < 0) {
    return false
  }

  mockPatients[index] = patient
  return true

  /*
  const credentials = await Auth.currentUserCredentials()
  const token = credentials.sessionToken

  const credentials = await Auth.currentUserCredentials()
  const token = credentials.sessionToken

  adfectusGatewayApiClient.users.post({
    searchParams: {
      vendor: "adfectus",
    },
    body: mapFromPatientToUser(patient),
    headers: {
      Authorization: token
    }
  })
  */
}

export async function getPatient(patientId: string) {
  return mockPatients.find(p => p.patientId === patientId) ?? null
}
