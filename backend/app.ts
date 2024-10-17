import express from "express";
// import routes from "./routes";

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.all("*", (_req, res) =>
    res.status(404).json({ message: "Route not found" })
);


export default app;
