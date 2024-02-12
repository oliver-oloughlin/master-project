import { createLoaderStore } from "./_loader"
import { getUsername } from "#/services/users.service"

const useLoader = createLoaderStore(getUsername)

export type UsernameView = Awaited<ReturnType<typeof getUsername>>

export const useUsername = () => {
  const { data, fetch, loading, error } = useLoader()
  return {
    username: data,
    loading,
    error,
    fetchUsername: fetch
  }
}
