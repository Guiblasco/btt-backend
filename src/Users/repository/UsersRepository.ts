import type { UserCreateData, UserStructure } from "../types";

export interface UsersRepository {
  getAll(): Promise<UserStructure[]>;
  createUser(data: UserCreateData): Promise<UserStructure>;
}
