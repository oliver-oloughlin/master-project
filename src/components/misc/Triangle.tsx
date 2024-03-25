import { twMerge } from "tailwind-merge"

export type TriangleProps = {
  oriantation: "up" | "right" | "down" | "left"
  className?: string
}

export default function Triangle({ oriantation, className }: TriangleProps) {
  return (
    <div
      className={twMerge(
        `!w-0 !h-0 border-current border-[16px]`,
        className,
        oriantation === "up"
          ? "border-t-0 border-l-transparent border-r-transparent"
          : oriantation === "right"
            ? "border-r-0 border-t-transparent border-b-transparent"
            : oriantation === "down"
              ? "border-b-0 border-l-transparent border-r-transparent"
              : "border-l-0 border-t-transparent border-b-transparent",
      )}
    />
  )
}
