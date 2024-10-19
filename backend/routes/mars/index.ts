import Router from "express";
import { PositionController } from "../../controllers";

const marsRouter = Router();

marsRouter.get("/", async (req, res) => {
  try {
    const position = await PositionController.getCurrentPosition();
    if (position) {
      res.send({ current_position: position });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: 'Error get position' });
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
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: 'Move failed! Error update position!' });
  }
});

export { marsRouter };
