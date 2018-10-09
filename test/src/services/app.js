import { api } from '../utils/config'
import request from '../utils/request'

const { userQuery3 } = api

export async function userQuery (params) {
    return request({
      url: userQuery3,
      method: 'get',
      data: params,
    })
  }

