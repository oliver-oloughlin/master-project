import { Outlet } from "@tanstack/react-router"
import UserButton from "../components/user/UserButton"
import { Link, useMatches } from "@tanstack/react-router"
import { useGroups } from "#/stores/groups.store"
import { useEffect, useState } from "react"
import Triangle from "../components/utils/Triangle"

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

function Header() {
  const { groups, fetchGroups } = useGroups()
  const [groupsOpen, setGroupsOpen] = useState(false)
  const matches = useMatches()
  const pathnames = matches.map((m) => m.routeId)
  const selected = pathnames.includes("/groups/$groupId")
    ? "group"
    : pathnames.includes("/")
      ? "patients"
      : null

  const baseClass =
    "px-4 py-2 h-fit w-fit text-[--clr-adfectus] hover:text-white focus:text-white bg-[--bg-adfectus] text-lg font-medium duration-100 relative"
  const selectedClass =
    "after:absolute after:content-[''] after:bottom-0 after:left-0 after:right-0 after:h-[.125em] after:rounded-full after:bg-current"

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  return (
    <header className="w-screen h-20 px-10 flex justify-between items-center bg-[--bg-adfectus] z-40">
      <Link to="/">
        <img className="h-14 w-10" src="/adfectus_logo.png" />
      </Link>
      <span className="flex gap-4 items-center">
        <Link
          to="/"
          className={`${baseClass} ${selected === "patients" ? selectedClass : ""}`}
        >
          Pasienter
        </Link>
        <div
          className="relative px-4 py-2"
          onPointerEnter={() => setGroupsOpen(true)}
          onPointerLeave={() => setGroupsOpen(false)}
        >
          <Link
            onPointerDown={() => setGroupsOpen((v) => !v)}
            className={`${baseClass} flex gap-2 items-center ${selected === "group" ? selectedClass : ""}`}
          >
            Grupper{" "}
            <Triangle
              oriantation={groupsOpen ? "up" : "down"}
              className="border-8"
            />
          </Link>
          {groupsOpen && (
            <div className="absolute left-0 top-full flex flex-col min-w-full bg-white rounded-md border-slate-100 border-[.075rem] shadow-md isolate overflow-hidden z-50">
              {groups &&
                groups.map(({ groupId }) => (
                  <Link
                    key={groupId}
                    to="/groups/$groupId"
                    params={{ groupId: groupId }}
                    className="px-4 py-2 hover:bg-slate-100"
                  >
                    {groupId}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </span>
      <UserButton />
    </header>
  )
}
