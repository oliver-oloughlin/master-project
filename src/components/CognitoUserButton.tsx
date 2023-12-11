import { Auth } from "aws-amplify"
import { useEffect, useRef, useState } from "react"
import styles from "./styles/CognitoUserButton.module.css"

export default function CognitoUserButton() {
  const [open, setOpen] = useState(false)
  const [letter, setLetter] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    setLetter("A")

    const checkClick = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as HTMLElement)) {
        setOpen(false)
      }
    }

    window.addEventListener("pointerdown", checkClick)
    return () => removeEventListener("pointerdown", checkClick)
  }, [])

  return (
    <div className={styles["user-button-wrapper"]}>
      <button 
        className={styles["user-button"]} 
        onClick={() => setOpen(val => !val)}
      >
        {letter}
      </button>
      {open && (
        <div className={styles["dropdown"]}>
          <button onClick={() => Auth.signOut()}>
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
