import { api } from '../utils/config'
import request from '../utils/request'

// import {api, request} from 'utils'

const { userQuery2, getDemandListByDevId, getDemandListByCreactName } = api

export async function userQuery (params) {
    return request({
      url: userQuery2,
      method: 'get',
      data: params,
    })
  }

  export async function myTask (params) {
    return request({
      url: getDemandListByDevId,
      method: 'get',
      data: params,
    })
  }

  export async function myCreate (params) {
    return request({
      url: getDemandListByCreactName,
      method: 'get',
      data: params,
    })
  }

