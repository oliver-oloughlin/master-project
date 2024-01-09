import { usePatients } from "#/stores/patients"
import { Skeleton } from "#/components/ui/skeleton"
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
import { FormEvent, useMemo, useState } from "react"
import fuzzysort from "fuzzysort"
import { Input } from "#/components/ui/input"
import { Button } from "#/components/ui/button"

type PatientVisitState = "previous" | "present" | "arriving"

const PAGE_SIZE = 10

export default function Patients() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<PatientVisitState>("present")
  const [page, setPage] = useState(1)
  const { patients, loading, error } = usePatients()

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
      .sort((p1, p2) => p1.firstName.toLowerCase().localeCompare(p2.firstName.toLowerCase()))
  }, [searchedPatients])

  // Return skeleton if loading
  if (loading) {
    return <div>
      <Skeleton />
    </div>
  }

  // Return error message upon failed fetch
  if (error) {
    return <h1>Kunne ikke laste inn pasienter</h1>
  }

  const start = PAGE_SIZE * (page - 1)
  const end = start + PAGE_SIZE
  const maxPage = Math.floor((sortedPatients.length - 1) / PAGE_SIZE) + 1
  const patientsPage = sortedPatients.slice(start, end)

  const selectedPageClass = "border-slate-200 border-2"

  return (
    <section className="m-auto w-fit">
      <span className="flex gap-2 justify-center py-4">
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
          <TableRow>
            <TableHead className="min-w-32">PasientID</TableHead>
            <TableHead className="min-w-32">Fornavn</TableHead>
            <TableHead className="min-w-32">Ankomst</TableHead>
            <TableHead className="min-w-32">Gruppe</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patientsPage.map(patient => (
            <TableRow key={patient.userId}>
              <TableCell>{patient.userId}</TableCell>
              <TableCell>{patient.firstName}</TableCell>
              <TableCell>{formatDisplayDate(patient.arrivalDate)}</TableCell>
              <TableCell>{patient.groupId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onPointerDown={() => setPage(p => Math.max(1, p - 1))} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink 
              className={page === 1 ? selectedPageClass : ""}
              onPointerDown={() => setPage(p =>  p === 1 ? p : p === maxPage ? p - 2 : p - 1)}
            >
              {page === 1 ? page : page === maxPage ? page - 2 : page - 1}
            </PaginationLink>
          </PaginationItem>
          {maxPage > 1 &&
            <PaginationItem>
              <PaginationLink 
                className={page !== 1 && (page !== maxPage && maxPage !== 2) ? selectedPageClass : ""}
                onPointerDown={() => setPage(p => p === 1 ? p + 1 : maxPage === 2 || p !== maxPage ? p : p - 1)}
              >
                {page === 1 ? page + 1 : maxPage === 2 || page !== maxPage ? page : page - 1}
              </PaginationLink>
            </PaginationItem>
          }
          {maxPage > 2 &&
            <PaginationItem>
              <PaginationLink  
                className={page === maxPage ? selectedPageClass : ""}
                onPointerDown={() => setPage(p => p === 1 ? p + 2 : p === maxPage ? p : p + 1)}
              >
                {page === 1 ? page + 2 : page === maxPage ? page : page + 1}
              </PaginationLink>
            </PaginationItem>
          }
          {maxPage > 3 && page < maxPage - 1 &&
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          }
          <PaginationItem>
            <PaginationNext onPointerDown={() => setPage(p => Math.min(p + 1, maxPage))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}
