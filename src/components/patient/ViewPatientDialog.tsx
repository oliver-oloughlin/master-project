import { ViewPatient } from "#/models/view/patient"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "#/components/ui/dialog"
import PatientView from "./PatientView"
import { ADFECTUS_BTN_CLASS } from "../misc/AdfectusButton"

export type EditPatientDialogProps = {
  patient: ViewPatient
}

export default function ViewPatientDialog({ patient }: EditPatientDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className={ADFECTUS_BTN_CLASS}>Visning</DialogTrigger>
      <DialogContent className="min-w-fit overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{patient.firstName}</DialogTitle>
          <DialogDescription>Avatar og historiske svar</DialogDescription>
        </DialogHeader>
        <PatientView patient={patient} />
      </DialogContent>
    </Dialog>
  )
}
