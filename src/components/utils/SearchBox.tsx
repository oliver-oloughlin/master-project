import { HTMLAttributes, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { twMerge } from "tailwind-merge"
import fuzzysort from "fuzzysort"

export type SearchKey<T> = {
  key: keyof T
  label: string
}

export type SearchBoxProps<T> = Omit<HTMLAttributes<HTMLInputElement>, "onInput"> & {
  items: T[]
  searchKeys: [SearchKey<T>, ...SearchKey<T>[]]
  defaultSearchKey: keyof T
  onInput: (items: T[]) => unknown
}

export default function SearchBox<T extends Record<string, unknown>>({ items, searchKeys, defaultSearchKey, onInput, className, ...rest }: SearchBoxProps<T>) {
  const [searchKey, setSearchKey] = useState(searchKeys.find(sk => sk.key === defaultSearchKey) ?? searchKeys[0])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const result = fuzzysort
      .go(search, items as any, { all: true, key: searchKey.key } as any) // eslint-disable-line
      .map(r => (r as any).obj) // eslint-disable-line

    onInput(result)
  }, [search, searchKey, items])

  return (
    <span className="flex rounded-md has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-black ring-offset-2">
      <Input
        {...rest}
        type="search"
        onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
        className={twMerge(className, "rounded-r-none flex-grow disable-ring")}
      />
      {searchKeys.length > 1 &&
        <Select 
          defaultValue={defaultSearchKey.toString()} 
          onValueChange={(value) => setSearchKey(searchKeys.find(sk => sk.key === value) ?? searchKeys[0])}
        >
          <SelectTrigger className="rounded-l-none w-[20ch] min-w-fit disable-ring">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {searchKeys.map(sk => <SelectItem key={sk.key.toString()} value={sk.key.toString()}>{sk.label}</SelectItem>)}
          </SelectContent>
        </Select>
      }
    </span>
  )
}
