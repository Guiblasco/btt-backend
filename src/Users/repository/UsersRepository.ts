import type { UserCreateData, UserStructure, UserUpdateData } from "../types";

export interface UsersRepository {
  getAll(): Promise<UserStructure[]>;
  getUserById(id: string): Promise<UserStructure | null>;
  createUser(data: UserCreateData): Promise<UserStructure>;
  updateUser(id: string, data: UserUpdateData): Promise<UserStructure | null>;
  deleteUser(id: string): Promise<boolean>;
}
