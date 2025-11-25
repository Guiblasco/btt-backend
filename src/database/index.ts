import chalk from "chalk";
import mongoose from "mongoose";

const connectToDataBase = async (url: string): Promise<void> => {
  await mongoose.connect(url);

  console.log(chalk.green("Successfull connection"));
};

export default connectToDataBase;
