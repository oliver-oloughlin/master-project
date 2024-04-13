import { useMemo, useState } from "react"

export function useSorted<T1, T2 extends [keyof T1, ...(keyof T1)[]]>(
  values: T1[],
  keys: T2,
) {
  const [sortBy, _setSortBy] = useState<T2[number]>(keys[0])
  const [order, setOrder] = useState<"asc" | "desc">("asc")

  const sorted = useMemo(() => {
    return values.sort((v1, v2) => {
      const c1 = `${v1[sortBy]}`.toLowerCase()
      const c2 = `${v2[sortBy]}`.toLowerCase()
      return order === "asc" ? c1.localeCompare(c2) : c2.localeCompare(c1)
    })
  }, [values, sortBy, order])

  function setSortBy(value: T2[number]) {
    _setSortBy((val) => {
      if (value === val) {
        setOrder((order) => (order === "asc" ? "desc" : "asc"))
      }
      return value
    })
  }

  return {
    sortBy,
    order,
    setSortBy,
    sorted,
  }
}
