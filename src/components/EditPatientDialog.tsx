import { Patient } from "#/models/patient"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTrigger, 
  DialogDescription, 
  DialogTitle
} from "#/components/ui/dialog"
import EditPatientForm from "./EditPatientForm"

export type EditPatientDialogProps = {
  patient: Patient
}

export default function EditPatientDialog({ patient }: EditPatientDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="bg-slate-700 hover:bg-slate-900 rounded-md px-4 py-2 text-slate-50">Rediger</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger Pasient</DialogTitle>
          <DialogDescription>Legg inn nødvendige pasientopplysninger. Alle felt er obligatoriske.</DialogDescription>
        </DialogHeader>
        <EditPatientForm patient={patient} />
      </DialogContent>
    </Dialog>
  )
}
