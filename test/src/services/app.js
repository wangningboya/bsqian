import { api } from '../utils/config'
import request from '../utils/request'

const { userQuery3,logout2 } = api

export async function userQuery (params) {
    return request({
      url: userQuery3,
      method: 'get',
      data: params,
    })
  }

  export async function logout (params) {
    return request({
      url: logout2,
      method: 'get',
      data: params,
    })
  }

