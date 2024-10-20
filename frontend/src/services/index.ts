import type { Position } from '@/shared/types'

export const BASE_URL = '127.0.0.1:3000'

export const GET_CURRENT_POSITION_KEYS = ['GET_CURRENT_POSITION']

export async function getCurrentPosition() {
  try {
    return (await fetch(BASE_URL + '/mars/').then(res =>
      res.json(),
    )) as Promise<Position>
  } catch (err: unknown) {
    console.log({ err })
    throw new Error('Failed to fetch position')
  }
}
