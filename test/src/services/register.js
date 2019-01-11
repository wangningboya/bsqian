import { api } from '../utils/config'
import request from '../utils/request'

// import {api, request} from 'utils'

const { userRegister2, checkUserName2, checkPhone2 } = api

export async function userRegister(params) {
  return request({
    url: userRegister2,
    method: 'get',
    data: params,
  })
}

export async function checkUserName(params) {
  return request({
    url: checkUserName2,
    method: 'get',
    data: params,
  })
}

export async function checkPhone(params) {
  return request({
    url: checkPhone2,
    method: 'get',
    data: params,
  })
}

