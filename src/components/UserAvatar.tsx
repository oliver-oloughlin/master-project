import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "#/components/ui/avatar"
import { useUsername } from "#/stores/username"

export default function UserAvatar() {
  const { username } = useUsername()
  return (
    <Avatar>
      <AvatarImage />
      <AvatarFallback className="grid place-items-center items-baseline text-3xl bg-slate-200 text-slate-500">
        {username?.at(0)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
