import type { Data, Group, User } from "./models"

export type Mapper<T> = (data: unknown) => T

export type DataMapper = Mapper<Data>

export type GroupMapper = Mapper<Group>

export type UserMapper = Mapper<User>
