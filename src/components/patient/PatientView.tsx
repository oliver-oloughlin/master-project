import { Patient } from "#/models/patient"
import PatientProgressChart from "./PatientProgressChart"
import PatientRatingsTable from "./PatientRatingsTable"

export type PatientViewProps = {
  patient: Patient
}

export default function PatientView({ patient }: PatientViewProps) {
  return (
    <div className="w-[100ch] flex flex-col gap-8">
      {patient.avatarUrl && <img src={patient.avatarUrl} />}
      <div>
        <h2 className="text-center text-2xl">Nyeste svar</h2>
        <br/>
        <PatientRatingsTable patient={patient} />
      </div>
      <div>
        <h2 className="text-center text-2xl">Utvikling</h2>
        <br/>
        <PatientProgressChart patient={patient} />
      </div>
    </div>
  )
}
