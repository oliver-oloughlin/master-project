import { Patient } from "#/models/view/patient"
import { useMemo, useState } from "react"
import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import {
  PatientStatus,
  averageScoresAndCount,
  patientStatus,
} from "#/utils/patients"
import Score from "../utils/Score"
import GroupActivityScoreDistributionDialog from "./GroupActivityScoreDistributionDialog"

export type GroupRatingsTableProps = {
  patients: Patient[]
}

export default function GroupRatingsTable({
  patients,
}: GroupRatingsTableProps) {
  const [view, setView] = useState<PatientStatus>("present")

  const latestRatings = useMemo(() => {
    return patients
      .filter((patient) => patientStatus(patient) === view)
      .map(
        (patient) =>
          patient.ratings
            .sort(
              (a, b) =>
                new Date(a.timestamp).valueOf() -
                new Date(b.timestamp).valueOf(),
            )
            .at(0)!,
      )
      .filter((activity) => !!activity)
  }, [patients, view])

  const { averageAcitvityScoresMap, activityScoresCountMap } =
    averageScoresAndCount(latestRatings)

  const sortedAvgScores = Array.from(averageAcitvityScoresMap.entries()).sort(
    ([a], [b]) => a.localeCompare(b),
  )

  return (
    <div className="grid gap-4">
      <h2 className="text-center text-2xl">Gruppesvar Gjennomsnitt</h2>
      <span className="flex gap-2 justify-center">
        <Button
          variant="ghost"
          onPointerDown={() => setView("present")}
          className={`text-lg ${view === "present" ? "bg-slate-100" : ""}`}
        >
          Nåværende
        </Button>
        <Button
          variant="ghost"
          onPointerDown={() => setView("arriving")}
          className={`text-lg ${view === "arriving" ? "bg-slate-100" : ""}`}
        >
          Kommende
        </Button>
      </span>
      <b>Totalt antall svar: {latestRatings.length}</b>
      <Table>
        <TableHeader>
          <TableRow className="!bg-slate-100">
            <TableHead className="font-bold">Aktivitet</TableHead>
            <TableHead className="font-bold">Gjennomsnittlig svar</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAvgScores.map(([activity, averageScore]) => (
            <TableRow
              key={activity}
              className="even:!bg-slate-100 odd:!bg-transparent"
            >
              <TableCell>{activity}</TableCell>
              <TableCell>
                <Score>{averageScore.score}</Score>
              </TableCell>
              <TableCell>
                <GroupActivityScoreDistributionDialog
                  activity={activity}
                  scoresCountMap={
                    activityScoresCountMap.get(activity) ?? new Map()
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
