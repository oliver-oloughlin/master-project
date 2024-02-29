import { Patient } from "#/models/patient"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTrigger, 
  DialogDescription, 
  DialogTitle
} from "#/components/ui/dialog"
import PatientView from "./PatientView"

export type EditPatientDialogProps = {
  patient: Patient
}

export default function ViewPatientDialog({ patient }: EditPatientDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="bg-[--bg-adfectus] hover:bg-cyan-600 rounded-md px-4 py-2 text-slate-100 hover:text-white">Visning</DialogTrigger>
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
