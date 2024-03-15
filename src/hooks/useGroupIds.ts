import { createLoaderStore, useLoaderStore } from "#/utils/zustand"
import { getGroupIds } from "#/services/groups"

const store = createLoaderStore(getGroupIds)

export const useGroupIds = () => {
  const { data, ...rest } = useLoaderStore(store)
  return {
    groupIds: data ?? [],
    ...rest,
  }
}
