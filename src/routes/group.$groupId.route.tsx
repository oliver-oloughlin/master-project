import { groupRoute } from "#/Router"

export default function Groups() {
  const { groupId } = groupRoute.useParams()
  return (
    <h1>Group: {groupId}</h1>
  )
}
