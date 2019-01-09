import { api } from '../utils/config'
import request from '../utils/request'

const { userQuery2, editUser2 } = api

export async function userQuery(params) {
  return request({
    url: userQuery2,
    method: 'get',
    data: params,
  })
}

export async function editUser(params) {
  return request({
    url: editUser2,
    method: 'get',
    data: params,
  })
}


