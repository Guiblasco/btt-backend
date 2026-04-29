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
import jwt from "jsonwebtoken";

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

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, username, password } = req.body;

      const existingUser = await this.usersRepository.findByUsername(username);

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.usersRepository.createUser({
        name,
        username,
        password: hashedPassword,
      });

      res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
      next(error);
    }
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("login hit");
      const { username, password } = req.body as {
        username: string;
        password: string;
      };

      const user = await this.usersRepository.findByUsername(username);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" },
      );
      console.log("token", token);
      console.log("jwt env", process.env.JWT_SECRET);
      res.json({
        message: "Login OK",
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Login error" });
      next(error);
    }
  };
}

export default UsersController;
