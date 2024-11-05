import { Request, Response } from "express";
import { RobotRepository } from "../respository";

export default class MarsController {
  static async getAll(req: Request, res: Response) {
    try {
      const position = await RobotRepository.getAll();
      if (position) {
        res.status(200).send(position);
        return;
      }

      res.status(200).send({ msg: "Position not found" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ msg: "Error get position" });
    }
  }

  static async land(req: Request, res: Response) {
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
    } catch (error) {
      console.log(error);
      res.status(400).send({ msg: "Error get position" });
    }
  }

  static async preview(req: Request, res: Response) {
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
  }

  static async move(req: Request, res: Response) {
    const { moves, id } = req.body;
    try {
      const position = await RobotRepository.getCurrentPosition(id);
      if (position) {
        const newPosition = await RobotRepository.move(position, moves);
        if (newPosition) {
          const isOccupied = await RobotRepository.isOccupied({
            id,
            ...newPosition,
          });
          if (!isOccupied) {
            const updated = await RobotRepository.updateOrCreatePosition({
              id: position.id,
              ...newPosition,
              createdAt: position.createdAt,
              updatedAt: new Date(),
            });
            await RobotRepository.destroyOutOfPlateau();
            res.status(200).send({ current_position: updated });
            return;
          }
          await Promise.all([
            RobotRepository.destroyWhere(position),
            RobotRepository.destroyWhere(newPosition),
          ]);
          res.status(400).send({ msg: "Position is occupied! Kabuum!" });
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
  }
}
