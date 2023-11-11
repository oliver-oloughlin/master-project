import { Link, Outlet } from "@tanstack/react-router"
//import { Authenticator } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify"
import "@aws-amplify/ui-react/styles.css"

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    region: "eu-north",
    userPoolId: "eu-north-1_yLiXq078c",
    userPoolWebClientId: "7n3e418kgbr3rlv7s33sjf48a3"
  }
})

// Root component
export default function Root() {
  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/test">Test</Link>
      </div>
      <hr />
      <Outlet />
    </>
  )
}