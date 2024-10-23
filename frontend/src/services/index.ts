import type { Position, ResponsePosition } from '@/shared/types'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/mars'

const URLS = {
  GET_ALL: BASE_URL,
  LAND: BASE_URL + '/land',
  GET_PREVIEW_BY_ID: BASE_URL + '/preview',
  UPDATE_POSITION: BASE_URL + '/move',
}

export const GET_ALL = ['GET_ALL']
export async function getAll() {
  const res = await axios.get(URLS.GET_ALL).then(res => res.data)
  return res
}

export const GET_PREVIEW_BY_ID_KEYS = ['GET_PREVIEW']
export async function getPreviewById(script: string[], id: number) {
  const res = await axios
    .post<ResponsePosition>(URLS.GET_PREVIEW_BY_ID, {
      moves: script,
      id,
    })
    .then(res => res.data)
  return res
}

export const UPDATE_POSITION_KEYS = ['UPDATE_POSITION']
export async function updatePosition(script: string[], id: number) {
  const res = await axios
    .post<ResponsePosition>(URLS.UPDATE_POSITION, {
      moves: script,
      id,
    })
    .then(res => res.data)
  return res
}

export const LAND_KEYS = ['LAND']
export async function postLand(where: Position) {
  const res = await axios
    .post<ResponsePosition>(URLS.LAND, where)
    .then(res => res.data)
  return res
}
