import { api } from '../utils/config'
import request from '../utils/request'

const { peoples, timeline, createTeam2 } = api

export async function query(params) {
  return request({
    url: peoples,
    method: 'get',
    data: params,
  })
}

export async function createTeam(params) {
  return request({
    url: createTeam2,
    method: 'post',
    data: params,
  })
}

export async function restimeline(params) {
  return request({
    url: timeline.concat('/res'),
    method: 'get',
    data: params,
  })
}
