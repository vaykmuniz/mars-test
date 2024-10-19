export class MoveController {
  static async move(from: number[], moves: string) {
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
