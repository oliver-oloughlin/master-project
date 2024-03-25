import {
  ScoreBgColorMap,
  ScoreBorderColorMap,
  ScoreTextMap,
} from "#/utils/score"
import Bar from "../charts/Bar"

export default function GroupDistributionChart({
  scoresCountMap,
}: {
  scoresCountMap: Map<number, number>
}) {
  const sortedEntries = Array.from(scoresCountMap.entries()).sort(
    ([a], [b]) => a - b,
  )
  return (
    <Bar
      data={{
        labels: sortedEntries.map(([score]) => ScoreTextMap.get(score)),
        datasets: [
          {
            backgroundColor: sortedEntries.map(([score]) =>
              ScoreBgColorMap.get(score),
            ),
            borderColor: sortedEntries.map(([score]) =>
              ScoreBorderColorMap.get(score),
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
