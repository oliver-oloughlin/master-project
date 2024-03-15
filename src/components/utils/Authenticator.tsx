import { Authenticator } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify"
import "@aws-amplify/ui-react/styles.css"
import { useUsername } from "#/hooks/userExternalUser"
import { useEffect } from "react"

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    region: "eu-north-1",
    userPoolId: "eu-north-1_2w3kj3qL2",
    userPoolWebClientId: "138vl5vhd6v3k8g3u3qjamhcur",
  },
})

export default function OuterAuthenticator({
  children,
}: {
  children?: React.ReactNode
}) {
  const { username, fetchUsername } = useUsername()

  useEffect(() => {
    fetchUsername()
  }, [fetchUsername])

  return (
    <Authenticator
      className="h-screen grid place-items-center"
      hideSignUp
      formFields={{
        signIn: {
          username: {
            defaultValue: username ?? undefined,
            isReadOnly: !!username,
          },
        },
      }}
    >
      {children}
    </Authenticator>
  )
}
