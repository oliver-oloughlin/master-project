import type { Patient } from "#/models/patient"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import RequestFeedbackForm from "./RequestFeedbackForm"

export type RequestFeedbackDialogProps = {
  patients: Patient[]
}

export default function RequestFeedbackDialog({
  patients,
}: RequestFeedbackDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="flex gap-2 items-center bg-slate-700 hover:bg-slate-900 rounded-md px-4 py-2 text-slate-100 hover:text-white w-fit">
        Be om tilbakemelding
      </DialogTrigger>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>Be om tilbakemelding</DialogTitle>
        </DialogHeader>
        <RequestFeedbackForm patients={patients} />
      </DialogContent>
    </Dialog>
  )
}
