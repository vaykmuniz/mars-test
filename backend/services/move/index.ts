import { Position } from "@prisma/client";

export class MoveService {
  plateau: number[] = [15, 15];
  x: number;
  y: number;
  dirIndex: number;
  directions: string[] = ["N", "E", "S", "W"];

  constructor({ x, y, face }: Position) {
    this.x = x;
    this.y = y;
    this.dirIndex = this.directions.indexOf(face);
  }

  rotate(turn: string) {
    if (turn === "L") {
      this.dirIndex = (this.dirIndex + 3) % 4;
    } else if (turn === "R") {
      this.dirIndex = (this.dirIndex + 1) % 4;
    }
  }

  move() {
    if (this.directions[this.dirIndex] === "N") {
      this.y += 1;
    } else if (this.directions[this.dirIndex] === "E") {
      this.x += 1;
    } else if (this.directions[this.dirIndex] === "S") {
      this.y -= 1;
    } else if (this.directions[this.dirIndex] === "W") {
      this.x -= 1;
    }

    if (
      this.x < 0 ||
      this.y < 0 ||
      this.x > this.plateau[0] ||
      this.y > this.plateau[1]
    ) {
      console.log("O robô saiu dos limites do plateau!");
    }
  }

  executeMoves(moves: string) {
    for (let instruction of moves) {
      if (instruction === "L" || instruction === "R") {
        this.rotate(instruction);
      } else if (instruction === "M") {
        this.move();
      }
    }

    return { x: this.x, y: this.y, face: this.directions[this.dirIndex] };
  }
}
