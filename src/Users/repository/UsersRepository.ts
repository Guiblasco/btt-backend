import type { UserCreateData, UserStructure } from "../types";

export interface UsersRepository {
  getAll(): Promise<UserStructure[]>;
  getUserById(id: string): Promise<UserStructure | null>;
  createUser(data: UserCreateData): Promise<UserStructure>;
  deleteUser(id: string): Promise<boolean>;
}
