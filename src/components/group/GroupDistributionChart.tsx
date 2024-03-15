import { ScoreMap } from "#/utils/score"
import Bar from "../charts/Bar"

export default function GroupDistributionChart({
  scoresCountMap,
}: {
  scoresCountMap: Map<number, number>
}) {
  const colors = ["#fecaca", "#fed7aa", "#fef08a", "#d9f99d", "#a7f3d0"]
  const borderColors = ["#fca5a5", "#fdba74", "#fcd34d", "#bef264", "#6ee7b7"]
  const sortedEntries = Array.from(scoresCountMap.entries()).sort(
    ([a], [b]) => a - b,
  )
  return (
    <Bar
      data={{
        labels: sortedEntries.map(([score]) => ScoreMap.get(score)),
        datasets: [
          {
            backgroundColor: sortedEntries.map(([score]) => colors[score - 1]),
            borderColor: sortedEntries.map(
              ([score]) => borderColors[score - 1],
            ),
            borderWidth: 2,
            data: sortedEntries.map(([_, count]) => count),
          },
        ],
      }}
      options={{
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Antall",
            },
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: true,
          },
        },
      }}
    />
  )
}
