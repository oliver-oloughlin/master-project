import { useEffect } from "react"
import { createLoaderStore } from "./_loader"

// TODO: Replace with API request
function fetcher() {
  return new Promise<string>(r => r("olivol"))
}

const useLoader = createLoaderStore(fetcher)

export const useUsername = () => {
  const { data, fetch } = useLoader(({ data, fetch }) => ({ data, fetch }))

  useEffect(() => {
    fetch()
  }, [fetch])

  return data
}
