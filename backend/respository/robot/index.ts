import { prisma } from "../../api";
import { MoveService } from "../../services";
import { Position } from "@prisma/client";

export class RobotRepository {
  static async getAll() {
    try {
      return await prisma.position.findMany();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getCurrentPosition(id: number) {
    try {
      const position = await prisma.position.findFirst({
        where: {
          id,
        },
      });
      return position;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async isOccupied(where: Partial<Position>) {
    const { x, y } = where;
    try {
      const position = await prisma.position.findFirst({
        where: {
          x,
          y,
        },
      });
      return !!position && position.id !== where.id;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async land(where: Position) {
    try {
      return await prisma.position.create({
        data: {
          ...where,
          createdAt: new Date(),
        },
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async move(from: Position, moves: string) {
    try {
      const robot = new MoveService(from);
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

  static async destroyWhere(
    where: Omit<Position, "id" | "face" | "createdAt" | "updatedAt">
  ) {
    try {
      return await prisma.position.deleteMany({
        where: {
          x: where.x,
          y: where.y,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async destroyOutOfPlateau() {
    try {
      await prisma.position.deleteMany({
        where: {
          OR: [{ x: { gt: 15 } }, { y: { gt: 15 } }],
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
