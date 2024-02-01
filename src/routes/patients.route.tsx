import PatientsTable from "#/components/PatientsTable"
import { usePatients } from "#/stores/patients.store"

export default function Patients() {
  const { patients, loading, error } = usePatients()
  return <PatientsTable 
    patients={patients} 
    loading={loading} 
    error={error} 
    className="m-auto" 
  />
}
