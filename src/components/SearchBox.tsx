import { HTMLAttributes, useCallback, useState } from "react"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { twMerge } from "tailwind-merge"

export type SearchKey<T> = {
  key: keyof T
  label: string
}

export type SearchBoxProps<T> = Omit<HTMLAttributes<HTMLInputElement>, "onInpput"> & {
  items: T[]
  searchKeys: [SearchKey<T>, ...SearchKey<T>[]]
  defaultSearchKey: keyof T
  onInput: (items: T[]) => unknown
}

export default function SearchBox<T>({ items, searchKeys, defaultSearchKey, onInput, className, ...rest }: SearchBoxProps<T>) {
  const [search, setSearch] = useState("")
  const [searchKey, setSearchKey] = useState(searchKeys.find(sk => sk.key === defaultSearchKey) ?? searchKeys[0])

  useCallback(() => {
    onInput([])
  }, [search, searchKey])

  return (
    <span className="flex">
      <Input
        {...rest}
        type="search"
        onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
        className={twMerge(className, "rounded-r-none")}
      />
      <Select defaultValue={defaultSearchKey.toString()} onValueChange={(value) => setSearchKey(searchKeys.find(sk => sk.key === value) ?? searchKeys[0])} >
        <SelectTrigger className="rounded-l-none w-[20ch]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {searchKeys.map(sk => <SelectItem key={sk.key.toString()} value={sk.key.toString()}>{sk.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </span>
  )
}
