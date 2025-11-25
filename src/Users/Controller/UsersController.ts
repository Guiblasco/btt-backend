import type { Response, NextFunction, Request } from "express";
import { UsersRepository } from "../repository/UsersRepository.js";

class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.usersRepository.getAll();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
