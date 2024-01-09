import UserButton from "./CognitoUserButton"
import { Link, useMatches } from "@tanstack/react-router"
import { useGroups } from "#/stores/groups"
import { 
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { twMerge } from "tailwind-merge"

export default function Header() {
  const { groups } = useGroups()
  const matches = useMatches()
  const pathnames = matches.map(m => m.routeId)
  const selected = pathnames.includes("/groups/$groupId") ? "group" : pathnames.includes("/patients") ? "patients" : null

  const baseClass = "!px-4 !py-2 !h-fit !w-fit text-[--clr-adfectus] hover:!text-white focus:!text-white !bg-[--bg-adfectus] text-lg font-medium duration-100 relative"
  const selectedClass = "after:absolute after:content-[''] after:bottom-0 after:left-0 after:right-0 after:h-[.125em] after:rounded-full after:bg-current"

  return (
    <header className="w-screen h-20 px-10 flex justify-between items-center bg-[--bg-adfectus]">
      <Link to="/">
        <img className="h-14 w-10" src="/static/adfectus_logo.png" />
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger className={twMerge(baseClass, selected === "group" ? selectedClass : "")}>Grupper</NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col !min-w-16">
              {groups && groups.map(({ groupId }) => (
                <Link 
                  key={groupId} 
                  to="/groups/$groupId"
                  params={{ groupId: groupId }}
                  className="!px-4 !py-2 hover:bg-slate-100"
                >
                  {groupId}
                </Link>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link 
              to="/patients" 
              className={twMerge(navigationMenuTriggerStyle(), `${baseClass} ${selected === "patients" ? selectedClass : ""}`)}
            >
              Pasienter
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <span className="flex gap-4">
        <UserButton />
      </span>
    </header>
  )
}
