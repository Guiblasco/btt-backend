import type { Request } from "express";
import type { UserCreateData, UserUpdateData } from "../types";

export type RequestWithUserId = Request<{ userId: string }>;
export type RequestWithUserBody = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCreateData
>;
export type RequestWithUserUpdateBody = Request<
  { userId: string },
  Record<string, unknown>,
  UserUpdateData
>;
