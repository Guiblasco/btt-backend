import express from "express";
import MongoUsersRepository from "../repository/MongoUsersRepository.js";
import User from "../Model/User.js";
import UsersController from "../Controller/UsersController.js";

const userRouter = express.Router();

const usersRepository = new MongoUsersRepository(User);
const usersController = new UsersController(usersRepository);

userRouter.get("/", usersController.getUsers);
userRouter.post("/", usersController.createUser);
userRouter.delete("/:userId", usersController.deleteUser);

export default userRouter;
