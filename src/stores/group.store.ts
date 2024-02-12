import { createLoaderStore } from "./_loader"
import { getGroup } from "#/services/groups.service"
import { useCallback } from "react"

const useGroupLoader = createLoaderStore(getGroup)

export type GroupView = Awaited<ReturnType<typeof getGroup>>

export const useGroup = (groupId: string) => {
  const { data, fetch, loading, error } = useGroupLoader()
  const fetchGroup = useCallback(() => fetch(groupId), [fetch, groupId])
  return { 
    group: data,
    loading,
    error,
    fetchGroup,
  }
}
