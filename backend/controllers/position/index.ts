import { prisma } from "../../api";
import { MoveController } from "../";
import { Position } from "@prisma/client";

export class PositionController {
  static get startPosition() {
    return {
      id: "1",
      x: 0,
      y: 0,
      face: "N",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static async getCurrentPosition() {
    try {
      const position = await prisma.position.findFirst();
      return position ?? this.startPosition;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async move(from: Position, moves: string) {
    try {
      const robot = new MoveController(from);
      return robot.executeMoves(moves);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async updateOrCreatePosition(position: Position) {
    const { id, ...data } = position;
    try {
      return await prisma.position.upsert({
        where: { id },
        update: data,
        create: data,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
