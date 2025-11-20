import chalk from "chalk";
import mongoose from "mongoose";

const connectToDataBase = async (url: string): Promise<void> => {
  await mongoose.connect(url);

  console.log(chalk.greenBright("Successfull connection"));
};

export default connectToDataBase;
