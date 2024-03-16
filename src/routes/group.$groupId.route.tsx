import { groupRoute } from "#/Router"
import GroupRatingsTable from "#/components/group/GroupRatingsTable"
import PatientsTable from "#/components/patient/PatientsTable"
import { useGroup } from "#/hooks/useGroup"

export default function Groups() {
  const { groupId } = groupRoute.useParams()
  const { group, loading, error } = useGroup(groupId)
  const patients = group?.patients ?? []

  return (
    <div className="m-auto w-[min(100%,100ch)] items-center p-6 grid gap-6">
      <h1 className="text-slate-700 text-3xl font-bold text-center">
        Gruppe {groupId}
      </h1>
      <PatientsTable
        patients={patients}
        loading={loading}
        error={error}
        groupId={groupId}
        className="w-full"
      />
      <GroupRatingsTable patients={patients} />
    </div>
  )
}
