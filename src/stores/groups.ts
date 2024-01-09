import { useEffect } from "react"
import { createLoaderStore } from "./_loader"
import { mockGroups } from "#/models/mocks/groups"
import type { Group } from "#/models/group"

// TODO: Replace with API request
function fetcher() {
  return new Promise<Group[]>(r => r(mockGroups))
}

const useLoader = createLoaderStore(fetcher)

export const useGroups = () => {
  const { data, fetch, loading, error } = useLoader()

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
