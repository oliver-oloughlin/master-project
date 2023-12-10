import { Authenticator } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify"
import "@aws-amplify/ui-react/styles.css"
import { useEffect } from "react"
import styles from "./styles/CognitoAuthenticator.module.css"
import { useUsername } from "#/stores/username"

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    region: "eu-north-1",
    userPoolId: "eu-north-1_2w3kj3qL2",
    userPoolWebClientId: "138vl5vhd6v3k8g3u3qjamhcur"
  }
})

export default function CognitoAuthenticator({ children }: { children?: React.ReactNode }) {
  const { username, fetchUsername } = useUsername(state => ({ username: state.username, fetchUsername: state.fetchUsername }))

  useEffect(() => {
    fetchUsername()
  }, [fetchUsername])

  return (
    <>
    {username && (
      <Authenticator
        className={styles["authenticator"]}
        hideSignUp
        formFields={{
          signIn: {
            username: {
              isReadOnly: true,
              defaultValue: username
            }
          }
        }}
      >
        {children}
      </Authenticator>
    )}
    </>
  )
}
