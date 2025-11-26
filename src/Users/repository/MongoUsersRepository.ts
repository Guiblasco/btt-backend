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
}
export default MongoUsersRepository;
