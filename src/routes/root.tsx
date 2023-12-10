import { Outlet } from "@tanstack/react-router"
import Authenticator from "#/components/CognitoAuthenticator"
import styles from "./styles/root.module.css"
import SideMenu from "#/components/SideMenu"

// Root component
export default function Root() {
  return (
    <Authenticator>
      <div className={styles["content-wrapper"]}>
        <SideMenu />
        <Outlet />
      </div>
    </Authenticator>
  )
}
