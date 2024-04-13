import { useActivities } from "#/hooks/useActivities"
import { useMemo, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import type { ViewPatient } from "#/models/view/patient"
import SelectPatientsTable from "../patient/SelectPatientsTable"
import { Label } from "../ui/label"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"
import { formatDisplayDate } from "#/utils/formatters"
import { Button } from "../ui/button"
import AdfetcusButton from "../misc/AdfectusButton"

export type RequestFeedbackFormProps = {
  patients: ViewPatient[]
}

export default function RequestFeedbackForm({
  patients,
}: RequestFeedbackFormProps) {
  const { activities, loading, error } = useActivities()
  const [activity, setActivity] = useState<string | null>(null)
  const [selectedPatients, setSelectedPatients] = useState<ViewPatient[]>([])

  const unselectedPatients = useMemo(() => {
    return patients.filter(
      (p1) => !selectedPatients.some((p2) => p1.patientId === p2.patientId),
    )
  }, [patients, selectedPatients])

  if (loading) {
    return <>Laster...</>
  }

  if (error) {
    return <>Kunne ikke laste inn aktiviteter</>
  }

  function removeSelectedPatient(patientId: ViewPatient["patientId"]) {
    setSelectedPatients((patients) =>
      patients.filter((p) => p.patientId !== patientId),
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Aktivitet</Label>
        <Select onValueChange={setActivity}>
          <SelectTrigger>
            <SelectValue placeholder="velg en aktivitet..." />
          </SelectTrigger>
          <SelectContent>
            {activities.map((activity) => (
              <SelectItem key={activity} value={activity}>
                {activity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {activity && (
        <div className="flex flex-col gap-2">
          <Label>Legg til pasienter</Label>
          <SelectPatientsTable
            selectLabel="Legg til"
            className="h-80"
            patients={unselectedPatients}
            onSelect={(patient) =>
              setSelectedPatients((val) => [...val, patient])
            }
          />
        </div>
      )}
      {selectedPatients.length === 0 ? null : (
        <>
          <div className="flex flex-col gap-2">
            <Label>Pasienter</Label>
            <Table>
              {selectedPatients.map((patient) => (
                <TableBody>
                  <TableRow>
                    <TableCell className="min-w-32">
                      {patient.patientId}
                    </TableCell>
                    <TableCell className="min-w-32">
                      {patient.firstName}
                    </TableCell>
                    <TableCell className="min-w-32">
                      {formatDisplayDate(patient.arrivalDate)}
                    </TableCell>
                    <TableCell className="min-w-32">
                      {patient.groupId}
                    </TableCell>
                    <TableCell className="min-w-32">
                      <Button
                        className="bg-red-600 hover:bg-red-500 w-full"
                        onPointerDown={() =>
                          removeSelectedPatient(patient.patientId)
                        }
                      >
                        Fjern
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </div>
          <AdfetcusButton className="w-fit">Send forespørsel</AdfetcusButton>
        </>
      )}
    </div>
  )
}
