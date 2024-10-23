import Router from "express";
import { RobotRepository } from "../../respository";

const marsRouter = Router();

marsRouter.get("/", async (req, res) => {
  try {
    const position = await RobotRepository.getAll();
    if (position) {
      res.status(200).send(position);
      return;
    }

    res.status(200).send({ msg: "Position not found" });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error get position" });
  }
});

marsRouter.post("/land", async (req, res) => {
  const where = req.body;
  try {
    const isOccupied = await RobotRepository.isOccupied(where);
    if (isOccupied) {
      res.status(400).send({ msg: "Position is occupied!" });
      return;
    }

    const position = await RobotRepository.land(where);
    if (position) {
      res.status(200).send({ msg: "Landed!", current_position: position });
      return;
    }

    res.status(200).send({ msg: "Position not found" });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error get position" });
  }
});

marsRouter.post("/preview", async (req, res) => {
  const { moves, id } = req.body;
  try {
    const position = await RobotRepository.getCurrentPosition(id);
    if (!position) {
      res.status(400).send({ msg: "Position not found!" });
      return;
    }
    const newPosition = await RobotRepository.move(position, moves);

    if (!newPosition) {
      res.status(400).send({ msg: "Move failed!" });
      return;
    }
    const isOccupied = await RobotRepository.isOccupied(newPosition);
    if (isOccupied) {
      res.status(400).send({ msg: "Position is occupied!" });
      return;
    }

    res.status(200).send({ current_position: newPosition });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Move failed! Error update position!" });
  }
});

marsRouter.post("/move", async (req, res) => {
  const { moves, id } = req.body;
  try {
    const position = await RobotRepository.getCurrentPosition(id);
    if (position) {
      const newPosition = await RobotRepository.move(position, moves);
      if (newPosition) {
        const updated = await RobotRepository.updateOrCreatePosition({
          id: position.id,
          ...newPosition,
          createdAt: position.createdAt,
          updatedAt: new Date(),
        });
        res.status(200).send({ current_position: updated });
        return;
      }
      res.status(400).send({ msg: "Move failed!" });
      return;
    }
    res.status(400).send({ msg: "Move failed! No position found!" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Move failed! Error update position!" });
  }
});

export { marsRouter };
