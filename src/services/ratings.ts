import { fromAdfectusRatingToViewRating } from "#/mappers/ratings"
import { mockAdfectusPatients } from "#/models/adfectus/mocks/patients"
import { mockAdfectusRatings } from "#/models/adfectus/mocks/ratings"
import { ViewRating } from "#/models/view/rating"
import { sleep } from "#/utils/sleep"

export async function getRatingsByPatientId(id: string): Promise<ViewRating[]> {
  await sleep(100)

  const patient = mockAdfectusPatients.find((p) => p.userId === id)

  if (!patient) {
    return []
  }

  const ratings = mockAdfectusRatings(patient)
  return ratings.map(fromAdfectusRatingToViewRating)
}
