import startServer from "./server/startServer.js";

const port = process.env.PORT;

startServer(Number(port));
