import type { ViewPatient } from "#/models/view/patient"
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
import { useState } from "react"
import { usePatients } from "#/hooks/usePatients"
import { Switch } from "../ui/switch"
import { Season } from "#/models/shared/season"
import AdfetcusButton from "../misc/AdfectusButton"

export type EditPatientFormProps = {
  patient: ViewPatient
}

export default function EditPatientForm({ patient }: EditPatientFormProps) {
  const { groupIds } = useGroupIds()
  const { updatePatient } = usePatients()
  const [saveState, setSaveState] = useState<"unsaved" | "saved" | "error">(
    "unsaved",
  )

  const EditPatientSchema = z.object({
    patientId: z.string().regex(/^\d+$/),
    firstName: z.string().min(1),
    groupId: z.enum(groupIds as [string, ...string[]]),
    arrivalDate: z.string(),
    departureDate: z.string(),
    season: z.coerce.number(),
  })

  const form = useForm<z.infer<typeof EditPatientSchema>>({
    resolver: zodResolver(EditPatientSchema),
    defaultValues: {
      ...patient,
      groupId: patient.groupId,
      arrivalDate: formatDateInputValue(patient.arrivalDate),
      departureDate: patient.departureDate
        ? formatDateInputValue(patient.departureDate)
        : formatDateInputValue(
            new Date(
              new Date(patient.arrivalDate).valueOf() +
                21 * 24 * 60 * 60 * 1000,
            ),
          ),
    },
  })

  async function handleSubmit(values: z.infer<typeof EditPatientSchema>) {
    const success = await updatePatient(patient.patientId, {
      ...values,
      ratings: patient.ratings,
      instId: patient.instId,
    })

    if (success) {
      setSaveState("saved")
    } else {
      setSaveState("error")
    }
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gruppe</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(groupId) => form.setValue("groupId", groupId)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
        {saveState !== "unsaved" && (
          <>
            <br />
            {saveState === "saved" ? (
              <p className="text-green-500">Endringer lagret</p>
            ) : (
              <p className="text-red-500">Noe gikk galt</p>
            )}
          </>
        )}
        <br />
        <div>
          <AdfetcusButton type="submit">Lagre endringer</AdfetcusButton>
        </div>
      </form>
    </Form>
  )
}
