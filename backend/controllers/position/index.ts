import { prisma } from '../../api'
import { MoveController } from '../'

export class PositionController {

    static async getCurrentPosition() {
        try {
            const position = await prisma.position.findFirst()
            return position;

        } catch (error) {
            console.error(error)
            return null;
        }
    }

    static async move(position: number[], moves: string) {
        try {
            const newPosition = MoveController.move(position, moves)
            if (newPosition) {
                const updated = await prisma.position.update(newPosition)
                return updated;
            }
        }
    }

}
