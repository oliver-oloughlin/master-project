import { Auth } from "aws-amplify"
import { useEffect, useRef, useState } from "react"
import styles from "./styles/CognitoUserButton.module.css"

export default function CognitoUserButton() {
  const [open, setOpen] = useState(false)
  const [letter, setLetter] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLetter("A")

    const checkClick = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      if (!ref.current?.contains(target)) {
        setOpen(false)
      }
    }

    window.addEventListener("pointerdown", checkClick)
    return () => removeEventListener("pointerdown", checkClick)
  }, [])

  return (
    <div ref={ref} className={styles["user-button-wrapper"]}>
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
