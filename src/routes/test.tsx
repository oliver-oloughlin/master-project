import { data } from "#/data/mock"

export default function Test() {
  return (
    <>
    <div>
      <h1>Groups</h1>
      {data.groups.map((group) => (
        <>
        <div key={group.groupId}>
          <h3>groupId: {group.groupId}</h3>
          <div>
            <h4>Users</h4>
            {group.users.map((user) => (
              <>
              <div key={user.userId}>
                <p>userId: {user.userId}</p>
                <p>name: {user.name}</p>
                <p>arrivalDate: {user.arrivalDate}</p>
              </div>
              <br/>
              </>
            ))}
          </div>
        </div>
        <br/>
        </>
      ))}
    </div>
    </>
  )
}
