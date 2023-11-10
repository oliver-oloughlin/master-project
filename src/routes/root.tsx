import { Link, Outlet } from "@tanstack/react-router"

export default function Root() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
      </div>
      <hr />
      <Outlet />
    </>
  )
}