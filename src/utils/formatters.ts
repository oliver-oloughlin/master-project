
export function formatDisplayDate(date: string | Date) {
  return new Intl.DateTimeFormat("no", { dateStyle: "short" }).format(new Date(date))
}