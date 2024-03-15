import PatientsTable from "#/components/patient/PatientsTable"
import { usePatients } from "#/hooks/usePatients"

export default function IndexRoute() {
  const { patients, loading, error } = usePatients()
  return (
    <PatientsTable
      patients={patients}
      loading={loading}
      error={error}
      className="m-auto"
    />
  )
}
