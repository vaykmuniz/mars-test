import type { Position } from '@/shared/types'
import axios from 'axios'

export const BASE_URL = 'http://127.0.0.1:3000'

export const GET_CURRENT_POSITION_KEYS = ['GET_CURRENT_POSITION']

export async function getCurrentPosition() {
  const res = await axios.get<Position>(BASE_URL + '/mars/')
  return res.data
}
