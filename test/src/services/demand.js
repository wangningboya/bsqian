import { api } from '../utils/config'
import request from '../utils/request'

const { demandQuery2 } = api

export async function demandQuery (params) {
    return request({
      url: demandQuery2,
      method: 'get',
      data: params,
    })
  }

