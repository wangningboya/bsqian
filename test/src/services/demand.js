import { api } from '../utils/config'
import request from '../utils/request'

const { demandQuery2, projectQuery2, accQuery2, addDemand2, updateDemand2, getDemand,
  getDemandLog, addDemandLog, getUsers } = api

export async function demandQuery(params) {
  return request({
    url: demandQuery2,
    method: 'get',
    data: params,
  })
}

export async function projectQuery(params) {
  return request({
    url: projectQuery2,
    method: 'get',
    data: params,
  })
}

export async function accQuery(params) {
  return request({
    url: accQuery2,
    method: 'get',
    data: params,
  })
}

export async function addDemand(params) {
  return request({
    url: addDemand2,
    method: 'get',
    data: params,
  })
}

export async function updateDemand(params) {
  return request({
    url: updateDemand2,
    method: 'get',
    data: params,
  })
}

export async function getDemandById(params) {
  return request({
    url: getDemand,
    method: 'get',
    data: params,
  })
}

export async function getDemandLogById(params) {
  return request({
    url: getDemandLog,
    method: 'get',
    data: params,
  })
}

export async function reviewDemand(params) {
  return request({
    url: addDemandLog,
    method: 'get',
    data: params,
  })
}

export async function predictDemand(params) {
  return request({
    url: addDemandLog,
    method: 'get',
    data: params,
  })
}

export async function getDev(params) {
  return request({
    url: getUsers,
    method: 'post',
    data: params,
  })
}



