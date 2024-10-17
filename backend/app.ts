import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { marsRouter, errorRouter } from "./routes";

dotenv.config();

class Api {
  public app: Application = express();
  public port: number = process.env.PORT ? Number(process.env.PORT) : 3000;

  constructor() {
    this.setup();
    this.addRoutes();
    this.start();
  }

  setup() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  addRoutes() {
    this.app.use("*", errorRouter);
    this.app.use("mars", marsRouter);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default new Api();
