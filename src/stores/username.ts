import { useEffect } from "react"
import { createLoaderStore } from "./_loader"
import { getUsername } from "#/services/users"

const useLoader = createLoaderStore(getUsername)

export const useUsername = () => {
  const { data, fetch, loading, error } = useLoader()

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    username: data,
    loading,
    error,
    fetch
  }
}
