import { Patient } from "#/models/patient"
import Line from "#/components/charts/Line"
import {
  dailyAverageScoresByWeeklyWindow,
  scoresByActivity,
} from "#/utils/patients"
import { ScoreTextMap } from "#/utils/score"
import { useMemo, useRef, useState } from "react"
import { useGroup } from "#/hooks/useGroup"
import { Skeleton } from "../ui/skeleton"
import Repeat from "../misc/Repeat"

export type PatientsProgressChartProps = {
  patient: Patient
}

const GROUP_LABEL = "Gruppe Gjennomsnitt"

export default function PatientProgressChart({
  patient,
}: PatientsProgressChartProps) {
  const { group, loading } = useGroup(patient.groupId)
  const activityScores = useMemo(
    () => scoresByActivity(patient.ratings),
    [patient],
  )
  const activities = Array.from(activityScores.keys())
  const [activity, setActivity] = useState(activities.at(0) ?? "")
  const [showGroupAvg, setShowGorupAvg] = useState(false)
  const [showGroupAvgInfo, setShowGorupAvgInfo] = useState(false)
  const groupAvgInfoRef = useRef<HTMLParagraphElement>(null)

  const groupAverageDataset = useMemo(() => {
    const groupRatings = group?.patients.map((p) => p.ratings).flat()
    const sortedTimestamps = patient.ratings
      .map((r) => new Date(r.timestamp))
      .sort((a, b) => a.valueOf() - b.valueOf())
    const start = sortedTimestamps.at(0)
    const end = sortedTimestamps.at(sortedTimestamps.length - 1)

    if (!groupRatings || !start || !end) {
      return null
    }

    const dailyAverageScores = dailyAverageScoresByWeeklyWindow(
      groupRatings,
      start,
      end,
    )

    return (
      Array.from(dailyAverageScores.entries())
        .map(([act, scores]) => {
          const data = scores
            .map((v) => ({
              x: v.timestamp,
              y: v.score,
            }))
            .sort((a, b) => new Date(a.x).valueOf() - new Date(b.x).valueOf())

          const color = "hsl(0, 0%, 75%)"

          return {
            activity: act,
            label: GROUP_LABEL,
            data,
            hidden: !showGroupAvg,
            backgroundColor: color,
            borderColor: color,
            tension: 0.025,
            pointRadius: 0,
            pointHitRadius: 0,
            pointHoverRadius: 0,
          }
        })
        .find((d) => d.activity === activity) ?? null
    )
  }, [activity, group, patient, showGroupAvg])

  const datasets = useMemo(() => {
    const patientDatasets = Array.from(activityScores.entries()).map(
      ([act, scores], index) => {
        const data = scores
          .map((v) => ({
            x: v.timestamp,
            y: v.score,
          }))
          .sort((a, b) => new Date(a.x).valueOf() - new Date(b.x).valueOf())

        const hidden = act !== activity
        const color = `hsl(${Math.round((index / activityScores.size) * 360)}, ${index % 2 === 0 ? "50%" : "70%"}, ${hidden ? "80%" : "50%"})`

        return {
          label: act,
          data,
          hidden,
          backgroundColor: color,
          borderColor: color,
        }
      },
    )

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
        <br />
        <Skeleton className="h-[40ch] rounded-lg" />
      </div>
    )
  }

  return (
    <>
      {showGroupAvgInfo && (
        <p
          ref={groupAvgInfoRef}
          className="absolute w-[30ch] bg-white shadow-md border-[0.05rem] border-slate-200 p-2 rounded-md -translate-y-full"
        >
          Gruppens gjennomsnittlige svar på aktiviteten. Beregnet basert på hele
          gruppens svar på aktiviteten, ut ifra et syv dagers vindu for hvert av
          pasientes svar.
        </p>
      )}
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
                autoSkipPadding: 64,
                maxTicksLimit: patient.ratings.length,
              },
            },
            y: {
              offset: true,
              ticks: {
                stepSize: 1,
                callback: (value) =>
                  ScoreTextMap.get(Number(value)) ?? "Ukjent",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
                boxHeight: 20,
                boxWidth: 20,
                sort: (a, b) =>
                  a.text === GROUP_LABEL ? -1 : a.text.localeCompare(b.text),
              },
              onClick: (_, { text }) => {
                text === GROUP_LABEL
                  ? setShowGorupAvg((v) => !v)
                  : setActivity(text)
              },
              onHover: (e, { text }) => {
                if (text === GROUP_LABEL) {
                  setShowGorupAvgInfo(true)
                  const style = groupAvgInfoRef.current?.style
                  if (style) {
                    console.log(`${e.x} ${e.y}`)
                    style.left = `${e.x}`
                    style.top = `${e.y}`
                  }
                }
              },
              onLeave: () => setShowGorupAvgInfo(false),
            },
            datalabels: {
              display: false,
            },
          },
        }}
      />
    </>
  )
}
