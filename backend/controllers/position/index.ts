import { prisma } from "../../api";
import { MoveController } from "../";
import { Position } from "@prisma/client";

export class PositionController {
  static async getCurrentPosition() {
    try {
      const position = await prisma.position.findFirst();
      return position;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async move(position: Position, moves: string) {
    try {
      const newPosition = await MoveController.move(position, moves);
      if (newPosition) {
          const updated = await prisma.position.update({
              where: { id: position.id },
              data: newPosition
          });
          return updated;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
