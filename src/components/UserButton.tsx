import { Auth } from "aws-amplify"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import UserAvatar from "./UserAvatar"

export default function CognitoUserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Button 
          variant="ghost" 
          className="w-full text-center" 
          onClick={() => Auth.signOut()}
        >
          Logg ut
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
