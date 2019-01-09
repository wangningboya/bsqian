import { api } from '../utils/config'
import request from '../utils/request'

const { archs, archCreate, archUpdate, archRemove } = api

export async function query(params) {
  return request({
    url: archs,
    method: 'get',
    data: params,
  })
}

export async function create(params) {
  return request({
    url: archCreate,
    method: 'post',
    data: params,
  })
}

export async function remove(params) {
  return request({
    url: archRemove,
    method: 'get',
    data: params,
  })
}

export async function update(params) {
  return request({
    url: archUpdate,
    method: 'get',
    data: params,
  })
}
