import { AdfectusRating } from "#/models/adfectus/rating"
import { ViewRating } from "#/models/view/rating"

export function fromAdfectusRatingToViewRating({
  userId,
  ...r
}: AdfectusRating): ViewRating {
  return {
    patientId: userId,
    ...r,
  }
}

export function fromViewRatingToAdfectusRating({
  patientId,
  ...r
}: ViewRating): AdfectusRating {
  return {
    userId: patientId,
    ...r,
  }
}
