import { useGroups } from "#/stores/groups.store"
import { formatDateInputValue, formatDisplayDate } from "#/utils/formatters"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import { useEffect, useMemo, useState } from "react"
import { usePatients } from "#/stores/patients.store"
import { useExternalPatients } from "#/stores/external_patients.store"
import SearchBox from "../utils/SearchBox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

export type AddPatientFormProps = {
  groupId?: string
}

export default function AddPatientForm({ groupId }: AddPatientFormProps) {
  const { groups } = useGroups()
  const { addPatient } = usePatients()

  const { externalPatients, fetchExternalPatients } =
    useExternalPatients(groupId)

  const [saveState, setSaveState] = useState<"unsaved" | "saved" | "error">(
    "unsaved",
  )

  const mappedExternalPatients = useMemo(() => {
    return externalPatients.map((p) => ({
      ...p,
      displayArrivalDate: formatDisplayDate(p.arrivalDate),
    }))
  }, [externalPatients])

  const [searchedExternalPatients, setSearchedExternalPatients] = useState(
    mappedExternalPatients ?? [],
  )

  // Load external patients
  useEffect(() => {
    fetchExternalPatients()
  }, [fetchExternalPatients])

  // Create form schema
  const AddPatientSchema = z.object({
    patientId: z.string().regex(/^\d+$/),
    firstName: z.string().min(1),
    groupId: z.enum(
      groups.map((group) => group.groupId) as [string, ...string[]],
    ),
    arrivalDate: z.string(),
    departureDate: z.string(),
  })

  // Create form
  const form = useForm<z.infer<typeof AddPatientSchema>>({
    resolver: zodResolver(AddPatientSchema),
  })

  // Set form valeus when selecting external patient
  function setExternalPatient(patient: (typeof mappedExternalPatients)[0]) {
    form.setValue("patientId", patient.patientId)
    form.setValue("firstName", patient.firstName)
    form.setValue("arrivalDate", formatDateInputValue(patient.arrivalDate))
    form.setValue("groupId", patient.groupId)
    form.setValue(
      "departureDate",
      formatDateInputValue(
        patient.departureDate
          ? patient.departureDate
          : new Date(
              new Date(patient.arrivalDate).valueOf() +
                21 * 24 * 60 * 60 * 1000,
            ),
      ),
    )
  }

  async function handleSubmit(values: z.infer<typeof AddPatientSchema>) {
    const success = await addPatient({
      ...values,
      instId: groups.at(0)?.instId ?? "",
      ratings: [],
    })

    if (success) {
      setSaveState("saved")
    } else {
      setSaveState("error")
    }
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-1">
        <SearchBox
          items={mappedExternalPatients}
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
          onInput={setSearchedExternalPatients}
        />
        <div className="overflow-y-auto h-80">
          {externalPatients.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PasientID</TableHead>
                  <TableHead>Fornavn</TableHead>
                  <TableHead>Ankomst</TableHead>
                  <TableHead>Gruppe</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchedExternalPatients.map((ep) => (
                  <TableRow key={ep.patientId}>
                    <TableCell>{ep.patientId}</TableCell>
                    <TableCell>{ep.firstName}</TableCell>
                    <TableCell>{formatDisplayDate(ep.arrivalDate)}</TableCell>
                    <TableCell>{ep.groupId}</TableCell>
                    <TableCell>
                      <Button onPointerDown={() => setExternalPatient(ep)}>
                        Velg
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Kunne ikke laste inn eksterne pasienter</p>
          )}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pasientnummer</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fornavn</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="groupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gruppe</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(groupId) =>
                      form.setValue("groupId", groupId)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent data-content>
                      {groups.map((group) => (
                        <SelectItem key={group.groupId} value={group.groupId}>
                          {group.groupId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrivalDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ankomstdato</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avreisedato</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {saveState !== "unsaved" && (
            <>
              <br />
              {saveState === "saved" ? (
                <p className="text-green-500">Pasient lagt til</p>
              ) : (
                <p className="text-red-500">Noe gikk galt</p>
              )}
            </>
          )}
          <br />
          <div>
            <Button type="submit" className="bg-[--bg-adfectus]">
              Legg til pasient
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
