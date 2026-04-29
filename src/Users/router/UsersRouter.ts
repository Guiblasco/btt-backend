import express from "express";
import MongoUsersRepository from "../repository/MongoUsersRepository.js";
import User from "../Model/User.js";
import UsersController from "../Controller/UsersController.js";
import { protect } from "../../middlewares/authMiddleware.js";
const userRouter = express.Router();

const usersRepository = new MongoUsersRepository(User);
const usersController = new UsersController(usersRepository);

userRouter.post("/register", usersController.register);
userRouter.post("/login", usersController.login);

userRouter.get("/", protect, usersController.getUsers);
userRouter.get("/:userId", usersController.getUserById);

userRouter.post("/", usersController.createUser);
userRouter.patch("/:userId", usersController.updateUser);
userRouter.delete("/:userId", usersController.deleteUser);

export default userRouter;
