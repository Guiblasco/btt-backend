import { Model } from "mongoose";
import { UserStructure } from "../types";
import { UsersRepository } from "./UsersRepository.js";

class MongoUsersRepository implements UsersRepository {
  constructor(private readonly userModel: Model<UserStructure>) {}

  async getAll(): Promise<UserStructure[]> {
    const users = await this.userModel.find().exec();
    return users;
  }
}
export default MongoUsersRepository;
