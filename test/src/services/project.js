import { api } from '../utils/config'
import request from '../utils/request'

const { getProject, saveProject, pmQuery2, deleteProjectById } = api

export async function projectQuery(params) {
  return request({
    url: getProject,
    method: 'get',
    data: params,
  })
}

export async function addProject(params) {
  return request({
    url: saveProject,
    method: 'get',
    data: params,
  })
}

export async function updateProject(params) {
  return request({
    url: saveProject,
    method: 'get',
    data: params,
  })
}


export async function deleteProject(params) {
  return request({
    url: deleteProjectById,
    method: 'get',
    data: params,
  })
}

export async function pmQuery(params) {
  return request({
    url: pmQuery2,
    method: 'get',
    data: params,
  })
}



