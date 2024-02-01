export type RepeatProps = {
  n: number
  children: React.ReactNode
}

export default function Repeat({ children, n }: RepeatProps) {
  const items: React.ReactNode[] = []

  for (let i = 0; i < n; i++) {
    items.push(children)
  }

  return items
}
