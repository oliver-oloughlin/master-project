import { useGroups } from "#/stores/groups"
import styles from "./styles/SideMenu.module.css"
import SignOutButton from "#/components/CognitoSignOutButton"

export default function SideMenu() {
  const groups = useGroups(state => state.groups)

  return (
    <section className={styles["side-menu"]}>
      <SignOutButton />
      <nav className={styles["nav"]}>
        {groups.map((group) => <span key={group.groupId}>{group.groupId}</span>)}
      </nav>
    </section>
  )
}