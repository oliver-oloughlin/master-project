import { useEffect } from "react"
import { FetcherView, createLoaderStore } from "./_loader"
import { getGroup } from "#/services/groups.service"

const useGroupLoader = createLoaderStore(getGroup)

export type GroupView = FetcherView<typeof getGroup>

export const useGroup = (groupId: string) => {
  const { data, fetch, loading, error } = useGroupLoader()

  useEffect(() => {
    fetch(groupId)
  }, [fetch, groupId])

  return { 
    group: data,
    loading,
    error,
    fetch
  }
}
