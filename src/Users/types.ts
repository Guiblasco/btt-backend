export interface UserStructure {
  _id: string;
  name: string;
  username: string;
  password: string;
}

export type UserCreateData = Omit<UserStructure, "_id">;
export type UserUpdateData = Partial<UserCreateData>;
