import { Outlet } from "@tanstack/react-router"
import Header from "#/components/Header"

// Root component
export default function Root() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}
