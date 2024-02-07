import { createLoaderStore } from "./_loader"
import { getGroups } from "#/services/groups.service"

const useGroupsLoader = createLoaderStore(getGroups)

export type GroupsView = ReturnType<typeof getGroups>

export const useGroups = () => {
  const { data, fetch, loading, error } = useGroupsLoader()

  return {
    groups: data ?? [],
    loading,
    error,
    fetchGroups: fetch
  }
}
