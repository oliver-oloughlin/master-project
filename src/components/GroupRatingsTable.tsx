import { Patient } from "#/models/patient"
import { ScoreMap } from "#/models/rating"
import { useMemo, useState } from "react"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { PatientStatus, patientStatus } from "#/utils/patients"
import { twMerge } from "tailwind-merge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

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
  const averageAcitvityScores = new Map<string, number>()

  latestRatings.forEach(rating => {
    rating.scores.forEach(score => {
      const scoresCountMap = activityScoresCountMap.get(score.activity) ?? new Map<number, number>()
      const scoresCount = scoresCountMap.get(score.score) ?? 0
      scoresCountMap.set(score.score, scoresCount + 1)
      activityScoresCountMap.set(score.activity, scoresCountMap)
    })
  })

  activityScoresCountMap.forEach((scoresCountMap, activity) => {
    let scoreSum = 0
    scoresCountMap.forEach((scoreCount, score) => {
      scoreSum += scoreCount * score
    })
    const averageScore = Math.round(scoreSum / latestRatings.length)
    averageAcitvityScores.set(activity, averageScore)
  })

  return (
    <div className="grid gap-4">
      <h2 className="text-center text-2xl">Gruppesvar</h2>
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
            <TableHead className="font-bold">Gjennomsnittlig svar</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(averageAcitvityScores).map(([activity, averageScore]) => (
            <TableRow className="even:!bg-slate-100 odd:!bg-transparent">
              <TableCell>{activity}</TableCell>
              <TableCell>
                <span className={twMerge("px-4 py-2 rounded-full", averageScore > 4 
                  ? "bg-emerald-100"
                  : averageScore > 3
                  ? "bg-lime-100"
                  : averageScore > 2
                  ? "bg-yellow-100"
                  : averageScore > 1
                  ? "bg-orange-100"
                  : "bg-red-100")}
                >
                  {ScoreMap.get(averageScore)}
                </span>
              </TableCell>
              <TableCell>
                <ActivityScoreDistributionDialog 
                  activity={activity} 
                  scoresCountMap={activityScoresCountMap.get(activity) ?? new Map()}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ActivityScoreDistributionDialog({ 
  scoresCountMap,
  activity,
}: { 
  scoresCountMap: Map<number, number>
  activity: string
}) {
  return (
    <Dialog>
      <DialogTrigger className="bg-[--bg-adfectus] hover:bg-cyan-600 !text-slate-50 rounded-md px-4 py-2">Se fordeling</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fordeling - {activity}</DialogTitle>
          <DialogDescription>Antall pasienter som har svart for hver kategori</DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Svar</TableHead>
              <TableHead>Antall</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from(scoresCountMap.entries()).map(([score, count]) => (
              <TableRow>
                <TableCell>{ScoreMap.get(score)}</TableCell>
                <TableCell>{count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
