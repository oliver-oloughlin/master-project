import { ScoreMap } from "#/models/view/rating"
import { twMerge } from "tailwind-merge"

export type ScoreProps = {
  children: number
  className?: string
}

export default function Score({ children, className }: ScoreProps) {
  return (
    <p
      className={twMerge(
        "px-4 py-2 rounded-full w-fit",
        children > 4
          ? "bg-emerald-100"
          : children > 3
            ? "bg-lime-100"
            : children > 2
              ? "bg-yellow-100"
              : children > 1
                ? "bg-orange-100"
                : "bg-red-100",
        className,
      )}
    >
      {ScoreMap.get(children)}
    </p>
  )
}
