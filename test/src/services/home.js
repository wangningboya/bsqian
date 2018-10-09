import { api } from '../utils/config'
import request from '../utils/request'

// import {api, request} from 'utils'

const { userQuery2 } = api

export async function userQuery (params) {
    return request({
      url: userQuery2,
      method: 'get',
      data: params,
    })
  }

