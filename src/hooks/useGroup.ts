import { getGroupById } from "#/services/groups"
import { createLoaderStore, useLoaderStore } from "#/utils/zustand"

const store = createLoaderStore(getGroupById)

export const useGroup = (groupId: string) => {
  const { data, ...rest } = useLoaderStore(store, groupId)
  return {
    group: data,
    ...rest,
  }
}
