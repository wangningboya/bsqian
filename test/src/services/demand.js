import { api } from '../utils/config'
import request from '../utils/request'

const { demandQuery2, projectQuery2, accQuery2, addDemand2 } = api

export async function demandQuery (params) {
    return request({
      url: demandQuery2,
      method: 'get',
      data: params,
    })
  }

export async function projectQuery (params) {
  return request({
    url: projectQuery2,
    method: 'get',
    data: params,
  })
}

export async function accQuery (params) {
  return request({
    url: accQuery2,
    method: 'get',
    data: params,
  })
}

export async function addDemand (params) {
  return request({
    url: addDemand2,
    method: 'get',
    data: params,
  })
}

