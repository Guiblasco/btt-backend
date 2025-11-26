import express from "express";
import morgan from "morgan";
import notFoundError from "./error/notFoundError/notFoundError.js";
import errorHandler from "./error/errorHandler/errorHandler.js";
import getPing from "./error/healthChecker/getping.js";
import routes from "./routes/routes.js";
import userRouter from "../Users/router/UsersRouter.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", getPing);

app.use(routes.users, userRouter);

app.use(notFoundError);

app.use(errorHandler);

export default app;
