import { adfectusGatewayApiClient } from "#/api_clients/adfectus_gateway"
import { Auth } from "aws-amplify"

export default function Test() {
  async function createUser() {
    const session = await Auth.currentSession()
    const token = session.getIdToken().getJwtToken()

    /*
    const res = await fetch("http://localhost:8200/users", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipient: "adfectus",
        user: {
          userId: "T402",
          groupId: "test_group",
          instId: "test_institution",
          firstname: "Abraham",
          arrivalDate: new Date().toJSON()
        }
      })
    })*/
    
    const res = await adfectusGatewayApiClient.users.post({
      headers: {
        Authorization: token,
      },
      body: {
        user: {
          userId: "T402",
          groupId: "test_group",
          instId: "test_institution",
          firstname: "Abraham",
          arrivalDate: new Date().toJSON()
        }
      },
    })

    console.log(res)
  }

  return (
    <div style={{ padding: "5rem" }} >
      <button onPointerDown={() => createUser()}>Create User</button>
    </div>
  )
}
