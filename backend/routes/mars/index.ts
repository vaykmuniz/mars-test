import Router from "express";
import { PositionController } from "../../controllers";

const marsRouter = Router();

marsRouter.get("/", async (req, res) => {
  try {
    const position = await PositionController.getCurrentPosition();
    console.log(position);
    if (position) {
      res.status(200).send({ current_position: position });
    } else {
      res.send({ msg: "Position not found", current_position: PositionController.startPosition });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error get position" });
  }

});

marsRouter.post("/move", async (req, res) => {
  const { moves } = req.body;
  try {
    const position = await PositionController.getCurrentPosition();
    if (position) {
      const newPosition = await PositionController.move(position, moves);
      res.send({ current_position: newPosition });
    }
    res.status(400).send({ msg: "Move failed!" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Move failed! Error update position!" });
  }
});

export { marsRouter };
