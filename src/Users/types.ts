export interface UserStructure {
  _id: string;
  name: string;
  username: string;
  password: string;
}

export type UserStructureWithoutId = Omit<UserStructure, "_id">;

export type UserUpdateStructure = Partial<
  Omit<UserStructure, "_id" | "password">
> & {
  password?: string;
};
