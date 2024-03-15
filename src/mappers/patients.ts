import { AdfectusPatient } from "#/models/adfectus/patient"
import { ViewPatient } from "#/models/view/patient"
import { ViewRating } from "#/models/view/rating"

export function fromAdfectusPatientToViewPatient(
  { userId, ...p }: AdfectusPatient,
  ratings: ViewRating[],
): ViewPatient {
  return {
    patientId: userId,
    ratings,
    ...p,
  }
}

export function fromViewPatientToAdfectusPatient({
  patientId,
  ...p
}: ViewPatient): AdfectusPatient {
  return {
    userId: patientId,
    ...p,
  }
}
