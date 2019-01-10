import { api } from '../utils/config'
import request from '../utils/request'
const { organization, createOrg, updateOrg, removeOrg, createOrgResType, timeline } = api

export async function query(params) {
  return request({
    url: organization,
    method: 'get',
    data: params,
  })
}

export async function create(params) {
  return request({
    url: createOrg,
    method: 'post',
    data: params,
  })
}

export async function remove(params) {
  return request({
    url: removeOrg,
    method: 'delete',
    data: params,
  })
}

export async function update(params) {
  return request({
    url: updateOrg,
    method: 'patch',
    data: params,
  })
}

export async function createResType(params) {
  return request({
    url: createOrgResType,
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
