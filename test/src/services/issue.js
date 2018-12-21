import { api } from '../utils/config'
import request from '../utils/request'

const { getIssueList, addIssue2, getIssue } = api

export async function issueQuery(params) {
  return request({
    url: getIssueList,
    method: 'get',
    data: params,
  })
}

export async function addIssue(params) {
  return request({
    url: addIssue2,
    method: 'get',
    data: params,
  })
}

export async function getIssueById(params) {
  return request({
    url: getIssue,
    method: 'get',
    data: params,
  })
}


