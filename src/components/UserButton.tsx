import { Auth } from "aws-amplify"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import UserAvatar from "./UserAvatar"

export default function CognitoUserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Button variant="ghost" onClick={() => Auth.signOut()}>Logg ut</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
