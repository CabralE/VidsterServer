import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.set("returnOriginal", false);
mongoose.connect(MONGODB_URL).catch((err) => {
  console.log(`Error connection go MongoDB: ${err.message}`);
});
mongoose.connection.on("disconnect", () => {
  console.log(chalk.bold("Disconnected from MongoDB!"));
});
mongoose.connection.on("error", (err) => {
  console.log(chalk.red(`MongoDB connection error: ${err}`));
});

export default mongoose.connection;
