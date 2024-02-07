import PatientsTable from "#/components/PatientsTable"
import { usePatients } from "#/stores/patients.store"
import { useEffect } from "react"

export default function IndexRoute() {
  const { patients, loading, error, fetchPatients } = usePatients()

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  return <PatientsTable 
    patients={patients} 
    loading={loading} 
    error={error} 
    className="m-auto" 
  />
}
