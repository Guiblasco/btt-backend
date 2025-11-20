import { NextFunction, Response, Request } from "express";
import ServerError from "../ServerError/ServerError.js";

const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new ServerError("Enpoint not found", 404);

  next(error);
};

export default notFoundError;
