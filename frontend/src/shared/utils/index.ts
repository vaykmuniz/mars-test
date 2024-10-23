import type { Position } from '../types'

export function getPositionCount(where?: Position) {
  if (!where) return 1
  return where.y * 15 + where.x + 1
}

export const faceToDeg: Record<string, number> = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
}
