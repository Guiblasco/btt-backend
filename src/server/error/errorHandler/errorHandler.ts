import type { Request, Response } from "express";
import type ServerError from "../ServerError/ServerError.js";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
): void => {
  const statusCode = (error as ServerError).statusCode ?? 500;

  res.status(statusCode).json({ message: error.message });
};

export default errorHandler;
