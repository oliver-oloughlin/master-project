import { ScoreTextMap, ScoreBgColorMap, ScoreEmojiMap } from "#/utils/score"
import { twMerge } from "tailwind-merge"

export type ScoreProps = {
  children: number
  className?: string
}

export default function Score({ children: score, className }: ScoreProps) {
  return (
    <span
      className={twMerge(
        "px-4 py-2 rounded-full w-fit flex gap-2 items-center",
        `bg-[${ScoreBgColorMap.get(score)}]`,
        className,
      )}
    >
      <p>{ScoreTextMap.get(score)}</p>
      <p className="text-2xl">{ScoreEmojiMap.get(score)}</p>
    </span>
  )
}
