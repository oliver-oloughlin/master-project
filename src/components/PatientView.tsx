import { Patient } from "#/models/patient"
import PatientProgressChart from "./PatientProgressChart"

export type PatientViewProps = {
  patient: Patient
}

export default function PatientView({ patient }: PatientViewProps) {
  return (
    <div className="w-[100ch] flex flex-col gap-8">
      {patient.avatarUrl && <img src={patient.avatarUrl} />}
      <PatientProgressChart patient={patient} />
    </div>
  )
}
