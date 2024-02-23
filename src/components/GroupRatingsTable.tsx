import { Patient } from "#/models/patient"
import { ScoreMap } from "#/models/rating"
import { useMemo, useState } from "react"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { PatientStatus, patientStatus } from "#/utils/patients"

export type GroupRatingsTableProps = {
  patients: Patient[]
}

export default function GroupRatingsTable({ patients }: GroupRatingsTableProps) {
  const [view, setView] = useState<PatientStatus>("present")

  const latestRatings = useMemo(() => {
    return patients
      .filter(patient => patientStatus(patient) === view)
      .map(
        patient => patient.ratings
          .sort((a, b) => new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf())
          .at(0)!
      )
      .filter(activity => !!activity)
  }, [patients, view])

  const activityScoresCountMap = new Map<string, Map<number, number>>()

  latestRatings.forEach(rating => {
    rating.scores.forEach(score => {
      const scoresCountMap = activityScoresCountMap.get(score.activity) ?? new Map<number, number>()
      const scoresCount = scoresCountMap.get(score.score) ?? 0
      scoresCountMap.set(score.score, scoresCount + 1)
      activityScoresCountMap.set(score.activity, scoresCountMap)
    })
  })

  function sortByScore(a: number, b: number) {
    return a - b
  }

  return (
    <div className="grid gap-4">
      <h2 className="text-center text-2xl">Antall Svar</h2>
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
      <Table>
        <TableHeader>
          <TableRow className="!bg-slate-100">
            <TableHead className="font-bold">Aktivitet</TableHead>
            {Array.from(ScoreMap.entries()).sort(([a], [b]) => sortByScore(a, b)).map(([_, scoreStr]) => <TableHead className="font-bold">{scoreStr}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(activityScoresCountMap).map(([activity, scoresCountMap]) => (
            <TableRow className="even:!bg-slate-100 odd:!bg-transparent" data-row-xxxxxxxxxx>
              <TableCell>{activity}</TableCell>
              {Array.from(scoresCountMap.entries())
                .sort(([a], [b]) => sortByScore(a, b))
                .map(([_, count]) => (
                  <TableCell>{count}</TableCell>
              ))}
              {Array.from(ScoreMap.values()).slice(0, ScoreMap.size - scoresCountMap.size).map(() => <TableCell>0</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
