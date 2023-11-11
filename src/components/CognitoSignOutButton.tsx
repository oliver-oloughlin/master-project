import { Auth } from "aws-amplify"

export default function CognitoSignOutButton() {
  return (
    <button onPointerDown={() => Auth.signOut()}>
      Sign Out
    </button>
  )
}
