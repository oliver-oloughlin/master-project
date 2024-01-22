import type { Patient } from "#/models/patient"
import type { User } from "../models/User"

export function mapFromPatientToUser(patient: Patient): User {
  return {
    userId: patient.patientId,
    firstname: patient.firstName,
    arrivalDate: patient.arrivalDate,
    groupId: patient.groupId,
    instId: patient.instId,
  }
}

export function mapFromUserToPatient(user: User): Patient {
  return {
    patientId: user.userId,
    firstName: user.firstname,
    arrivalDate: user.arrivalDate,
    groupId: user.groupId,
    instId: user.instId,
    ratings: []
  }
}
