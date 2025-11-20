import express from "express";
import notFoundError from "./error/notFoundError/notFoundError.js";
import errorHandler from "./error/errorHandler/errorHandler.js";

const app = express();

app.use(notFoundError);

app.use(errorHandler);

export default app;
