import { api } from '../utils/config'
import request from '../utils/request'

const { getProject, saveProject, getIssue } = api

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



