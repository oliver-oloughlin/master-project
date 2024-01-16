import { useEffect } from "react"
import { createLoaderStore } from "./_loader"
import { getGroups } from "#/services/groups"

const useLoader = createLoaderStore(getGroups)

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
