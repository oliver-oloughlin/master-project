import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar"
import { useExternalUser } from "#/hooks/useExternalUser"

export default function UserAvatar() {
  const { externalUser } = useExternalUser()

  return (
    <Avatar>
      <AvatarImage />
      <AvatarFallback className="grid place-items-center items-baseline text-3xl bg-slate-200 text-slate-500">
        {externalUser?.username.at(0)?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
