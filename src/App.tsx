import RouterProvider from "./Router"
import Authenticator from "#/components/CognitoAuthenticator"

export default function App() {
  return (
    <Authenticator>
      <RouterProvider />
    </Authenticator>
  )
}
