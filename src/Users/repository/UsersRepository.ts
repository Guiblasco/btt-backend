import type { UserStructure } from "../types";

export interface UsersRepository {
  getAll(): Promise<UserStructure[]>;
}
