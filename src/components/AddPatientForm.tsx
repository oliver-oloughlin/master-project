import { useGroups } from "#/stores/groups.store"
import { formatDateInputValue, formatDisplayDate } from "#/utils/formatters"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { usePatients } from "#/stores/patients.store"
import { useExternalPatients } from "#/stores/external_patients.store"
import SearchBox from "./SearchBox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ExternalPatient } from "#/models/external_patient"

export default function AddPatientForm() {
  const { groups } = useGroups()
  const { addPatient } = usePatients()
  const { externalPatients, fetchExternalPatients } = useExternalPatients()
  const [searchedExternalPatients, setSearchedExternalPatients] = useState(externalPatients)
  const [saveState, setSaveState] = useState<"unsaved" | "saved" | "error">("unsaved")

  useEffect(() => {
    fetchExternalPatients()
  }, [fetchExternalPatients])

  const AddPatientSchema = z.object({
    patientId: z.string().regex(/^\d+$/),
    firstName: z.string().min(1),
    groupId: z.enum(groups.map(group => group.groupId) as [string, ...string[]]),
    arrivalDate: z.string(),
    departureDate: z.string(),
  })

  const form = useForm<z.infer<typeof AddPatientSchema>>({
    resolver: zodResolver(AddPatientSchema),
  })

  function setExternalPatient(patient: ExternalPatient) {
    form.setValue("patientId", patient.patientId)
    form.setValue("firstName", patient.firstName)
    form.setValue("arrivalDate", formatDateInputValue(patient.arrivalDate))
    form.setValue("groupId", patient.groupId)
    form.setValue("departureDate", formatDateInputValue(
      patient.departureDate 
        ? patient.departureDate 
        : new Date(new Date(patient.arrivalDate).valueOf() + 21 * 24 * 60 * 60 * 1000))
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
          items={externalPatients} 
          searchKeys={[
            {
              key: "patientId",
              label: "Pasient ID"
            },
            {
              key: "firstName",
              label: "Fornavn",
            },
            {
              key: "groupId",
              label: "Gruppe",
            }
          ]}
          defaultSearchKey="firstName"
          onInput={setSearchedExternalPatients}
        />
        <div className="overflow-y-auto max-h-80">
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
              {searchedExternalPatients.map(ep => (
                <TableRow>
                  <TableCell>{ep.patientId}</TableCell>
                  <TableCell>{ep.firstName}</TableCell>
                  <TableCell>{formatDisplayDate(ep.arrivalDate)}</TableCell>
                  <TableCell>{ep.groupId}</TableCell>
                  <TableCell><Button onPointerDown={() => setExternalPatient(ep)}>Velg</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                  <Select {...field} onValueChange={groupId => form.setValue("groupId", groupId)} >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent data-content>
                      {groups.map(group => <SelectItem key={group.groupId} value={group.groupId}>{group.groupId}</SelectItem>)}
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
          {saveState !== "unsaved" && 
            <>
            <br/>
            {saveState === "saved" 
              ? <p className="text-green-500">Pasient lagt til</p> 
              : <p className="text-red-500">Noe gikk galt</p>}
            </>
          }
          <br/>
          <div>
            <Button type="submit" className="bg-[--bg-adfectus]">Legg til pasient</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
