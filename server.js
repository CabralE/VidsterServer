// Files
import database from "./database/connection.js";
import routes from "./routes/index.js";

// Dependencies
import express from "express";
import cors from "cors";
import logger from "morgan";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use("/", routes);

database.on("connected", () => {
  console.clear();
  console.log(chalk.blue("Connected to MongoDB!"));
  app.listen(PORT, () => {
    console.log(
      `Express server running in development on http://localhost:${PORT}`
    );
  });
});
