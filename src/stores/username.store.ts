import { useEffect } from "react"
import { FetcherView, createLoaderStore } from "./_loader"
import { getUsername } from "#/services/users.service"

const useLoader = createLoaderStore(getUsername)

export type UsernameView = FetcherView<typeof getUsername>

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
