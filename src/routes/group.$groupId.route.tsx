import { groupRoute } from "#/Router"
import PatientsTable from "#/components/PatientsTable"
import { useGroup } from "#/stores/group.store"

export default function Groups() {
  const { groupId } = groupRoute.useParams()
  const { group, loading, error } = useGroup(groupId)
  return (
    <div className="m-auto w-[min(100%,120ch)] items-center p-6 grid gap-6">
      <h1 className="text-slate-700 text-3xl font-bold text-center">Gruppe {groupId}</h1>
      <PatientsTable 
        patients={group?.patients ?? []} 
        loading={loading} 
        error={error}
        className="w-full"
      />
    </div>
  )
}
