import { api } from '../utils/config'
import request from '../utils/request'

const { getIssueList, addIssue2, getIssue, deleteIssueById, closeIssueById } = api

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

export async function deleteIssue(params) {
  return request({
    url: deleteIssueById,
    method: 'get',
    data: params,
  })
}

export async function closeIssue(params) {
  return request({
    url: closeIssueById,
    method: 'get',
    data: params,
  })
}


