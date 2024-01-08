import UserButton from "./CognitoUserButton"
import { Link, useMatches } from "@tanstack/react-router"

export default function Header() {
  const matches = useMatches()
  const pathnames = matches.map(m => m.pathname)
  const selected = pathnames.includes("/groups") ? "groups" : pathnames.includes("/patients") ? "patients" : null

  const baseLinkClassName = "px-2 py-1 text-[--clr-adfectus] text-lg font-medium duration-100 hover:text-white relative"
  const selectedLinkClassName = "after:absolute after:content-[''] after:bottom-0 after:left-0 after:right-0 after:h-[.125em] after:rounded-full after:bg-current"

  return (
    <header className="w-screen h-20 px-10 flex justify-between items-center bg-[--bg-adfectus]">
      <Link to="/">
        <img className="h-14 w-10" src="/static/adfectus_logo.png" />
      </Link>
      <nav className="flex gap-8">
        <Link to="/groups" className={`${baseLinkClassName} ${selected === "groups" ? selectedLinkClassName : ""}`}>
          Grupper
        </Link>
        <Link to="/patients" className={`${baseLinkClassName} ${selected === "patients" ? selectedLinkClassName : ""}`}>
          Pasienter
        </Link>
      </nav>
      <span className="flex gap-4">
        <UserButton />
      </span>
    </header>
  )
}
