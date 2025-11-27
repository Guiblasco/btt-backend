import type { Response, NextFunction, Request } from "express";
import {
  RequestWithUserBody,
  RequestWithUserId,
  RequestWithUserUpdateBody,
} from "./types.js";
import { UsersRepository } from "../repository/UsersRepository.js";
import bcrypt from "bcryptjs";
import ServerError from "../../server/error/ServerError/ServerError.js";
import { UserUpdateData } from "../types.js";

const SALT_ROUNDS = 10;
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

  getUserById = async (
    req: RequestWithUserId,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userId } = req.params;

      const user = await this.usersRepository.getUserById(userId);

      if (!user) {
        throw new ServerError("User not found", 404);
      }

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (
    req: RequestWithUserBody,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { password, ...user } = req.body;

      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

      const createdUser = await this.usersRepository.createUser({
        ...user,
        password: passwordHash,
      });

      res.status(201).json({
        user: {
          _id: createdUser._id,
          name: createdUser.name,
          username: createdUser.username,
        },
      });
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === 11000
      ) {
        return next(new ServerError("Username already exists", 409));
      }
      next(error);
    }
  };

  updateUser = async (
    req: RequestWithUserUpdateBody,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userId } = req.params;
      const { password, ...user } = req.body;
      const updateData: UserUpdateData = { ...user };

      if (password) {
        updateData.password = await bcrypt.hash(password, SALT_ROUNDS);
      }

      const updatedUser = await this.usersRepository.updateUser(
        userId,
        updateData,
      );
      if (!updatedUser) {
        throw new ServerError("User not found", 404);
      }

      res.status(200).json({ user: updatedUser });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      const deletedUser = await this.usersRepository.deleteUser(userId);

      if (!deletedUser) {
        throw new ServerError("User was not found", 404);
      }

      res.status(200).json({ message: "User succesfully deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
