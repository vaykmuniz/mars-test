export class MoveController {
  static async move(from: number[], moves: string) {
    try {
      const newPosition = [0, 0];
      return {
        x: newPosition[0],
        y: newPosition[1],
        face: "L",
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
