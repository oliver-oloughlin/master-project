import { Patient } from "#/models/patient"
import Line from "#/components/charts/Line"
import { dailyAverageScoresByWeeklyWindow, scoresByActivity } from "#/utils/patients"
import { ScoreMap } from "#/models/rating"
import { useEffect, useMemo, useState } from "react"
import { useGroup } from "#/stores/group.store"
import { Skeleton } from "./ui/skeleton"
import Repeat from "./Repeat"

export type PatientsProgressChartProps = {
  patient: Patient
}

const GROUP_LABEL = "Gruppe Gjennomsnitt"

export default function PatientProgressChart({ patient }: PatientsProgressChartProps) {
  const { group, fetchGroup, loading, error } = useGroup(patient.groupId)
  const activityScores = useMemo(() => scoresByActivity(patient.ratings), [patient])
  const activities = Array.from(activityScores.keys())
  const [activity, setActivity] = useState(activities.at(0) ?? "")

  useEffect(() => {
    if (!group && !loading && !error) {
      fetchGroup()
    }
  }, [fetchGroup, group, loading, error])

  const groupAverageDataset = useMemo(() => {
    const groupRatings = group?.patients.map(p => p.ratings).flat()
    const sortedTimestamps = patient.ratings.map(r => new Date(r.timestamp)).sort((a, b) => a.valueOf() - b.valueOf())
    const start = sortedTimestamps.at(0)
    const end = sortedTimestamps.at(sortedTimestamps.length - 1)

    if (!groupRatings || !start || !end) {
      return null
    }

    const dailyAverageScores = dailyAverageScoresByWeeklyWindow(groupRatings, start, end)
    
    return Array
      .from(dailyAverageScores.entries())
      .map(([act, scores]) => {
        const data = scores.map(v => ({
          x: v.timestamp,
          y: v.score,
        })).sort((a, b) => new Date(a.x).valueOf() - new Date(b.x).valueOf())

        const color = "hsl(0, 0%, 75%)"

        return {
          activity: act,
          label: GROUP_LABEL,
          data,
          hidden: false,
          backgroundColor: color,
          borderColor: color,
          tension: .25,
          pointRadius: 0,
          pointHitRadius: 0,
          pointHoverRadius: 0,
        }
      })
      .find(d => d.activity === activity) ?? null
  }, [activity, group, patient])

  const datasets = useMemo(() => {
    const patientDatasets = Array.from(activityScores.entries())
      .map(([act, scores], index) => {
        const data = scores.map(v => ({
          x: v.timestamp,
          y: v.score,
        })).sort((a, b) => new Date(a.x).valueOf() - new Date(b.x).valueOf())

        const hidden = act !== activity
        const color = `hsl(${Math.round(index / activityScores.size * 360)}, ${index % 2 === 0 ? "50%" : "70%"}, ${hidden ? "80%" : "50%"})`

        return {
          label: act,
          data,
          hidden,
          backgroundColor: color,
          borderColor: color
        }
      })

      if (groupAverageDataset) {
        patientDatasets.push(groupAverageDataset)
      }

      return patientDatasets
  }, [activity, activityScores, groupAverageDataset])

  if (loading) {
    return (
      <div>
        <span className="flex gap-2 flex-wrap">
          <Repeat n={22}>
            <Skeleton className="h-[2ch] w-[2ch] rounded-full" />
            <Skeleton className="h-[2ch] w-[5ch] rounded-full" />
          </Repeat>
        </span>
        <br/>
        <Skeleton className="h-[40ch] rounded-lg" />
      </div>
    )
  }

  return (
    <Line
      data={{
        datasets,
      }}
      options={{
        responsive: true,
        scales: {
          x: {
            type: "time",
            grid: {
              display: false,
            },
            time: {
              displayFormats: {
                day: "dd/MM/yyyy",
              },
            },
            border: {
              display: false,
            },
            ticks: {
              autoSkipPadding: 64
            }
          },
          y: {
            offset: true,
            ticks: {
              stepSize: 1,
              callback: (value) => ScoreMap.get(Number(value)) ?? "Ukjent"
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              boxHeight: 20,
              boxWidth: 20,
              sort: (a, b) => a.text === GROUP_LABEL ? -1 : a.text.localeCompare(b.text),
            },
            onClick: (_, { text }) => setActivity(act => text === GROUP_LABEL ? act : text),
          },
        }
      }}
    />
  )
}
