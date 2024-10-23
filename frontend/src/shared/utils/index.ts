import type { Position } from '../types'

export function getPositionCount(where?: Position) {
  if (!where) return 1
  return where.y * 15 + where.x + 1
}
