import Router from "express";
import { PositionController } from "../../controllers";

const marsRouter = Router();

marsRouter.get("/", async (req, res) => {
  try {
    const position = await PositionController.getCurrentPosition();
    if (position) {
      res.status(200).send({ current_position: position });
    } else {
      res.send({
        msg: "Position not found",
        current_position: PositionController.startPosition,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error get position" });
  }
});

marsRouter.post("/preview", async (req, res) => {
  const { moves } = req.body;
  try {
    const position = await PositionController.getCurrentPosition();
    if (position) {
      const newPosition = await PositionController.move(position, moves);
      res.status(200).send({ current_position: newPosition });
    } else {
      const start = PositionController.startPosition;
      const newPosition = await PositionController.move(start, moves);
      res.status(200).send({ current_position: newPosition });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Move failed! Error update position!" });
  }
});

marsRouter.post("/move", async (req, res) => {
  const { moves } = req.body;
  try {
    const position = await PositionController.getCurrentPosition();
    if (position) {
      const newPosition = await PositionController.move(position, moves);
      if (newPosition) {
        const updated = await PositionController.updateOrCreatePosition({
          id: position.id,
          ...newPosition,
          createdAt: position.createdAt,
          updatedAt: new Date(),
        });
        res.send({ current_position: updated });
      }
      res.status(400).send({ msg: "Move failed!" });
    }
    res.status(400).send({ msg: "Move failed! No position found!" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Move failed! Error update position!" });
  }
});

export { marsRouter };
