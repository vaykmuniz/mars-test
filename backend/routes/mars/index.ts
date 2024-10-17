import Router from "express";

const marsRouter = Router();

marsRouter.get("/teste", (req, res) => {
  res.send("Hello World!");
});

export { marsRouter };
