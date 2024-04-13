import { formatDisplayDate } from "#/utils/formatters"
import { useMemo, useState } from "react"
import SearchBox from "../misc/SearchBox"
import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { twMerge } from "tailwind-merge"
import { useSorted } from "#/hooks/useSorted"
import Triangle from "../misc/Triangle"

type PatientLike = {
  patientId: string
  firstName: string
  arrivalDate: Date | string | number
  groupId: string
}

export type SelectPatientsTableProps<T extends PatientLike> = {
  patients: T[]
  onSelect: (patient: T) => unknown
  selectLabel: string
  className?: string
}

export default function SelectPatientsTable<T extends PatientLike>({
  patients,
  onSelect,
  selectLabel,
  className,
}: SelectPatientsTableProps<T>) {
  const mappedPatients = useMemo(() => {
    return patients.map((p) => ({
      ...p,
      displayArrivalDate: formatDisplayDate(p.arrivalDate),
    }))
  }, [patients])

  const [searchedPatients, setSearchedPatients] = useState(mappedPatients)

  const { sorted, order, sortBy, setSortBy } = useSorted(searchedPatients, [
    "firstName",
    "patientId",
    "arrivalDate",
    "groupId",
  ])

  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <SearchBox
        items={mappedPatients}
        searchKeys={[
          {
            key: "patientId",
            label: "Pasient ID",
          },
          {
            key: "firstName",
            label: "Fornavn",
          },
          {
            key: "groupId",
            label: "Gruppe",
          },
          {
            key: "displayArrivalDate",
            label: "Ankomst",
          },
        ]}
        defaultSearchKey="firstName"
        placeholder="Søk etter pasient..."
        onInput={setSearchedPatients}
      />
      <Table>
        <TableHeader>
          <TableRow className="!bg-white">
            <TableHead
              className="min-w-32 cursor-pointer hover:text-slate-800"
              onPointerDown={() => setSortBy("patientId")}
            >
              <span className="flex gap-1 items-center">
                PasientID
                {sortBy === "patientId" && (
                  <Triangle
                    oriantation={order === "asc" ? "up" : "down"}
                    className="border-8"
                  />
                )}
              </span>
            </TableHead>
            <TableHead
              className="min-w-32 cursor-pointer hover:text-slate-800"
              onPointerDown={() => setSortBy("firstName")}
            >
              <span className="flex gap-1 items-center">
                Fornavn
                {sortBy === "firstName" && (
                  <Triangle
                    oriantation={order === "asc" ? "up" : "down"}
                    className="border-8"
                  />
                )}
              </span>
            </TableHead>
            <TableHead
              className="min-w-32 cursor-pointer hover:text-slate-800"
              onPointerDown={() => setSortBy("arrivalDate")}
            >
              <span className="flex gap-1 items-center">
                Ankomst
                {sortBy === "arrivalDate" && (
                  <Triangle
                    oriantation={order === "asc" ? "up" : "down"}
                    className="border-8"
                  />
                )}
              </span>
            </TableHead>
            <TableHead
              className="min-w-32 cursor-pointer hover:text-slate-800"
              onPointerDown={() => setSortBy("groupId")}
            >
              <span className="flex gap-1 items-center">
                Gruppe
                {sortBy === "groupId" && (
                  <Triangle
                    oriantation={order === "asc" ? "up" : "down"}
                    className="border-8"
                  />
                )}
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((p) => (
            <TableRow key={p.patientId}>
              <TableCell>{p.patientId}</TableCell>
              <TableCell>{p.firstName}</TableCell>
              <TableCell>{formatDisplayDate(p.arrivalDate)}</TableCell>
              <TableCell>{p.groupId}</TableCell>
              <TableCell>
                <Button onPointerDown={() => onSelect(p)}>{selectLabel}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
