import type { Request } from "express";
import type { UserCreateData } from "../types";

export type RequestWithUserId = Request<{ userId: string }>;
export type RequestWithUserBody = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCreateData
>;
