import { twMerge } from "tailwind-merge"
import { Button, type ButtonProps } from "../ui/button"

export type AdfetcusButtonProps = ButtonProps

export const ADFECTUS_BTN_CLASS =
  "bg-[--bg-adfectus] hover:bg-cyan-600 rounded-md px-4 py-2 text-slate-100 hover:text-white"

export default function AdfetcusButton({
  className,
  ...props
}: AdfetcusButtonProps) {
  return (
    <Button {...props} className={twMerge(className, ADFECTUS_BTN_CLASS)} />
  )
}
