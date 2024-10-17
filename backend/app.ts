import express, { Request, Response, NextFunction } from "express";
// import routes from "./routes";

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("*", (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
