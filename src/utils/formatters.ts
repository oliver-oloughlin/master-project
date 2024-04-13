export function formatDisplayDate(date: string | number | Date) {
  return new Intl.DateTimeFormat("no", { dateStyle: "short" }).format(
    new Date(date),
  )
}

export function formatDateInputValue(date: string | number | Date) {
  const d = new Date(date)
  const yearStr = d.getFullYear().toString()
  const monthStr = (d.getMonth() + 1).toString().padStart(2, "0")
  const dateStr = d.getDate().toString().padStart(2, "0")
  return `${yearStr}-${monthStr}-${dateStr}`
}
