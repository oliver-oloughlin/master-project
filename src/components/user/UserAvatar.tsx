import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar"
import { useUsername } from "#/hooks/userExternalUser"
import { useEffect } from "react"

export default function UserAvatar() {
  const { username, fetchUsername } = useUsername()

  useEffect(() => {
    fetchUsername()
  }, [fetchUsername])

  return (
    <Avatar>
      <AvatarImage />
      <AvatarFallback className="grid place-items-center items-baseline text-3xl bg-slate-200 text-slate-500">
        {username?.at(0)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
