import { api } from '../utils/config'
import request from '../utils/request'

const { demandQuery2, projectQuery2, accQuery2, addDemand2, updateDemand2, getDemand,
  getDemandLog, addDemandLog, getUsers, demand, getDemandTimeById } = api

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

export async function getDemandTime(params) {
  return request({
    url: getDemandTimeById,
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
    url: demand.concat('/review'),
    method: 'get',
    data: params,
  })
}

export async function predictDemand(params) {
  return request({
    url: demand.concat('/predict'),
    method: 'get',
    data: params,
  })
}

export async function startDev(params) {
  return request({
    url: demand.concat('/startDev'),
    method: 'get',
    data: params,
  })
}

export async function pauseDev(params) {
  return request({
    url: demand.concat('/pauseDev'),
    method: 'get',
    data: params,
  })
}

export async function endDev(params) {
  return request({
    url: demand.concat('/endDev'),
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





