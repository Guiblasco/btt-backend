import mongoose from "mongoose";
import userSchema from "./Schema/UserSchema.js";
import { type UserStructure } from "../types";

const User = mongoose.model<UserStructure>("User", userSchema, "users");

export default User;
