import {
  Table, 
  TableHeader, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell 
} from "#/components/ui/table"
import { formatDisplayDate } from "#/utils/formatters"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "#/components/ui/pagination"
import { FormEvent, Fragment, useMemo, useState } from "react"
import fuzzysort from "fuzzysort"
import { Input } from "#/components/ui/input"
import { Button } from "#/components/ui/button"
import EditPatientDialog from "#/components/EditPatientDIalog"
import { Patient } from "#/models/patient"
import ViewPatientDialog from "./ViewPatientDialog"
import { Link } from "@tanstack/react-router"
import { twMerge } from "tailwind-merge"
import Repeat from "./Repeat"
import { Skeleton } from "./ui/skeleton"
import Triangle from "./Triangle"

type PatientVisitState = "previous" | "present" | "arriving"
type OrderBy = "id" | "name" | "arrival" | "group"
type Order = "asc" | "desc"

const PAGE_SIZE = 10

export type PatientsTableProps = {
  patients: Patient[]
  loading: boolean
  error: unknown
  className?: string
}

export default function PatientsTable({ patients, loading, error, className }: PatientsTableProps) {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<PatientVisitState>("present")
  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState<OrderBy>("name")
  const [order, setOrder] = useState<Order>("asc")

  // Order by selector
  function selectOrderBy(newOrderBy: OrderBy) {
    if (orderBy === newOrderBy) {
      setOrder(o => o === "asc" ? "desc" : "asc")
    } else {
      setOrderBy(newOrderBy)
    }
  }

  // View selector
  function selectView(view: PatientVisitState) {
    setView(view)
    setPage(1)
  }

  // Search handler
  function handleSearch(event: FormEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value
    setSearch(value)
    setPage(1)
  }

  // Filter patients by selected view
  const viewPatients = useMemo(() => {
    return patients.filter(patient => {
      const arrivalDate = new Date(patient.arrivalDate).valueOf()
      const departureDate = patient.departureDate ? new Date(patient.departureDate).valueOf() : arrivalDate + 21 * 24 * 60 * 60 * 1000
      const now = Date.now()
      const patientVisitState: PatientVisitState = now < arrivalDate ? "arriving" : now > departureDate ? "previous" : "present"
      return view === patientVisitState
    })
  }, [patients, view])

  // Search viewed patients
  const searchedPatients = useMemo(() => {
    return fuzzysort
      .go(search, viewPatients, { key: "firstName", all: true })
      .map(r => r.obj)
  }, [search, viewPatients])

  // Sort patients by name
  const sortedPatients = useMemo(() => {
    return searchedPatients
      .sort((p1, p2) => {
        let val1: string
        let val2: string

        if (orderBy === "arrival") {
          val1 = p1.arrivalDate.valueOf()
          val2 = p2.arrivalDate.valueOf()
        } else if (orderBy === "group") {
          val1 = p1.groupId
          val2 = p2.groupId
        } else if (orderBy === "id") {
          val1 = p1.patientId
          val2 = p2.patientId
        } else {
          val1 = p1.firstName
          val2 = p2.firstName
        }

        const comp = val1.toLowerCase().localeCompare(val2.toLowerCase())
        return order === "asc" ? comp : -comp
      })
  }, [searchedPatients, order, orderBy])

  const start = PAGE_SIZE * (page - 1)
  const end = start + PAGE_SIZE
  const maxPage = Math.floor((sortedPatients.length - 1) / PAGE_SIZE) + 1
  const patientsPage = sortedPatients.slice(start, end)
  
  const pageWindow = [
    (Math.max(1, page === 1 ? 1 : page === maxPage ? page - 2 : page - 1)),
    (page === 1 && maxPage > 1 ? page + 1 : maxPage > 2 && page === maxPage ? page - 1 : maxPage > 1 ? page : null),
    (maxPage > 2 && page === maxPage ? page : maxPage > 2 && page !== 1 ? page + 1 : maxPage > 2 ? page + 2 : null)
  ]

  const selectedPageClass = "border-slate-200 border-2"

  // Return skeleton if loading
  if (loading) {
    return (
      <div className={twMerge("w-[min(100vw,70ch)] py-8 flex flex-col gap-8", className)}>
        <Repeat n={12}>
          <Skeleton className="rounded-full w-full h-10" />
        </Repeat>
      </div>
    )
  }

  // Return error message upon failed fetch
  if (error) {
    return (
      <div className={className}>
        <p>Kunne ikke laste inn pasienter</p>
      </div>
    )
  }

  return (
    <section className={twMerge("w-fit grid gap-4 py-4", className)}>
      <span className="flex gap-2 justify-center">
        <Button
          variant="ghost"
          onPointerDown={() => selectView("previous")}
          className={`text-lg ${view === "previous" ? "bg-slate-100" : ""}`}
        >
          Tidligere
        </Button>
        <Button
          variant="ghost"
          onPointerDown={() => selectView("present")}
          className={`text-lg ${view === "present" ? "bg-slate-100" : ""}`}
        >
          Nåværende
        </Button>
        <Button
          variant="ghost"
          onPointerDown={() => selectView("arriving")}
          className={`text-lg ${view === "arriving" ? "bg-slate-100" : ""}`}
        >
          Kommende
        </Button>
      </span>
      <Input
        type="search"
        placeholder="Søk etter pasient"
        onInput={handleSearch}
      />
      <Table>
        <TableHeader>
          <TableRow className="!bg-white">
            <TableHead 
              className="min-w-32 cursor-pointer hover:text-slate-800"
              onPointerDown={() => selectOrderBy("id")}
            >
              <span className="flex gap-1 items-center">
                PasientID
                {orderBy === "id" && <Triangle oriantation={order === "asc" ? "up" : "down"} className="border-8" />}
              </span>
            </TableHead>
            <TableHead 
              className="min-w-32 cursor-pointer hover:text-slate-800"
              onPointerDown={() => selectOrderBy("name")}
            >
              <span className="flex gap-1 items-center">
                Fornavn
                {orderBy === "name" && <Triangle oriantation={order === "asc" ? "up" : "down"} className="border-8" />}
              </span>
            </TableHead>
            <TableHead 
              className="min-w-32 cursor-pointer hover:text-slate-800"
              onPointerDown={() => selectOrderBy("arrival")}
            >
              <span className="flex gap-1 items-center">
                Ankomst
                {orderBy === "arrival" && <Triangle oriantation={order === "asc" ? "up" : "down"} className="border-8" />}
              </span>
            </TableHead>
            <TableHead 
              className="min-w-32 cursor-pointer hover:text-slate-800"
              onPointerDown={() => selectOrderBy("group")}
            >
              <span className="flex gap-1 items-center">
                Gruppe
                {orderBy === "group" && <Triangle oriantation={order === "asc" ? "up" : "down"} className="border-8" />}
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patientsPage.map(patient => (
            <TableRow key={patient.patientId}>
              <TableCell>{patient.patientId}</TableCell>
              <TableCell>{patient.firstName}</TableCell>
              <TableCell>{formatDisplayDate(patient.arrivalDate)}</TableCell>
              <TableCell>
                <Link 
                  to={`/groups/${patient.groupId}` as "groups/$groupId"}
                  className="hover:underline text-blue-600"
                >
                  {patient.groupId}
                </Link>
              </TableCell>
              <TableCell><ViewPatientDialog patient={patient} /></TableCell>
              <TableCell><EditPatientDialog patient={patient} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer" onPointerDown={() => setPage(p => Math.max(1, p - 1))} />
          </PaginationItem>
          {pageWindow.map((displayPage, index) => (
            <Fragment key={index}>
              {displayPage &&
                <PaginationItem>
                  <PaginationLink
                    className={`cursor-pointer ${page === displayPage ? selectedPageClass : ""}`}
                    onPointerDown={() => setPage(displayPage)}
                  >
                    {displayPage}
                  </PaginationLink>
                </PaginationItem>
              }
            </Fragment>
          ))}
          {maxPage > 3 && page < maxPage - 1 &&
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          }
          <PaginationItem>
            <PaginationNext className="cursor-pointer" onPointerDown={() => setPage(p => Math.min(p + 1, maxPage))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}
