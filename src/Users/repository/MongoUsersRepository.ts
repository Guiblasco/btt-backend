import { Model } from "mongoose";
import { UserCreateData, UserStructure } from "../types";
import { UsersRepository } from "./UsersRepository.js";

class MongoUsersRepository implements UsersRepository {
  constructor(private readonly userModel: Model<UserStructure>) {}

  async getAll(): Promise<UserStructure[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async createUser(data: UserCreateData): Promise<UserStructure> {
    const createdUser = await this.userModel.create(data);
    return createdUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    return deletedUser !== null;
  }
}
export default MongoUsersRepository;
