import express from "express";
import notFoundError from "./error/notFoundError/notFoundError.js";
import errorHandler from "./error/errorHandler/errorHandler.js";
import getPing from "./error/healthChecker/getping.js";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.get("/", getPing);

app.use(notFoundError);

app.use(errorHandler);

export default app;
