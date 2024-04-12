import { useActivities } from "#/hooks/useActivities"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import type { ViewPatient } from "#/models/view/patient"

export type RequestFeedbackFormProps = {
  patients: ViewPatient[]
}

export default function RequestFeedbackForm({
  // TODO: use props
  patients: _,
}: RequestFeedbackFormProps) {
  const { activities, loading, error } = useActivities()
  const [activity, setActivity] = useState<string | null>(null)

  if (loading) {
    return <>Laster...</>
  }

  if (error) {
    return <>Kunne ikke laste inn aktiviteter</>
  }

  return (
    <div>
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
      <br />
      {activity && <>Pasienter...</>}
    </div>
  )
}
