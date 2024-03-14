import { mockAdfectusPatients } from "#/models/adfectus/mocks/patients"
import { mockAdfectusRatings } from "#/models/adfectus/mocks/ratings"
import { AdfectusRating } from "#/models/adfectus/rating"
import { sleep } from "#/utils/sleep"

export async function getAdfectusRatingsByPatientId(
  id: string,
): Promise<AdfectusRating[]> {
  await sleep(100)

  const patient = mockAdfectusPatients.find((p) => p.userId === id)

  if (!patient) {
    return []
  }

  return mockAdfectusRatings(patient)
}
