import { api } from '../utils/config'
import request from '../utils/request'

const { peoples, timeline, createTeam2, pickup2, getout2, dismiss2 } = api

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

export async function pickup(params) {
  return request({
    url: pickup2,
    method: 'post',
    data: params,
  })
}

export async function getout(params) {
  return request({
    url: getout2,
    method: 'post',
    data: params,
  })
}

export async function dismiss(params) {
  return request({
    url: dismiss2,
    method: 'post',
    data: params,
  })
}

export async function restimeline(params) {
  return request({
    url: timeline,
    method: 'get',
    data: params,
  })
}
