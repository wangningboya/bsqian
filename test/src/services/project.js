import { api } from '../utils/config'
import request from '../utils/request'

const { getProject, addIssue2, getIssue } = api

export async function projectQuery(params) {
  return request({
    url: getProject,
    method: 'get',
    data: params,
  })
}



