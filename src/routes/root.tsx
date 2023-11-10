import { Link, Outlet } from "@tanstack/react-router"
import { Authenticator } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify"

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    region: process.env["REGION"],
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
})

// Root component
export default function Root() {
  return (
    <Authenticator>
      <div>
        <Link to="/">Home</Link>
      </div>
      <hr />
      <Outlet />
    </Authenticator>
  )
}