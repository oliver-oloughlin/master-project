import { createLoaderStore } from "./_loader"
import { getGroup } from "#/services/groups.service"

const useGroupLoader = createLoaderStore(getGroup)

export type GroupView = ReturnType<typeof getGroup>

export const useGroup = (groupId: string) => {
  const { data, fetch, loading, error } = useGroupLoader()

  async function fetchGroup() {
    await fetch(groupId)
  }

  return { 
    group: data,
    loading,
    error,
    fetchGroup,
  }
}
