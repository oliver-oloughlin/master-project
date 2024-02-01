import { Authenticator } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify"
import { useUsername } from "#/stores/username.store"
import "@aws-amplify/ui-react/styles.css"

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    region: "eu-north-1",
    userPoolId: "eu-north-1_2w3kj3qL2",
    userPoolWebClientId: "138vl5vhd6v3k8g3u3qjamhcur",
  }
})

export default function CognitoAuthenticator({ children }: { children?: React.ReactNode }) {
  const { username } = useUsername()
  return (
      <Authenticator
        className="h-screen grid place-items-center"
        hideSignUp
        formFields={{
          signIn: {
            username: {
              isReadOnly: true,
              defaultValue: username ?? ""
            }
          }
        }}
      >
        {children}
      </Authenticator>
  )
}
