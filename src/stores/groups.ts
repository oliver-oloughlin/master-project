import { create } from "zustand"
import type { Group } from "#/models/group"
import { mockGroups } from "#/models/mocks/groups"

export type GroupsStoreState = {
  groups: Group[]
  fetchGroups(): void | Promise<void>
}

export const useGroups = create<GroupsStoreState>((set) => ({
  groups: [],
  // Placeholder for API request
  fetchGroups() {
    set(() => ({ groups: mockGroups }))
  }
}))
