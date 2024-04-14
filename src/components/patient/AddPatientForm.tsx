import { useGroupIds } from "#/hooks/useGroupIds"
import { formatDateInputValue } from "#/utils/formatters"
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
import { useMemo, useState } from "react"
import { usePatients } from "#/hooks/usePatients"
import { useExternalPatients } from "#/hooks/useExternalPatients"
import { fromExternalPatientToViewPatient } from "#/mappers/patients"
import { Switch } from "../ui/switch"
import { Season } from "#/models/shared/season"
import AdfetcusButton from "../misc/AdfectusButton"
import SelectPatientsTable from "./SelectPatientsTable"

export type AddPatientFormProps = {
  groupId?: string
}

export default function AddPatientForm({ groupId }: AddPatientFormProps) {
  const { groupIds } = useGroupIds()
  const { addPatient } = usePatients()
  const { externalPatients } = useExternalPatients(groupId)

  const [saveState, setSaveState] = useState<"unsaved" | "saved" | "error">(
    "unsaved",
  )

  const mappedExternalPatients = useMemo(() => {
    return externalPatients.map((p) => fromExternalPatientToViewPatient(p, []))
  }, [externalPatients])

  // Create form schema
  const AddPatientSchema = z.object({
    patientId: z.string().regex(/^\d+$/),
    firstName: z.string().min(1),
    groupId: z.enum(groupIds as [string, ...string[]]),
    instId: z.string(),
    arrivalDate: z.string(),
    departureDate: z.string(),
    season: z.coerce.number(),
  })

  // Create form
  const form = useForm<z.infer<typeof AddPatientSchema>>({
    resolver: zodResolver(AddPatientSchema),
    defaultValues: {
      season: Season.Summer,
    },
  })

  // Set form valeus when selecting external patient
  function setExternalPatient(patient: (typeof mappedExternalPatients)[0]) {
    form.setValue("patientId", patient.patientId)
    form.setValue("firstName", patient.firstName)
    form.setValue("arrivalDate", formatDateInputValue(patient.arrivalDate))
    form.setValue("groupId", patient.groupId)
    form.setValue("instId", patient.instId)
    form.setValue("season", patient.season)
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
      ratings: [],
    })

    if (success) {
      setSaveState("saved")
    } else {
      setSaveState("error")
    }
  }

  return (
    <div className="grid gap-4 min-w-fit">
      <div className="overflow-y-auto h-80 min-w-fit p-2">
        {externalPatients.length > 0 ? (
          <SelectPatientsTable
            selectLabel="Velg"
            patients={mappedExternalPatients}
            onSelect={setExternalPatient}
          />
        ) : (
          <p>Kunne ikke laste inn eksterne pasienter</p>
        )}
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
                      {groupIds.sort().map((groupId) => (
                        <SelectItem key={groupId} value={groupId}>
                          {groupId}
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
          <FormField
            control={form.control}
            name="season"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sesong</FormLabel>
                <FormControl>
                  <span className="flex gap-2 items-center">
                    <Input type="hidden" {...field} />
                    <Switch
                      inputMode="none"
                      checked={form.getValues().season === Season.Winter}
                      onCheckedChange={(checked) =>
                        form.setValue(
                          "season",
                          checked ? Season.Winter : Season.Summer,
                        )
                      }
                    />
                    Vinter
                  </span>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instId"
            render={({ field }) => (
              <FormItem>
                <Input type="hidden" {...field} />
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
            <AdfetcusButton type="submit">Legg til pasient</AdfetcusButton>
          </div>
        </form>
      </Form>
    </div>
  )
}
