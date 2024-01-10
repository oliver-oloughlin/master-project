import type { Patient } from "#/models/patient"
import { useGroups } from "#/stores/groups"
import { formatDateInputValue } from "#/utils/formatters"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"

export type EditPatientFormProps = {
  patient: Patient
}

export default function EditPatientForm({ patient }: EditPatientFormProps) {
  const { groups } = useGroups()

  const EditPatientSchema = z.object({
    patientId: z.string().regex(/^[0-9]$/),
    firstName: z.string(),
    groupId: z.enum(groups.map(group => group.groupId) as [string, ...string[]]),
    arrivalDate: z.string(),
    departureDate: z.string(),
  })

  const form = useForm<z.infer<typeof EditPatientSchema>>({
    resolver: zodResolver(EditPatientSchema),
    defaultValues: {
      patientId: patient.patientId,
      firstName: patient.firstName,
      groupId: patient.groupId,
      arrivalDate: formatDateInputValue(patient.arrivalDate),
      departureDate: patient.departureDate 
        ? formatDateInputValue(patient.departureDate)
        : formatDateInputValue(new Date(new Date(patient.arrivalDate).valueOf() + 21 * 24 * 60 * 60 * 1000))
    },
  })

  function handleSubmit(values: z.infer<typeof EditPatientSchema>) {

  }

  return (
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
          render={({ field: { value, ...rest } }) => (
            <FormItem>
              <FormLabel>Gruppe</FormLabel>
              <FormControl>
                <Select defaultValue={value} {...rest} >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
        <br/>
        <Button type="submit" className="bg-[--bg-adfectus]">Lagre endringer</Button>
      </form>
    </Form>
  )
}
