import { create } from "zustand"
import type { Group } from "#/models/group"
import { mockGroups } from "#/models/mocks/groups"
import { useEffect } from "react"

// State type
type GroupsStoreState = {
  groups: null | Group[]
  fetchGroups(): void | Promise<void>
}

// State store
const useStore = create<GroupsStoreState>((set) => ({
  groups: null,
  fetchGroups() {
    // Placeholder for API request
    set({ groups: mockGroups })
  }
}))

// State hook
export const useGroups = () => {
  const { groups, fetchGroups } = useStore(state => state)

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  return groups ?? []
}
