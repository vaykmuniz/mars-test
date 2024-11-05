import Router from "express";
import MarsController from "../../controllers/mars";

const marsRouter = Router();

marsRouter.get("/", MarsController.getAll);

marsRouter.post("/land", MarsController.land);

marsRouter.post("/preview", MarsController.preview);

marsRouter.post("/move", MarsController.move);

export { marsRouter };
