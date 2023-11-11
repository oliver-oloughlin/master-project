import { Link, Outlet } from "@tanstack/react-router"
import Authenticator from "#/components/CognitoAuthenticator"
import CognitoSignOutButton from "#/components/CognitoSignOutButton"

// Root component
export default function Root() {
  return (
    <Authenticator>
      <div>
        <Link to="/">Home</Link> <Link to="/test">Test</Link> <CognitoSignOutButton />
      </div>
      <hr />
      <Outlet />
    </Authenticator>
  )
}
