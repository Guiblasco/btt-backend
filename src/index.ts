import chalk from "chalk";
import connectToDataBase from "./database/index.js";
import startServer from "./server/startServer.js";

const port = process.env.PORT;
const databaseUrl = process.env.MONGODB_URL;

if (!databaseUrl) {
  console.log(chalk.redBright("Error: Missing MongoDB URL"));
  process.exit(1);
}

try {
  await connectToDataBase(databaseUrl);

  startServer(Number(port));
} catch (error) {
  console.log(chalk.bgRedBright(`There was an error: ${error.message}`));
}
