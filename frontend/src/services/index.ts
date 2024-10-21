import type { Position, ResponsePosition } from '@/shared/types'
import axios from 'axios'

export const BASE_URL = 'http://localhost:3000'

export const GET_CURRENT_POSITION_KEYS = ['GET_CURRENT_POSITION']
export async function getCurrentPosition() {
  const uri = BASE_URL + '/mars/'
  const res = await axios.get<ResponsePosition>(uri).then(res => res.data)
  return res
}

export const GET_PREVIEW_KEYS = ['GET_PREVIEW']
export async function getPreview(script: string[]) {
  const uri = BASE_URL + '/mars/preview'
  const res = await axios
    .post<ResponsePosition>(uri, {
      moves: script,
    })
    .then(res => res.data)
  return res
}

export const UPDATE_POSITION_KEYS = ['UPDATE_POSITION']
export async function updatePosition(script: string[]) {
  const uri = BASE_URL + '/mars/move'
  const res = await axios
    .post<ResponsePosition>(uri, {
      moves: script,
    })
    .then(res => res.data)
  return res
}
