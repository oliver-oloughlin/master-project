import { Outlet } from "@tanstack/react-router"
import Authenticator from "#/components/CognitoAuthenticator"
import Header from "#/components/Header"

// Root component
export default function Root() {
  return (
    <>
    <Authenticator>
      <Header />
      <main>
        <Outlet />
      </main>
    </Authenticator>
    </>
  )
}
