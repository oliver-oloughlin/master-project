import { Patient } from "#/models/patient"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTrigger, 
  DialogDescription, 
  DialogTitle
} from "#/components/ui/dialog"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "#/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "#/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useGroups } from "#/stores/groups"
import { formatDateInputValue } from "#/utils/formatters"

export type EditPatientDialogProps = {
  patient: Patient
}

export default function EditPatientDialog({ patient }: EditPatientDialogProps) {
  const { groups } = useGroups()

  const EditPatientSchema = z.object({
    patientId: z.number(),
    firstName: z.string(),
    groupId: z.enum(groups.map(group => group.groupId) as [string, ...string[]]),
    arrivalDate: z.string(),
    departureDate: z.string(),
  })

  const form = useForm<z.infer<typeof EditPatientSchema>>({
    resolver: zodResolver(EditPatientSchema),
    defaultValues: {
      patientId: parseInt(patient.userId),
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
    <Dialog>
      <DialogTrigger className="bg-slate-700 hover:bg-slate-900 rounded-md px-4 py-2 text-slate-100 hover:text-white">Rediger</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger Pasient</DialogTitle>
          <DialogDescription>Legg inn nødvendige pasientopplysninger. Alle felt er obligatoriske.</DialogDescription>
        </DialogHeader>
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
                    <Input {...field} />
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
