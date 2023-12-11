import { create } from "zustand"

export type UsernameState = {
  username: null | string
  fetchUsername(): void | Promise<void>
}

export const useUsername = create<UsernameState>((set) => ({
  username: null,
  // Placeholder for API request
  fetchUsername() {
    setTimeout(() => set(() => ({ username: "olivol" })), 1_000)
  }
}))
