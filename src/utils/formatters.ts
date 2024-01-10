
export function formatDisplayDate(date: string | Date) {
  return new Intl.DateTimeFormat("no", { dateStyle: "short" }).format(new Date(date))
}

export function formatDateInputValue(date: string | Date) {
  return new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"})
    .format(new Date(date))
}
