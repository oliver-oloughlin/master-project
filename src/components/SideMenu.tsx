import { useGroups } from "#/state/groups"
import styles from "./styles/SideMenu.module.css"
import UserButton from "#/components/CognitoUserButton"

export default function SideMenu() {
  const groups = useGroups()
  return (
    <section className={styles["side-menu"]}>
      <UserButton />
      <nav className={styles["nav"]}>
        {groups.map((group) => (
          <a 
            key={group.groupId} 
            href={`/groups/${group.groupId}`}
          >
            {group.groupId}
          </a>
        ))}
      </nav>
    </section>
  )
}