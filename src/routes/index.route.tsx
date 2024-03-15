import PatientsTable from "#/components/patient/PatientsTable"
import { usePatients } from "#/hooks/usePatients"
import { useEffect } from "react"

export default function IndexRoute() {
  const { patients, loading, error, fetchPatients } = usePatients()

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  return (
    <PatientsTable
      patients={patients}
      loading={loading}
      error={error}
      className="m-auto"
    />
  )
}
