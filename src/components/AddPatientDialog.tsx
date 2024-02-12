import AddPatientForm from "./AddPatientForm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

export default function AddPatientDialog() {
  return (
    <Dialog>
      <DialogTrigger 
        className="bg-emerald-600 hover:bg-emerald-700 rounded-md px-4 py-2 text-slate-100 hover:text-white w-fit"
      >
        Legg til pasient
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Legg til pasient</DialogTitle>
        </DialogHeader>
        <AddPatientForm />
      </DialogContent>
    </Dialog>
  )
}
