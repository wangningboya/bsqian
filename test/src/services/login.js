import { api } from '../utils/config'
import request from '../utils/request'

// import {api, request} from 'utils'

const { userLogin2 } = api

export async function userLogin (params) {
    return request({
      url: userLogin2,
      method: 'get',
      data: params,
    })
  }

