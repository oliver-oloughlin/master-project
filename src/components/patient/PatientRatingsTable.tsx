import { Patient } from "#/models/view/patient"
import { formatDisplayDate } from "#/utils/formatters"
import Score from "../utils/Score"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

export type PatientRatingsTableProps = {
  patient: Patient
}

export default function PatientRatingsTable({
  patient,
}: PatientRatingsTableProps) {
  const rating = patient.ratings
    .sort(
      (a, b) =>
        new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf(),
    )
    .at(0)

  const scores = rating?.scores.sort((a, b) =>
    a.activity.localeCompare(b.activity),
  )

  return (
    <>
      {rating ? (
        <div className="grid gap-2">
          <p className="text-slate-500">
            {formatDisplayDate(rating.timestamp)}
          </p>
          <Table>
            <TableHeader>
              <TableRow className="!bg-slate-100">
                <TableHead className="font-bold">Aktivitet</TableHead>
                <TableHead className="font-bold">Svar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scores?.map((score) => (
                <TableRow className="even:!bg-slate-100 odd:!bg-transparent">
                  <TableCell>{score.activity}</TableCell>
                  <TableCell>
                    <Score>{score.score}</Score>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </>
  )
}
