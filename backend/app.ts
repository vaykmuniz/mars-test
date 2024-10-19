import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { marsRouter, errorRouter } from "./routes";
import { prisma } from "./api";

dotenv.config();

class Api {
  public app: Application = express();
  public port: number = process.env.PORT ? Number(process.env.PORT) : 3000;
  private prisma = prisma;

  constructor() {
    this.middlewares();
    this.dbConnect();
    this.addRoutes();
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

  dbConnect() {
    this.prisma
      .$connect()
      .then(() => {
        console.log("Connected to the database");
      })
      .catch((error: unknown) => {
        console.error("Failed to connect to the database:", error);
      });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default new Api();
