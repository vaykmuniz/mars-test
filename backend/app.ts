import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { marsRouter, errorRouter } from "./routes";
import { prisma } from "./api";
import { PrismaClient } from "@prisma/client";

dotenv.config();

class Api {
  public app: Application = express();
  public port: number = process.env.PORT ? Number(process.env.PORT) : 3000;
  public prisma = prisma;

  constructor() {
    this.middlewares();
    this.addRoutes();
    this.dbConnect();
    this.start();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  addRoutes() {
    this.app.use("/mars", marsRouter);
    this.app.use("*", errorRouter);
  }

  async dbConnect(retries = 5, delay = 2000) {
    await new Promise((resolve) => setTimeout(resolve, delay));

    try {
      await this.prisma.$connect();
      this.monitorConnection();
      console.log("Connected to the database");
    } catch (error) {
      if (retries > 0) {
        console.error(
          `Failed to connect to the database. Retrying in ${
            delay / 1000
          } seconds...`,
          error
        );
        setTimeout(() => this.dbConnect(retries - 1, delay), delay);
      } else {
        console.error(
          "Failed to connect to the database after multiple attempts:",
          error
        );
        process.exit(1);
      }
    }
  }

  monitorConnection() {
    setInterval(async () => {
      try {
        console.log("Database connection is active");
      } catch (error) {
        console.error("Database connection was lost:", error);
        process.exit(1);
      }
    }, 10000);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default new Api();
