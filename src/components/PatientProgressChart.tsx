import { Patient } from "#/models/patient"
import Line from "#/components/charts/Line"
import { patientScoresByActivity } from "#/utils/patients"
import { ScoreMap } from "#/models/rating"

export type PatientsProgressChartProps = {
  patient: Patient
}

export default function PatientProgressChart({ patient }: PatientsProgressChartProps) {
  const scoresByActivity = patientScoresByActivity(patient)

  const datasets = Array.from(scoresByActivity.entries())
    .map(([activity, scores]) => {
      const data = scores.map(v => ({
        x: v.timestamp,
        y: v.score,
      })).sort((a, b) => new Date(a.x).valueOf() - new Date(b.x).valueOf())

      return {
        label: `${activity.substring(0, 1).toUpperCase()}${activity.substring(1)}`,
        data,
      }
    })

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
              sort: (a, b) => a.text.localeCompare(b.text)
            },
          },
        }
      }}
    />
  )
}
