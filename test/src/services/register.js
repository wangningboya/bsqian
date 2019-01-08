import { api } from '../utils/config'
import request from '../utils/request'

// import {api, request} from 'utils'

const { userRegister2, checkUserName } = api

export async function userRegister(params) {
  return request({
    url: userRegister2,
    method: 'get',
    data: params,
  })
}

export async function check(params) {
  return request({
    url: checkUserName,
    method: 'get',
    data: params,
  })
}

