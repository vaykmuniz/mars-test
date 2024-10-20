import { Position } from "@prisma/client";

export class MoveController {
  static async move(from: Position, moves: string) {
    try {
      return {
        x: 0,
        y: 0,
        face: "L",
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
