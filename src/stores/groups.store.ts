import { useEffect } from "react"
import { FetcherView, createLoaderStore } from "./_loader"
import { getGroups } from "#/services/groups.service"

const useGroupsLoader = createLoaderStore(getGroups)

export type GroupsView = FetcherView<typeof getGroups>

export const useGroups = () => {
  const { data, fetch, loading, error } = useGroupsLoader()

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    groups: data ?? [],
    loading,
    error,
    fetch
  }
}
