import Router, { Request, Response, NextFunction } from "express";

const errorRouter = Router();

errorRouter.get("*", (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ message: "Sorry! Route not found" });
});

export { errorRouter };
